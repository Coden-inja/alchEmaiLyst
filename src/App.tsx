import { useState, useEffect } from 'react';
import { GoogleAuthContext, useGoogleAuthProvider } from './hooks/useGoogleAuth';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { AuthCallback } from './components/AuthCallback';
import { Dashboard } from './components/Dashboard';
import { Landing } from './components/Landing';
import Terms from './components/Terms';
import Privacy from './components/Privacy';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

function App(): JSX.Element {
  const googleAuth = useGoogleAuthProvider();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthCallback, setIsAuthCallback] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const isPrivacyPage = urlParams.get('policy') === '1';

  useEffect(() => {
    console.log('📍 App.tsx useEffect - Checking for OAuth callback...');
    console.log('📍 Current URL:', window.location.href);
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    console.log('📋 URL Parameters found:', {
      code: code ? `${code.substring(0, 20)}...` : null,
      error,
      allParams: Object.fromEntries(urlParams.entries())
    });

    if (code || error) {
      console.log('✅ OAuth callback detected! Setting isAuthCallback to true');
      setIsAuthCallback(true);
    } else {
      console.log('ℹ️ No OAuth callback parameters found');
    }
  }, []);

if (isPrivacyPage) {
  return <Privacy />;
}
if (pathname === '/terms') {
  return <Terms />;
}

if (pathname === '/privacy') {
  return <Privacy />;
}
  const handleGetStarted = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  console.log('🎯 App.tsx render - Current state:', {
    isAuthCallback,
    isAuthenticated: googleAuth.isAuthenticated,
    showAuthModal
  });

  // Show auth callback component if this is a callback
  if (isAuthCallback) {
    console.log('🔄 Rendering AuthCallback component');
    return (
      <GoogleAuthContext.Provider value={googleAuth}>
        <AuthCallback />
      </GoogleAuthContext.Provider>
    );
  }

  console.log('🏠 Rendering main app content');
  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      <div className="min-h-screen">
        {googleAuth.isAuthenticated ? (
          <Dashboard />
        ) : (
          <Landing onGetStarted={handleGetStarted} />
        )}

        <GoogleAuthModal
          isOpen={showAuthModal}
          onClose={handleCloseAuthModal}
        />
        <BackToTop />
      </div>
      <Footer />
    </GoogleAuthContext.Provider>
  );
}

export default App;
