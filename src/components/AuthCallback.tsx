import React, { useEffect, useState } from 'react';
import { useGoogleAuth } from '../hooks/useGoogleAuth';
import { Bot, CheckCircle, XCircle, Loader, AlertTriangle } from 'lucide-react';
import { DebugInfo } from '../types';

interface DebugInfo {
  url: string;
  params: Record<string, string>;
  timestamp: string;
}

export const AuthCallback: React.FC = () => {
  console.log('🚀 AuthCallback component is rendering!');
  console.log('📍 Current URL in AuthCallback:', window.location.href);

  const { handleAuthCallback } = useGoogleAuth();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [error, setError] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);
  const [hasHandled, setHasHandled] = useState<boolean>(false);

  useEffect(() => {
    if (hasHandled) return;

    setHasHandled(true);
    console.log('🔥 AuthCallback useEffect is running!');

    const processCallback = async () => {
      try {
        console.group('🔐 OAuth Callback Processing');

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const errorParam = urlParams.get('error');
        const state = urlParams.get('state');

        const debug: DebugInfo = {
          url: window.location.href,
          params: Object.fromEntries(urlParams.entries()),
          timestamp: new Date().toISOString()
        };

        setDebugInfo(debug);

        console.log('📋 URL Parameters:', {
          code: code ? `${code.substring(0, 20)}...` : null,
          error: errorParam,
          state,
          fullUrl: debug.url
        });

        if (errorParam) {
          console.error('❌ OAuth Error from Google:', errorParam);
          throw new Error(`OAuth error: ${errorParam}`);
        }

        if (!code) {
          console.error('❌ No authorization code received');
          console.log('Available URL params:', Object.fromEntries(urlParams.entries()));
          return;
        }

        console.log('✅ Authorization code received, exchanging for tokens...');
        await handleAuthCallback(code);

        console.log('✅ Authentication successful, redirecting...');
        setStatus('success');

        setTimeout(() => {
          window.history.replaceState({}, document.title, '/');
          window.location.reload();
        }, 2000);
      } catch (err) {
        console.error('❌ Auth callback error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
        setError(errorMessage);
        setStatus('error');

        console.group('🚨 Authentication Error Details');
        console.error('Error:', err);
        console.log('Debug Info:', debugInfo);
        console.log('Current URL:', window.location.href);
        console.log('User Agent:', navigator.userAgent);
        console.groupEnd();
      }
    };

    processCallback();
  }, [debugInfo, handleAuthCallback, hasHandled]);

  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader className="animate-spin text-blue-600" size={48} />;
      case 'success':
        return <CheckCircle className="text-green-600" size={48} />;
      case 'error':
        return <XCircle className="text-red-600" size={48} />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'processing':
        return {
          title: 'Authenticating...',
          description: 'Please wait while we complete your Google authentication.'
        };
      case 'success':
        return {
          title: 'Authentication Successful!',
          description: 'Redirecting you to the dashboard...'
        };
      case 'error':
        return {
          title: 'Authentication Failed',
          description: error || 'An unexpected error occurred during authentication.'
        };
    }
  };

  const statusInfo = getStatusMessage();
  if (!hasHandled && status === 'processing') return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
              <Bot className="text-white" size={32} />
            </div>
          </div>

          <div className="mb-6">
            {getStatusIcon()}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {statusInfo.title}
          </h1>

          <p className="text-gray-600 mb-6">
            {statusInfo.description}
          </p>

          {status === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-red-600" />
                  <p className="text-sm font-medium text-red-800">Error Details:</p>
                </div>
                <p className="text-sm text-red-700 mb-2">{error}</p>
                {debugInfo && (
                  <details className="text-xs text-red-600">
                    <summary className="cursor-pointer hover:text-red-800">Debug Information</summary>
                    <pre className="mt-2 p-2 bg-red-100 rounded text-xs overflow-auto">
                      {JSON.stringify(debugInfo, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Return to Home
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {status === 'processing' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                This may take a few moments...
              </p>
              {debugInfo && (
                <details className="text-xs text-blue-600 mt-2">
                  <summary className="cursor-pointer hover:text-blue-800">Processing Details</summary>
                  <pre className="mt-2 p-2 bg-blue-100 rounded text-xs overflow-auto">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                ✅ Successfully authenticated with Google!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
