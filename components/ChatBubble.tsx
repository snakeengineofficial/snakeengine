
import React from 'react';
import type { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const bubbleClasses = isUser
    ? 'bg-white text-gray-800 self-end rounded-t-2xl rounded-bl-2xl shadow'
    : 'bg-blue-500 text-white self-start rounded-t-2xl rounded-br-2xl shadow';

  return (
    <div className={`w-full flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-[80%] md:max-w-[70%] p-3 md:p-4 break-words ${bubbleClasses}`}>
            <p className="text-sm md:text-base">{message.text}</p>
        </div>
    </div>
  );
};

export default ChatBubble;
