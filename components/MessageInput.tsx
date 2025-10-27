
import React from 'react';

interface MessageInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"/>
    </svg>
);


const MessageInput: React.FC<MessageInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="p-4 bg-white/60 backdrop-blur-sm border-t border-gray-200/80">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Ask anything..."
          className="w-full py-3 pl-4 pr-12 text-sm text-gray-800 bg-gray-100 border-2 border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || value.trim() === ''}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white transition-colors duration-200 bg-blue-500 rounded-full disabled:bg-gray-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Send message"
        >
          <SendIcon className="w-5 h-5"/>
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
