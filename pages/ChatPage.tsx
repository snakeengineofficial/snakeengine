
import React, { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import MessageInput from '../components/MessageInput';
import { sendMessageToAI } from '../services/geminiService';
import type { Message } from '../types';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init1',
      role: 'model',
      text: 'Hello! I am SnakeEngine AI, powered by Google. How can I assist you today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmedInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAI(messages, trimmedInput);
      const modelMessage: Message = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: aiResponse,
      };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'model',
        text: 'Sorry, something went wrong. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col w-full h-full bg-white/70 backdrop-blur-lg overflow-hidden">
        <header className="p-4 border-b border-gray-200/80 bg-white/50 flex-shrink-0">
            <h1 className="text-lg font-semibold text-gray-800">SnakeEngine AI</h1>
            <p className="text-sm text-gray-500">Your personal AI assistant.</p>
        </header>
        <ChatWindow messages={messages} isLoading={isLoading} />
        <MessageInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleSendMessage}
          isLoading={isLoading}
        />
    </div>
  );
};

export default ChatPage;
