export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  persona?: string;
  password?:string
}

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  isSpam?: boolean;
  isRead?: boolean;
  summary?: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  icon: string;
  color: string;
  lastActivity?: string;
}

export interface ComposeEmailRequest {
  recipient: string;
  subject: string;
  content: string;
  persona: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

export interface OpenAICompatibleResponse {
    choices: {
        message: {
            content: string;
        };
    }[];
}

export interface ConfigStatus{
  configured: boolean;
  missingVars: string[];
  hasGeminiFallback: boolean
}

export interface ApiHealthStatus {
  success: boolean;
  error?: string
}

export interface DebugInfo {
  url: string;
  params: Record<string, string>;
  timestamp: string;
}

export interface GoogleOAuthTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
  token_type: 'Bearer';
  id_token?: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  hd?: string;
}

export interface GoogleAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface GoogleAuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  accessToken: string | null;
  handleAuthCallback: (code: string) => Promise<void>;
}

export interface ApiError {
  message: string;
  type: 'config' | 'network' | 'auth' | 'general';
  timestamp: string;
  details?: string;
}