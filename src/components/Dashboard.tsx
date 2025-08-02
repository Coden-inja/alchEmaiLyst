import React, { useState, useEffect } from 'react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { gmailService } from '../services/gmailService';
import { apiService } from '../services/api';
import { Agent, ApiError, Email } from '../types';
import { AgentCard } from './AgentCard';
import { EmailSummary } from './EmailSummary';
import { ComposeEmail } from './ComposeEmail';
import { SpamDetector } from './SpamDetector';
import { LogOut, Bot, Activity, Mail, PenTool, Shield, AlertTriangle, Settings, RefreshCw, Key, Zap } from 'lucide-react';

type ContentView = 'summary' | 'compose' | 'spam';


const Dashboard = () => {
  const { user, logout, accessToken } = useGoogleAuth();
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'email-summarizer',
      name: 'Email Summarizer',
      description: 'Extracts and summarizes your emails with AI-powered insights',
      status: 'idle',
      icon: 'Mail',
      color: 'bg-blue-500',
    },
    {
      id: 'email-composer',
      name: 'Email Composer',
      description: 'Composes professional emails based on your writing style',
      status: 'idle',
      icon: 'PenTool',
      color: 'bg-green-500',
    },
    {
      id: 'spam-detector',
      name: 'Spam Detector',
      description: 'Identifies and manages spam emails automatically',
      status: 'idle',
      icon: 'Shield',
      color: 'bg-red-500',
    },
  ]);

  const [emails, setEmails] = useState<Email[]>([]);
  const [spamEmails, setSpamEmails] = useState<Email[]>([]);
  const [activeAgent, setActiveAgent] = useState<string | null>(null);
  const [activeContentView, setActiveContentView] = useState<ContentView>('summary');
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);

  // Check API configuration on mount
  useEffect(() => {
    const configStatus = apiService.getConfigStatus();
    if (!configStatus.configured) {
      setApiError({
        message: configStatus.hasGeminiFallback 
          ? 'Primary AI service (Alchemyst) is not configured, but Gemini fallback is available.'
          : 'AI service is not configured. Please add your Alchemyst AI credentials to the environment variables.',
        type: 'config',
        timestamp: new Date().toISOString(),
        details: `Missing variables: ${configStatus.missingVars.join(', ')}${configStatus.hasGeminiFallback ? '. Gemini fallback is configured and will be used.' : ''}`
      });
    }
  }, []);

  // Load emails on component mount
  useEffect(() => {
    if (accessToken) {
      loadEmails();
    }
  }, [accessToken]);

  const logError = (error: any, context: string, additionalInfo?: any) => {
    const timestamp = new Date().toISOString();
    const errorDetails = {
      timestamp,
      context,
      error: {
        message: error?.message || 'Unknown error',
        stack: error?.stack,
        name: error?.name,
      },
      additionalInfo,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
    
    console.group(`🚨 Error in ${context} - ${timestamp}`);
    console.error('Error Details:', errorDetails);
    console.error('Original Error:', error);
    if (additionalInfo) {
      console.info('Additional Context:', additionalInfo);
    }
    console.groupEnd();
  };

  const loadEmails = async () => {
    if (!accessToken) {
      console.log('❌ No access token available for loading emails');
      return;
    }

    setIsLoadingEmails(true);
    setApiError(null);

    try {
      console.log('📧 Loading emails from Gmail...');
      
      // Load inbox emails
      const inboxResponse = await gmailService.getInboxEmails(accessToken, 20);
      
      if (inboxResponse.messages) {
        const emailPromises = inboxResponse.messages.slice(0, 10).map(async (msg: any) => {
          try {
            const fullMessage = await gmailService.getMessage(accessToken, msg.id);
            const emailContent = gmailService.extractEmailContent(fullMessage);
            
            return {
              id: fullMessage.id,
              from: emailContent.from,
              to: emailContent.to,
              subject: emailContent.subject,
              content: emailContent.body,
              timestamp: emailContent.date || fullMessage.internalDate,
              isRead: !fullMessage.labelIds?.includes('UNREAD'),
              isSpam: fullMessage.labelIds?.includes('SPAM'),
            } as Email;
          } catch (error) {
            console.error(`Failed to load email ${msg.id}:`, error);
            return null;
          }
        });

        const loadedEmails = (await Promise.all(emailPromises)).filter(Boolean) as Email[];
        setEmails(loadedEmails);
        console.log(`✅ Loaded ${loadedEmails.length} emails successfully`);
      }

      // Load spam emails
      try {
        const spamResponse = await gmailService.searchSpamEmails(accessToken);
        if (spamResponse.messages) {
          const spamPromises = spamResponse.messages.slice(0, 5).map(async (msg: any) => {
            try {
              const fullMessage = await gmailService.getMessage(accessToken, msg.id);
              const emailContent = gmailService.extractEmailContent(fullMessage);
              
              return {
                id: fullMessage.id,
                from: emailContent.from,
                to: emailContent.to,
                subject: emailContent.subject,
                content: emailContent.body,
                timestamp: emailContent.date || fullMessage.internalDate,
                isSpam: true,
              } as Email;
            } catch (error) {
              console.error(`Failed to load spam email ${msg.id}:`, error);
              return null;
            }
          });

          const loadedSpamEmails = (await Promise.all(spamPromises)).filter(Boolean) as Email[];
          setSpamEmails(loadedSpamEmails);
          console.log(`✅ Loaded ${loadedSpamEmails.length} spam emails`);
        }
      } catch (spamError) {
        console.warn('Failed to load spam emails:', spamError);
        // Don't fail the entire operation if spam loading fails
      }

    } catch (error) {
      
      let errorType: ApiError['type'] = 'general';
      let errorMessage = 'Failed to load emails from Gmail.';
      let errorDetails = '';

      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('403')) {
          errorType = 'auth';
          errorMessage = 'Gmail access denied. Please re-authenticate.';
          errorDetails = 'Your Gmail access token may have expired or been revoked.';
        } else if (error.message.includes('Network error') || error.message.includes('fetch')) {
          errorType = 'network';
          errorMessage = 'Network error: Unable to connect to Gmail.';
          errorDetails = 'Please check your internet connection.';
        } else {
          errorMessage = `Gmail API Error: ${error.message}`;
          errorDetails = error.stack || 'No additional details available';
        }
      }

      logError(error, 'Email Loading', { accessToken: accessToken ? 'present' : 'missing' });

      setApiError({
        message: errorMessage,
        type: errorType,
        timestamp: new Date().toISOString(),
        details: errorDetails
      });
    } finally {
      setIsLoadingEmails(false);
    }
  };

  const handleAgentActivation = async (agentId: string) => {
    setApiError(null);
    setActiveAgent(agentId);
    setIsLoading(true);
    
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'processing' as const }
        : agent
    ));

    try {
      console.log(`🚀 Activating agent: ${agentId}`);
      
      if (agentId === 'email-summarizer') {
        await handleEmailSummarization();
        setActiveContentView('summary');
      } else if (agentId === 'spam-detector') {
        await handleSpamDetection();
        setActiveContentView('spam');
      } else if (agentId === 'email-composer') {
        setActiveContentView('compose');
      }
      
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'completed' as const, lastActivity: new Date().toLocaleString() }
          : agent
      ));
      
      console.log(`✅ Agent ${agentId} activated successfully`);
    } catch (error) {
      logError(error, 'Agent Activation', { agentId, user: user?.email });
      
      let errorType: ApiError['type'] = 'general';
      let errorMessage = 'An unexpected error occurred while processing your request.';
      let errorDetails = '';

      if (error instanceof Error) {
        if (error.message.includes('AI services unavailable')) {
          errorType = 'network';
          errorMessage = 'Both primary and fallback AI services are currently unavailable.';
          errorDetails = 'Please try again later or check your internet connection.';
        } else if (error.message.includes('Network error') || error.message.includes('fetch')) {
          errorType = 'network';
          errorMessage = 'Network error: Unable to connect to the AI service.';
          errorDetails = 'Please check your internet connection and try again.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorType = 'auth';
          errorMessage = 'Authentication error: AI service access denied.';
          errorDetails = 'Please check your API configuration.';
        } else {
          errorMessage = `AI Service Error: ${error.message}`;
          errorDetails = error.stack || 'No additional details available';
        }
      }

      setApiError({
        message: errorMessage,
        type: errorType,
        timestamp: new Date().toISOString(),
        details: errorDetails
      });
      
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'error' as const }
          : agent
      ));
    } finally {
      setIsLoading(false);
      setActiveAgent(null);
    }
  };

  const handleEmailSummarization = async () => {
    console.log('📧 Starting email summarization...');
    
    if (emails.length === 0) {
      console.log('ℹ️ No emails available for summarization');
      return;
    }
    
    for (const email of emails.slice(0, 5)) { // Limit to first 5 emails
      if (!email.summary) {
        try {
          console.log(`📝 Summarizing email: ${email.subject}`);
          const response = await apiService.generateResponse(
            `Summarize this email in one concise sentence: Subject: ${email.subject}, Content: ${email.content.substring(0, 500)}`
          );

          if (response instanceof Error) {
            throw new Error("Invalid response");
          }

          if (response.choices && response.choices[0]) {
            const summary = response.choices[0].message.content;
            console.log(`✅ Email summarized successfully: ${summary}`);
            setEmails(prev => prev.map(e => 
              e.id === email.id ? { ...e, summary } : e
            ));
          } else {
            console.warn('⚠️ No response choices received from API');
            throw new Error('Invalid response format from API');
          }
        } catch (error) {
          logError(error, 'Email Summarization', { emailId: email.id, subject: email.subject });
          throw error;
        }
      }
    }
    console.log('✅ Email summarization completed successfully');
  };

  const handleSpamDetection = async () => {
    console.log('🛡️ Starting spam detection...');
    
    if (emails.length === 0) {
      console.log('ℹ️ No emails available for spam detection');
      return;
    }
    
    // Simulate spam detection processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Spam detection completed');
  };

  const handleEmailComposition = async (data: {
    recipient: string;
    subject: string;
    content: string;
    persona: string;
  }) => {
    if (!accessToken) {
      setApiError({
        message: 'Gmail access required for sending emails.',
        type: 'auth',
        timestamp: new Date().toISOString(),
        details: 'Please ensure you are authenticated with Gmail.'
      });
      return;
    }

    setApiError(null);
    setIsLoading(true);
    
    try {
      console.log('✍️ Composing email with AI...');
      const prompt = `Compose a ${data.persona} email with the following details:
        Recipient: ${data.recipient}
        Subject: ${data.subject}
        Content brief: ${data.content}
        
        Please write a complete, well-structured email that matches the requested tone and style.`;
      
      const response = await apiService.generateResponse(prompt);
      
      if (response instanceof Error) {
        throw new Error("Invalid response format");
      }

      if (response.choices && response.choices[0]) {
        const composedEmail = response.choices[0].message.content;
        console.log('✅ Email composed successfully');
        
        // Send the email via Gmail API
        try {
          await gmailService.sendMessage(accessToken, {
            to: data.recipient,
            subject: data.subject,
            body: composedEmail
          });
          
          alert('Email sent successfully!');
          console.log('📧 Email sent via Gmail API');
        } catch (sendError) {
          console.error('Failed to send email:', sendError);
          alert(`Email composed but failed to send: ${sendError instanceof Error ? sendError.message : 'Unknown error'}`);
        }
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      logError(error, 'Email Composition', { compositionData: data });
      
      let errorType: ApiError['type'] = 'general';
      let errorMessage = 'Failed to compose email.';
      let errorDetails = '';

      if (error instanceof Error) {
        if (error.message.includes('AI services unavailable')) {
          errorType = 'network';
          errorMessage = 'Both primary and fallback AI services are currently unavailable.';
          errorDetails = 'Please try again later or check your internet connection.';
        } else if (error.message.includes('Network error') || error.message.includes('fetch')) {
          errorType = 'network';
          errorMessage = 'Network error: Unable to connect to the AI service.';
          errorDetails = 'Please check your internet connection.';
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorType = 'auth';
          errorMessage = 'Authentication error: AI service access denied.';
          errorDetails = 'Please verify your API configuration.';
        } else {
          errorMessage = `Failed to compose email: ${error.message}`;
          errorDetails = error.stack || 'No additional details available';
        }
      }

      setApiError({
        message: errorMessage,
        type: errorType,
        timestamp: new Date().toISOString(),
        details: errorDetails
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSpam = async (emailId: string) => {
    if (!accessToken) return;

    try {
      console.log(`🗑️ Deleting spam email: ${emailId}`);
      await gmailService.deleteMessages(accessToken, [emailId]);
      setSpamEmails(prev => prev.filter(email => email.id !== emailId));
      console.log('✅ Spam email deleted successfully');
    } catch (error) {
      console.error('Failed to delete spam email:', error);
      
      // Check if it's a permission error
      if (error instanceof Error && error.message.includes('403')) {
        setApiError({
          message: 'Insufficient permissions to delete emails. Please re-authenticate with full permissions.',
          type: 'auth',
          timestamp: new Date().toISOString(),
          details: 'Your current authentication token does not have the required scope to delete emails. Please log out and log back in to grant the necessary permissions.'
        });
      } else {
        alert('Failed to delete email. Please try again.');
      }
    }
  };

  const handleRefreshEmails = () => {
    loadEmails();
  };

  const dismissError = () => {
    console.log('❌ Dismissing error');
    setApiError(null);
  };

  const handleForceReauth = () => {
    console.log('🔄 Forcing re-authentication for updated permissions...');
    logout(); // This will clear tokens and redirect to auth
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'config':
        return Settings;
      case 'network':
        return AlertTriangle;
      case 'auth':
        return Shield;
      default:
        return AlertTriangle;
    }
  };

  const tabs = [
    { id: 'summary' as ContentView, label: 'Email Summaries', icon: Mail },
    { id: 'compose' as ContentView, label: 'Compose Email', icon: PenTool },
    { id: 'spam' as ContentView, label: 'Spam Detection', icon: Shield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Bot className="text-white" size={24} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">AI Email Platform</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleRefreshEmails}
                disabled={isLoadingEmails}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
              >
                <RefreshCw size={16} className={isLoadingEmails ? 'animate-spin' : ''} />
                {isLoadingEmails ? 'Loading...' : 'Refresh'}
              </button>
              <div className="flex items-center gap-2">
                <Activity size={16} className={apiError ? "text-red-500" : "text-green-500"} />
                <span className="text-sm text-gray-600">
                  {apiError ? "Error" : "Connected"}
                </span>
                {apiService.getConfigStatus().hasGeminiFallback && (
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    <Zap size={12} />
                    Gemini Backup
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {user?.avatar && (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Banner */}
        {apiError && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              {React.createElement(getErrorIcon(apiError.type), { 
                size: 20, 
                className: "text-red-600 mt-0.5 flex-shrink-0" 
              })}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-red-800 mb-1">
                  {apiError.type === 'config' && 'Configuration Notice'}
                  {apiError.type === 'network' && 'Network Error'}
                  {apiError.type === 'auth' && 'Authentication Error'}
                  {apiError.type === 'general' && 'Error'}
                </h3>
                <p className="text-sm text-red-700 mb-2">{apiError.message}</p>
                {apiError.details && (
                  <p className="text-xs text-red-600 mb-2">{apiError.details}</p>
                )}
                {apiError.type === 'auth' && apiError.message.includes('permissions') && (
                  <button
                    onClick={handleForceReauth}
                    className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                  >
                    <Key size={12} />
                    Re-authenticate with Full Permissions
                  </button>
                )}
                <p className="text-xs text-red-500 mt-2">
                  Error occurred at: {new Date(apiError.timestamp).toLocaleString()}
                </p>
              </div>
              <button
                onClick={dismissError}
                className="text-red-400 hover:text-red-600 transition-colors text-lg font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Agents Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Agents</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onActivate={handleAgentActivation}
                isActive={activeAgent === agent.id}
              />
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveContentView(tab.id)}
                    className={`group inline-flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-all ${
                      activeContentView === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent 
                      size={18} 
                      className={`transition-colors ${
                        activeContentView === tab.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      }`} 
                    />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeContentView === 'summary' && (
            <EmailSummary
              emails={emails}
              onRefresh={handleRefreshEmails}
              isLoading={isLoadingEmails}
            />
          )}
          
          {activeContentView === 'compose' && (
            <ComposeEmail
              onCompose={handleEmailComposition}
              isLoading={isLoading}
            />
          )}
          
          {activeContentView === 'spam' && (
            <SpamDetector
              spamEmails={spamEmails}
              onDeleteSpam={handleDeleteSpam}
              isLoading={isLoading}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export { Dashboard };