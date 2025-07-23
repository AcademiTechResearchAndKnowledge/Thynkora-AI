import React, { useState, useEffect, useRef } from 'react';
import './TherapyChat.css';
const TherapyChat = ({ aiActor, userProfile }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const chatEndRef = useRef(null);
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
                const welcomeMessage = {
                    id: 0,
                    content: `Hello! I'm here to provide emotional support and guidance. Everything we discuss is private and secure. How are you feeling today?`,
                    isUser: false,
                    timestamp: Date.now(),
                };
                setMessages([welcomeMessage]);
            }
        }
        catch (error) {
            console.error('Failed to start session:', error);
        }
    };
    const sendMessage = async () => {
        if (!inputMessage.trim() || !sessionId || isLoading)
            return;
        const userMessage = {
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
                const aiMessage = {
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
        }
        catch (error) {
            console.error('Failed to send message:', error);
            const errorMessage = {
                id: messages.length + 2,
                content: 'I apologize, but I encountered an error. Please try again.',
                isUser: false,
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, errorMessage]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const showEmergencyOptions = () => {
        // Show emergency support options
        const emergencyMessage = {
            id: messages.length + 10,
            content: 'I want to make sure you have immediate support options available:',
            isUser: false,
            timestamp: Date.now(),
            supportActions: ['crisis_hotline', 'emergency_contact', 'breathing_exercise'],
        };
        setMessages(prev => [...prev, emergencyMessage]);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };
    const renderSupportActions = (actions) => {
        if (!actions || actions.length === 0)
            return null;
        return (React.createElement("div", { className: "support-actions" }, actions.map((action, index) => (React.createElement("button", { key: index, className: "support-action-btn", onClick: () => handleSupportAction(action) }, getSupportActionLabel(action))))));
    };
    const getSupportActionLabel = (action) => {
        const labels = {
            'crisis_hotline': '📞 Crisis Hotline',
            'emergency_contact': '🚨 Emergency Contact',
            'breathing_exercise': '🫁 Breathing Exercise',
            'coping_strategies': '🛠️ Coping Strategies',
            'mindfulness_exercise': '🧘 Mindfulness',
            'journal_prompt': '📝 Journal Prompt',
        };
        return labels[action] || action;
    };
    const handleSupportAction = (action) => {
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
    return (React.createElement("div", { className: "therapy-chat" },
        React.createElement("div", { className: "chat-header" },
            React.createElement("h2", null, "\uD83E\uDD16 AI Therapy Session"),
            React.createElement("div", { className: "session-info" },
                React.createElement("span", null,
                    "Session: ",
                    sessionId?.slice(-8)),
                React.createElement("span", { className: "privacy-indicator" }, "\uD83D\uDD12 Private & Secure"))),
        React.createElement("div", { className: "chat-messages" },
            messages.map((message) => (React.createElement("div", { key: message.id, className: `message ${message.isUser ? 'user' : 'ai'}` },
                React.createElement("div", { className: "message-content" },
                    React.createElement("p", null, message.content),
                    message.riskLevel && message.riskLevel >= 7 && (React.createElement("div", { className: "risk-indicator high-risk" }, "\u26A0\uFE0F High Risk Detected")),
                    renderSupportActions(message.supportActions)),
                React.createElement("div", { className: "message-timestamp" }, new Date(message.timestamp).toLocaleTimeString())))),
            isLoading && (React.createElement("div", { className: "message ai" },
                React.createElement("div", { className: "message-content" },
                    React.createElement("div", { className: "typing-indicator" },
                        React.createElement("span", null),
                        React.createElement("span", null),
                        React.createElement("span", null))))),
            React.createElement("div", { ref: chatEndRef })),
        React.createElement("div", { className: "chat-input" },
            React.createElement("textarea", { value: inputMessage, onChange: (e) => setInputMessage(e.target.value), onKeyPress: handleKeyPress, placeholder: "Share what's on your mind...", rows: 3, disabled: isLoading }),
            React.createElement("button", { onClick: sendMessage, disabled: !inputMessage.trim() || isLoading, className: "send-button" }, "Send")),
        React.createElement("div", { className: "chat-disclaimer" },
            React.createElement("p", null, "\uD83D\uDD12 This conversation is private and encrypted. In crisis situations, we may connect you with professional resources."))));
};
export default TherapyChat;
