export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  persona?: string;
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