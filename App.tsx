import React, { useState } from 'react';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import VerificationPage from './pages/VerificationPage';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import ImageStudioPage from './pages/ImageStudioPage';

type View = 'login' | 'signup' | 'verification';
type Page = 'chat' | 'ai_studio';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState<View>('login');
  const [currentPage, setCurrentPage] = useState<Page>('chat');
  const [userEmail, setUserEmail] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  const handleGuestLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignupAttempt = (email: string) => {
    console.log(`Simulating sending verification code to ${email}`);
    setUserEmail(email);
    setCurrentView('verification');
  };

  const handleVerificationSuccess = () => {
    setIsLoggedIn(true);
    setUserEmail('');
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setUserEmail('');
  };
  
  const navigateAuth = (view: View) => {
    setCurrentView(view);
  };

  const navigateApp = (page: Page) => {
    setCurrentPage(page);
  };

  if (!isLoggedIn) {
    switch (currentView) {
      case 'signup':
        return <SignupPage onSignup={handleSignupAttempt} onNavigateToLogin={() => navigateAuth('login')} />;
      case 'verification':
        return <VerificationPage email={userEmail} onVerify={handleVerificationSuccess} onNavigateToLogin={() => navigateAuth('login')} />;
      case 'login':
      default:
        return <LoginPage onLogin={handleLogin} onNavigateToSignup={() => navigateAuth('signup')} onGuestLogin={handleGuestLogin} />;
    }
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'ai_studio':
        return <ImageStudioPage />;
      case 'chat':
      default:
        return (
          <div className="w-full h-full rounded-2xl shadow-lg shadow-slate-300/30 overflow-hidden">
            <ChatPage />
          </div>
        );
    }
  };

  return (
    <div className="flex w-full h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed} 
        onSignOut={handleSignOut}
        currentPage={currentPage}
        onNavigate={navigateApp}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full h-full max-w-4xl mx-auto">
             {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
};

export default App;
