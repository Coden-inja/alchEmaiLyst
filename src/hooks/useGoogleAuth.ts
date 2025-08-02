import { useState, useEffect, createContext, useContext } from 'react';
import { googleAuthService } from '../services/googleAuth';
import { GoogleAuthContextType, User } from '../types';

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export const useGoogleAuth = () => {
  const context = useContext(GoogleAuthContext);
  if (!context) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
};

export const useGoogleAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      console.log('🔐 Initializing authentication...');
      const tokens = googleAuthService.getStoredTokens();
      
      if (tokens) {
        console.log('📱 Found stored tokens, checking validity...');
        const now = Date.now();
        const expiresAt = now + tokens.expires_in * 1000;
        
        console.log('⏰ Token expiry check:', {
          now: new Date(now).toISOString(),
          expiresAt: new Date(expiresAt).toISOString(),
          isExpired: now >= expiresAt,
          hasRefreshToken: !!tokens.refresh_token
        });
        
        if (now >= expiresAt && tokens.refresh_token) {
          console.log('🔄 Refreshing expired access token...');
          await refreshToken(tokens.refresh_token);
        } else if (now < expiresAt) {
          console.log('✅ Token is still valid, loading user info...');
          setAccessToken(tokens.access_token);
          await loadUserInfo(tokens.access_token);
        } else {
          console.log('❌ Token expired and no refresh token available');
          googleAuthService.clearTokens();
        }
      } else {
        console.log('ℹ️ No stored tokens found');
      }
    } catch (error) {
      console.error('❌ Failed to initialize auth:', error);
      googleAuthService.clearTokens();
    } finally {
      setIsLoading(false);
      console.log('✅ Authentication initialization complete');
    }
  };

  const refreshToken = async (refreshToken: string) => {
    try {
      console.log('🔄 Refreshing access token...');
      const newTokens = await googleAuthService.refreshAccessToken(refreshToken);
      
      const updatedTokens = {
        ...newTokens,
        refresh_token: refreshToken, // Preserve refresh token
        created_at: Date.now(),
        expires_at: Date.now() + newTokens.expires_in * 1000
      };
      
      console.log('✅ Token refreshed successfully');
      googleAuthService.storeTokens(updatedTokens);
      setAccessToken(updatedTokens.access_token);
      await loadUserInfo(updatedTokens.access_token);
    } catch (error) {
      console.error('❌ Failed to refresh token:', error);
      googleAuthService.clearTokens();
      setUser(null);
      setAccessToken(null);
      throw error;
    }
  };

  const loadUserInfo = async (token: string) => {
    try {
      console.log('👤 Loading user information...');
      const userInfo = await googleAuthService.getUserInfo(token);
      
      console.log('✅ User info loaded:', {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        hasAvatar: !!userInfo.picture
      });
      
      const userData: User = {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name?userInfo.name:"",
        avatar: userInfo.picture,
        persona: 'Professional and friendly communication style',
      };
      setUser(userData);
    } catch (error) {
      console.error('❌ Failed to load user info:', error);
      throw error;
    }
  };

  const login = () => {
    console.log('🚀 Initiating Google OAuth login...');
    
    const configStatus = googleAuthService.validateConfig();
    console.log('⚙️ Configuration status:', configStatus);
    
    if (!configStatus.isValid) {
      console.error('❌ Google OAuth not configured:', configStatus.missingVars);
      alert(`Google OAuth configuration missing: ${configStatus.missingVars.join(', ')}\n\nPlease check your .env.local file.`);
      return;
    }

    const authUrl = googleAuthService.getAuthUrl();
    console.log('🌐 Redirecting to Google OAuth:', authUrl);
    window.location.href = authUrl;
  };

  const handleAuthCallback = async (code: string) => {
    setIsLoading(true);
    try {
      console.log('🔐 Processing OAuth callback...');
      console.log('📝 Authorization code received:', code ? `${code.substring(0, 20)}...` : 'NONE');
      
      const tokens = await googleAuthService.exchangeCodeForTokens(code);
      console.log('✅ Tokens received from Google:', {
        hasAccessToken: !!tokens.access_token,
        hasRefreshToken: !!tokens.refresh_token,
        expiresIn: tokens.expires_in,
        tokenType: tokens.token_type
      });
      
      // Add metadata to tokens
      const tokensWithMetadata = {
        ...tokens,
        created_at: Date.now(),
        expires_at: Date.now() + tokens.expires_in * 1000
      };
      
      googleAuthService.storeTokens(tokensWithMetadata);
      setAccessToken(tokens.access_token);
      await loadUserInfo(tokens.access_token);
      
      console.log('✅ Authentication completed successfully');
    } catch (error) {
      console.error('❌ Authentication failed:', error);
      
      // Enhanced error logging
      console.group('🚨 Authentication Error Details');
      console.error('Error object:', error);
      console.log('Error type:', error instanceof Error ? error.constructor.name : typeof error);
      console.log('Error message:', error instanceof Error ? error.message : String(error));
      console.log('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      console.groupEnd();
      
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('👋 Logging out user...');
    googleAuthService.clearTokens();
    setUser(null);
    setAccessToken(null);
    console.log('✅ Logout completed');
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    accessToken,
    handleAuthCallback,
  };
};

export { GoogleAuthContext };