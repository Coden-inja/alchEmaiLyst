import { GoogleAuth } from 'google-auth-library';

interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

class GoogleAuthService {
  private config: GoogleAuthConfig;
  private auth: GoogleAuth | null = null;

  constructor() {
    // Use dynamic redirect URI based on current origin
    const redirectUri = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    
    this.config = {
      clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      redirectUri,
      scopes: [
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        'https://www.googleapis.com/auth/gmail.modify',
        'https://www.googleapis.com/auth/gmail.compose',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://mail.google.com/'
      ]
    };

    console.log('⚙️ Google Auth Service initialized with config:', {
      clientId: this.config.clientId ? `${this.config.clientId.substring(0, 20)}...` : 'NOT SET',
      clientSecret: this.config.clientSecret ? 'SET' : 'NOT SET',
      redirectUri: this.config.redirectUri,
      scopes: this.config.scopes
    });
  }

  validateConfig(): { isValid: boolean; missingVars: string[] } {
    const missingVars: string[] = [];
    
    if (!this.config.clientId) missingVars.push('VITE_GOOGLE_CLIENT_ID');
    if (!this.config.clientSecret) missingVars.push('VITE_GOOGLE_CLIENT_SECRET');
    // Note: redirectUri is now dynamic, so we don't check for VITE_GOOGLE_REDIRECT_URI

    const result = {
      isValid: missingVars.length === 0,
      missingVars
    };

    console.log('🔍 Configuration validation:', result);
    return result;
  }

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      response_type: 'code',
      scope: this.config.scopes.join(' '),
      access_type: 'offline',
      prompt: 'consent',
      include_granted_scopes: 'true'
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    console.log('🔗 Generated auth URL:', authUrl);
    console.log('🎯 Using redirect URI:', this.config.redirectUri);
    console.log('🔐 Requesting scopes:', this.config.scopes);
    return authUrl;
  }

  async exchangeCodeForTokens(code: string): Promise<any> {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.config.redirectUri
    });

    console.log('🔄 Exchanging code for tokens...');
    console.log('📡 Token endpoint:', tokenEndpoint);
    console.log('📝 Request params:', {
      client_id: this.config.clientId ? `${this.config.clientId.substring(0, 20)}...` : 'NOT SET',
      client_secret: this.config.clientSecret ? 'SET' : 'NOT SET',
      code: code ? `${code.substring(0, 20)}...` : 'NOT SET',
      grant_type: 'authorization_code',
      redirect_uri: this.config.redirectUri
    });

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      console.log('📡 Token exchange response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Token exchange failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Token exchange failed: ${response.status} - ${errorText}`);
      }

      const tokens = await response.json();
      console.log('✅ Tokens received successfully:', {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        expiresIn: tokens.expires_in,
        tokenType: tokens.token_type,
        scope: tokens.scope
      });

      return tokens;
    } catch (error) {
      console.error('❌ Token exchange error:', error);
      throw error;
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<any> {
    const tokenEndpoint = 'https://oauth2.googleapis.com/token';
    
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    });

    console.log('🔄 Refreshing access token...');

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString()
      });

      console.log('📡 Token refresh response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Token refresh failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Token refresh failed: ${response.status} - ${errorText}`);
      }

      const tokens = await response.json();
      console.log('✅ Token refreshed successfully');
      return tokens;
    } catch (error) {
      console.error('❌ Token refresh error:', error);
      throw error;
    }
  }

  async getUserInfo(accessToken: string): Promise<any> {
    console.log('👤 Fetching user info...');
    
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      console.log('📡 User info response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to fetch user info:', {
          status: response.status,
          statusText: response.statusText,
          error: errorText
        });
        throw new Error(`Failed to fetch user info: ${response.status} - ${errorText}`);
      }

      const userInfo = await response.json();
      console.log('✅ User info fetched successfully:', {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        hasAvatar: !!userInfo.picture
      });

      return userInfo;
    } catch (error) {
      console.error('❌ User info fetch error:', error);
      throw error;
    }
  }

  storeTokens(tokens: any): void {
    console.log('💾 Storing tokens in localStorage...');
    localStorage.setItem('google_tokens', JSON.stringify(tokens));
    console.log('✅ Tokens stored successfully');
  }

  getStoredTokens(): any | null {
    const stored = localStorage.getItem('google_tokens');
    const tokens = stored ? JSON.parse(stored) : null;
    
    if (tokens) {
      console.log('📱 Retrieved stored tokens:', {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        createdAt: tokens.created_at ? new Date(tokens.created_at).toISOString() : 'unknown',
        expiresAt: tokens.expires_at ? new Date(tokens.expires_at).toISOString() : 'unknown',
        scope: tokens.scope || 'unknown'
      });
    } else {
      console.log('📱 No stored tokens found');
    }
    
    return tokens;
  }

  clearTokens(): void {
    console.log('🗑️ Clearing stored tokens...');
    localStorage.removeItem('google_tokens');
    console.log('✅ Tokens cleared successfully');
  }

  isAuthenticated(): boolean {
    const tokens = this.getStoredTokens();
    const isAuth = !!(tokens && tokens.access_token);
    console.log('🔍 Authentication check:', isAuth);
    return isAuth;
  }

  // Force re-authentication to get updated scopes
  forceReauth(): void {
    console.log('🔄 Forcing re-authentication...');
    this.clearTokens();
    window.location.href = this.getAuthUrl();
  }
}

export const googleAuthService = new GoogleAuthService();