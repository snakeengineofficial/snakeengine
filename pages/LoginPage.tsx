
import React from 'react';
import { SnakeEngineLogo } from '../components/Icons';

interface LoginPageProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
  onGuestLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignup, onGuestLogin }) => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-slate-300/30">
        <div className="flex flex-col items-center">
          <SnakeEngineLogo className="w-16 h-16 text-sky-500" />
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Sign in to continue to SnakeEngine
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm" placeholder="Email address" defaultValue="demo@snakeengine.ai" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm" placeholder="Password" defaultValue="password" />
            </div>
          </div>

          <div>
            <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Sign in
            </button>
          </div>
        </form>

        <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white">Or</span>
            </div>
        </div>

        <div>
            <button onClick={onGuestLogin} className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md group hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Continue as Guest
            </button>
        </div>

        <p className="text-sm text-center text-gray-600">
          Not a member?{' '}
          <button onClick={onNavigateToSignup} className="font-medium text-blue-600 hover:text-blue-500">
            Sign up now
          </button>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
