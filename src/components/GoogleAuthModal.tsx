import React from 'react';
import { X, Mail, Shield, Key } from 'lucide-react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

interface GoogleAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleAuthModal: React.FC<GoogleAuthModalProps> = ({ isOpen, onClose }) => {
  const { login, isLoading } = useGoogleAuth();

  const handleGoogleLogin = () => {
    login();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Mail className="text-white" size={32} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connect Your Gmail
          </h2>
          <p className="text-gray-600">
            Securely connect your Gmail account to enable AI-powered email management
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Mail className="text-blue-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-blue-900">Read & Analyze Emails</p>
              <p className="text-xs text-blue-700">AI will summarize and categorize your emails</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <Shield className="text-green-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-green-900">Spam Detection</p>
              <p className="text-xs text-green-700">Automatically identify and manage spam emails</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
            <Key className="text-purple-600 flex-shrink-0" size={20} />
            <div>
              <p className="text-sm font-medium text-purple-900">Compose & Send</p>
              <p className="text-xs text-purple-700">AI-powered email composition and sending</p>
            </div>
          </div>
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            By connecting your Gmail, you agree to our secure handling of your email data. 
            We only access what's necessary for AI processing.
          </p>
        </div>
      </div>
    </div>
  );
};