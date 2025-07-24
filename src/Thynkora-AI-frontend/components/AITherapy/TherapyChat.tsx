import React, { useState, useRef, useEffect } from 'react';
import './TherapyChat.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface TherapyChatProps {
  aiActor?: any;
  userProfile?: any;
}

const TherapyChat: React.FC<TherapyChatProps> = ({ aiActor, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

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

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { sender: 'user', text: input, timestamp: now };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      const botMessage: Message = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsBotTyping(false);
    }, 1000);
  };

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <h1 className="chat-title">Thynkora Therapy Bot</h1>
      </div>

      {/* Chat area */}
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message-row ${msg.sender === 'user' ? 'message-user' : 'message-bot'}`}>
            <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
              {msg.text}
              <div className="message-timestamp">{msg.timestamp}</div>
            </div>
          </div>
        ))}

        {/* Bot typing indicator */}
        {isBotTyping && (
          <div className="message-row message-bot">
            <div className="typing-indicator">
              <div className="dot">•</div>
              <div className="dot">•</div>
              <div className="dot">•</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input">
        <div className="input-wrapper">
          <input
            className="input-field"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button className="send-button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default TherapyChat;
