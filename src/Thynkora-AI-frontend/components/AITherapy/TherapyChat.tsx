import React, { useState, useEffect, useRef } from 'react';
import './TherapyChat.css';

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: number;
  riskLevel?: number;
  supportActions?: string[];
}

interface TherapyChatProps {
  aiActor: any;
  userProfile: any;
}

const TherapyChat: React.FC<TherapyChatProps> = ({ aiActor, userProfile }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const startSession = async () => {
    try {
      const result = await aiActor.startSession();
      if ('ok' in result) {
        setSessionId(result.ok);
        // Add welcome message
        const welcomeMessage: Message = {
          id: 0,
          content: `Hello! I'm here to provide emotional support and guidance. Everything we discuss is private and secure. How are you feeling today?`,
          isUser: false,
          timestamp: Date.now(),
        };
        setMessages([welcomeMessage]);
      }
    } catch (error) {
      console.error('Failed to start session:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || !sessionId || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const result = await aiActor.sendMessage(sessionId, inputMessage);
      if ('ok' in result) {
        const aiMessage: Message = {
          id: result.ok.id,
          content: result.ok.content,
          isUser: false,
          timestamp: result.ok.timestamp,
          riskLevel: result.ok.riskLevel?.[0],
          supportActions: result.ok.supportActions,
        };
        setMessages(prev => [...prev, aiMessage]);
        
        // Handle high risk situations
        if (aiMessage.riskLevel && aiMessage.riskLevel >= 7) {
          showEmergencyOptions();
        }
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        content: 'I apologize, but I encountered an error. Please try again.',
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const showEmergencyOptions = () => {
    // Show emergency support options
    const emergencyMessage: Message = {
      id: messages.length + 10,
      content: 'I want to make sure you have immediate support options available:',
      isUser: false,
      timestamp: Date.now(),
      supportActions: ['crisis_hotline', 'emergency_contact', 'breathing_exercise'],
    };
    setMessages(prev => [...prev, emergencyMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderSupportActions = (actions?: string[]) => {
    if (!actions || actions.length === 0) return null;

    return (
      <div className="support-actions">
        {actions.map((action, index) => (
          <button
            key={index}
            className="support-action-btn"
            onClick={() => handleSupportAction(action)}
          >
            {getSupportActionLabel(action)}
          </button>
        ))}
      </div>
    );
  };

  const getSupportActionLabel = (action: string): string => {
    const labels: { [key: string]: string } = {
      'crisis_hotline': '📞 Crisis Hotline',
      'emergency_contact': '🚨 Emergency Contact',
      'breathing_exercise': '🫁 Breathing Exercise',
      'coping_strategies': '🛠️ Coping Strategies',
      'mindfulness_exercise': '🧘 Mindfulness',
      'journal_prompt': '📝 Journal Prompt',
    };
    return labels[action] || action;
  };

  const handleSupportAction = (action: string) => {
    // Handle different support actions
    switch (action) {
      case 'crisis_hotline':
        window.open('tel:988', '_blank'); // US National Suicide Prevention Lifeline
        break;
      case 'breathing_exercise':
        // Could open a breathing exercise component
        break;
      default:
        console.log(`Support action: ${action}`);
    }
  };

  return (
    <div className="therapy-chat">
      <div className="chat-header">
        <h2>🤖 AI Therapy Session</h2>
        <div className="session-info">
          <span>Session: {sessionId?.slice(-8)}</span>
          <span className="privacy-indicator">🔒 Private & Secure</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? 'user' : 'ai'}`}
          >
            <div className="message-content">
              <p>{message.content}</p>
              {message.riskLevel && message.riskLevel >= 7 && (
                <div className="risk-indicator high-risk">
                  ⚠️ High Risk Detected
                </div>
              )}
              {renderSupportActions(message.supportActions)}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share what's on your mind..."
          rows={3}
          disabled={isLoading}
        />
        <button
          onClick={sendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="send-button"
        >
          Send
        </button>
      </div>

      <div className="chat-disclaimer">
        <p>
          🔒 This conversation is private and encrypted. 
          In crisis situations, we may connect you with professional resources.
        </p>
      </div>
    </div>
  );
};

export default TherapyChat;
