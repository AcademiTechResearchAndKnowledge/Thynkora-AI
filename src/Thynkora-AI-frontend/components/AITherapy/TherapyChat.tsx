import React, { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface TherapyChatProps {
  aiActor?: any;
  userProfile?: any;
}

const TherapyChat: React.FC<TherapyChatProps> = ({ aiActor, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (text: string): string => {
    const lower = text.toLowerCase();

    if (lower.includes('sad') || lower.includes('depressed')) {
      return "I'm really sorry you're feeling this way. Want to talk more about it?";
    } else if (lower.includes('angry') || lower.includes('mad')) {
      return "It's okay to feel angry. Can you tell me what's making you feel this way?";
    } else if (lower.includes('anxious') || lower.includes('worried')) {
      return "Anxiety can be overwhelming. Take a deep breath. I'm here.";
    } else if (lower.includes('happy') || lower.includes('grateful')) {
      return "That's wonderful to hear! 😊 What’s bringing you joy today?";
    } else if (lower.includes('suicide') || lower.includes('end it all') || lower.includes('kill myself')) {
      return "⚠️ It sounds like you're going through something very serious. Please consider reaching out to a mental health professional or support line.";
    } else {
      return "Tell me more. I'm listening.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', text: input };
    const botMessage: Message = { sender: 'bot', text: getBotResponse(input) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center justify-between px-6 py-4 shadow-sm border-b bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-800">Thynkora Therapy Bot</h1>
        <span className="text-sm text-gray-500">User: {userProfile?.name || 'Guest'}</span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-lg shadow ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-gray-200 text-gray-900 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapyChat;
