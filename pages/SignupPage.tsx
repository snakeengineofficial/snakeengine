
import React, { useState } from 'react';
import { SnakeEngineLogo } from '../components/Icons';

interface SignupPageProps {
  onSignup: (email: string) => void;
  onNavigateToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onNavigateToLogin }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onSignup(email);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-slate-300/30">
        <div className="flex flex-col items-center">
          <SnakeEngineLogo className="w-16 h-16 text-sky-500" />
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Get started with SnakeEngine AI
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
           <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="new-password" required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
             <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <input id="confirm-password" name="confirm-password" type="password" autoComplete="new-password" required className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Sign up
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <button onClick={onNavigateToLogin} className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
};

export default SignupPage;
