
import React, { useState } from 'react';
import { SnakeEngineLogo } from '../components/Icons';

interface VerificationPageProps {
  email: string;
  onVerify: () => void;
  onNavigateToLogin: () => void;
}

const VerificationPage: React.FC<VerificationPageProps> = ({ email, onVerify, onNavigateToLogin }) => {
  const [code, setCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd verify the code against a backend service.
    // For this demo, we'll accept any 6-digit code.
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      onVerify();
    } else {
      alert("Please enter a valid 6-digit code.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-slate-300/30">
        <div className="flex flex-col items-center">
          <SnakeEngineLogo className="w-16 h-16 text-sky-500" />
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Check your email
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            We sent a verification code to <br/>
            <strong className="font-medium text-gray-800">{email}</strong>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="verification-code" className="sr-only">Verification Code</label>
            <input 
              id="verification-code" 
              name="code" 
              type="text" 
              inputMode="numeric"
              autoComplete="one-time-code" 
              required 
              className="relative block w-full px-3 py-2 text-center tracking-[0.5em] text-lg text-gray-900 placeholder-gray-500 bg-gray-100 border-2 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 sm:text-base" 
              placeholder="______"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
            />
          </div>

          <div>
            <button type="submit" className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              Verify Account
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Didn't get a code?{' '}
          <button onClick={() => alert('A new code has been sent!')} className="font-medium text-blue-600 hover:text-blue-500">
            Resend
          </button>
        </p>
         <p className="mt-4 text-xs text-center text-gray-500">
          Wrong email?{' '}
          <button onClick={onNavigateToLogin} className="font-medium text-blue-600 hover:text-blue-500">
            Start Over
          </button>
        </p>
      </div>
    </main>
  );
};

export default VerificationPage;
