const API_BASE = import.meta.env.VITE_ALCHEMYST_API_BASE;
const API_KEY = import.meta.env.VITE_ALCHEMYST_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

class ApiService {
  private baseUrl = API_BASE;
  private apiKey = API_KEY;
  private geminiApiKey = GEMINI_API_KEY;

  private validateConfig() {
    if (!this.baseUrl) {
      throw new Error('API_BASE_URL is not configured. Please check your environment variables.');
    }
    if (!this.apiKey) {
      throw new Error('API_KEY is not configured. Please check your environment variables.');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    this.validateConfig();
    
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    };

    console.log(`🌐 Making API request to: ${url}`);
    console.log(`🔑 Using API key: ${this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'NOT SET'}`);

    if (options.body && typeof options.body === 'string') {
        const bodyPreview = options.body.length > 500 ? options.body.substring(0, 500) + '...' : options.body;
        console.log(`Payload (body): ${bodyPreview}`);
    } else if (options.body) {
        console.log(`Payload (body type): ${typeof options.body}. Cannot preview non-string body.`);
    }
    
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      console.log(`📡 Response status: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error: ${response.status} ${response.statusText}`, errorText);
        
        // Enhanced error information
        const errorDetails = {
          status: response.status,
          statusText: response.statusText,
          url,
          headers: Object.fromEntries(response.headers.entries()),
          body: errorText
        };
        
        console.error('📋 Full error details:', errorDetails);
        throw new Error(`API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ API response received successfully');
      return data;
    } catch (error) {
      // Enhanced error logging
      const errorDetails = {
        url,
        method: options.method || 'GET',
        headers: headers,
        timestamp: new Date().toISOString(),
        error: {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        }
      };
      
      console.group('🚨 API Request Failed');
      console.error('Error details:', errorDetails);
      console.error('Original error:', error);
      console.groupEnd();
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to the API. Please check your internet connection and API configuration.');
      }
      
      // Re-throw the original error to preserve the stack trace
      throw error;
    }
  }

  private async callGeminiAPI(prompt: string): Promise<any> {
    if (!this.geminiApiKey) {
      throw new Error('Gemini API key is not configured');
    }

    console.log('🔄 Falling back to Gemini AI...');
    
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.geminiApiKey}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 1,
        topP: 1,
        maxOutputTokens: 1000,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    try {
      console.log('🤖 Making request to Gemini API...');
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Gemini API Error:', response.status, errorText);
        throw new Error(`Gemini API Error: ${response.status} - ${errorText}`);
      }

      const geminiResponse: GeminiResponse = await response.json();
      console.log('✅ Gemini API response received');

      // Convert Gemini response to OpenAI-compatible format
      const openAICompatibleResponse = {
        choices: [{
          message: {
            content: geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated'
          }
        }]
      };

      return openAICompatibleResponse;
    } catch (error) {
      console.error('❌ Gemini API request failed:', error);
      throw error;
    }
  }

  async addContext(data: any) {
    console.log('📝 Adding context to API');
    return this.request('/v1/context/add', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async searchContext(query: string, similarityThreshold = 0.8) {
    console.log(`🔍 Searching context with query: "${query}"`);
    return this.request('/v1/context/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        similarity_threshold: similarityThreshold,
        minimum_similarity_threshold: 0.5,
        scope: 'internal',
      }),
    });
  }

  async generateResponse(prompt: string, context?: string) {
    console.log(`🤖 Generating response for prompt: "${prompt.substring(0, 100)}..."`);
    
    try {
      // First, try Alchemyst AI
      console.log('🚀 Attempting Alchemyst AI...');
      return await this.request('/v1/proxy/default/chat/completions', {
        method: 'POST',
        body: JSON.stringify({
          model: 'alchemyst-ai/alchemyst-c1',
          messages: [
            ...(context ? [{ role: 'system', content: context }] : []),
            { role: 'user', content: prompt }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });
    } catch (alchemystError) {
      console.warn('⚠️ Alchemyst AI failed, attempting Gemini fallback...');
      console.error('Alchemyst error:', alchemystError);
      
      try {
        // Fallback to Gemini AI
        const fullPrompt = context 
          ? `Context: ${context}\n\nUser Request: ${prompt}`
          : prompt;
        
        return await this.callGeminiAPI(fullPrompt);
      } catch (geminiError) {
        console.error('❌ Both Alchemyst and Gemini APIs failed');
        console.error('Gemini error:', geminiError);
        
        // If both fail, throw the original Alchemyst error
        throw new Error(`AI services unavailable. Primary service error: ${alchemystError instanceof Error ? alchemystError.message : 'Unknown error'}. Fallback service also failed.`);
      }
    }
  }

  async deleteContext(source: string) {
    console.log(`🗑️ Deleting context for source: ${source}`);
    return this.request('/v1/context/delete', {
      method: 'POST',
      body: JSON.stringify({
        source,
        by_doc: true,
        by_id: false,
      }),
    });
  }

  // Method to check if API is properly configured
  isConfigured(): boolean {
    const configured = !!(this.baseUrl && this.apiKey);
    console.log(`⚙️ API Configuration status: ${configured ? 'CONFIGURED' : 'NOT CONFIGURED'}`);
    return configured;
  }

  getConfigStatus(): { configured: boolean; missingVars: string[]; hasGeminiFallback: boolean } {
    const missingVars: string[] = [];
    if (!this.baseUrl) missingVars.push('VITE_ALCHEMYST_API_BASE');
    if (!this.apiKey) missingVars.push('VITE_ALCHEMYST_API_KEY');
    
    const status = {
      configured: missingVars.length === 0,
      missingVars,
      hasGeminiFallback: !!this.geminiApiKey
    };
    
    console.log('📊 Configuration status:', status);
    return status;
  }

  // Method to test API connectivity
  async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      console.log('🔌 Testing API connection...');
      
      // Simple test request to check if the API is reachable
      const response = await fetch(this.baseUrl, {
        method: 'HEAD',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        },
      });
      
      console.log(`🔌 Connection test result: ${response.status}`);
      return { success: response.ok };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown connection error';
      console.error('🔌 Connection test failed:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  // Method to test Gemini fallback
  async testGeminiFallback(): Promise<{ success: boolean; error?: string }> {
    if (!this.geminiApiKey) {
      return { success: false, error: 'Gemini API key not configured' };
    }

    try {
      console.log('🔌 Testing Gemini fallback...');
      await this.callGeminiAPI('Test connection');
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown Gemini error';
      console.error('🔌 Gemini test failed:', errorMessage);
      return { success: false, error: errorMessage };
    }
  }
}

export const apiService = new ApiService();