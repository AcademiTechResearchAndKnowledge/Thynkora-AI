import React, { useState, useRef, useEffect } from 'react';
import './TherapyChat.css';
const landingBg = new URL('../pages/landing-bg.jpg', import.meta.url).href;
const [showLanding, setShowLanding] = useState(true);
const TherapyChat = ({ aiActor, userProfile }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);
    const getBotResponse = (text) => {
        const lower = text.toLowerCase();
        if (lower.includes('sad') || lower.includes('depressed')) {
            return "I'm really sorry you're feeling this way. Want to talk more about it?";
        }
        else if (lower.includes('angry') || lower.includes('mad')) {
            return "It's okay to feel angry. Can you tell me what's making you feel this way?";
        }
        else if (lower.includes('anxious') || lower.includes('worried')) {
            return "Anxiety can be overwhelming. Take a deep breath. I'm here.";
        }
        else if (lower.includes('happy') || lower.includes('grateful')) {
            return "That's wonderful to hear! 😊 What’s bringing you joy today?";
        }
        else if (lower.includes('suicide') || lower.includes('end it all') || lower.includes('kill myself')) {
            return "⚠️ It sounds like you're going through something very serious. Please consider reaching out to a mental health professional or support line.";
        }
        else {
            return "Tell me more. I'm listening.";
        }
    };
    const handleSend = () => {
        if (!input.trim())
            return;
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMessage = { sender: 'user', text: input, timestamp: now };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsBotTyping(true);
        setTimeout(() => {
            const botResponse = getBotResponse(input);
            const botMessage = {
                sender: 'bot',
                text: botResponse,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsBotTyping(false);
        }, 1000);
    };
    return (React.createElement("div", { className: "chat-container" },
        React.createElement("div", { className: "chat-header" },
            React.createElement("h1", { className: "chat-title" }, "Thynkora Therapy Bot"),
            React.createElement("button", { onClick: () => setShowLanding(true), className: "absolute top-4 left-4 px-4 py-2 bg-gray-300 rounded", style: {
                    position: 'absolute',
                    bottom: '1em',
                    left: '50%',
                    transform: 'translateX(-395%)',
                    padding: '1.5rem 5rem',
                    fontSize: '1.2rem',
                    backgroundColor: 'rgba(0, 0, 0, 100)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    zIndex: 10,
                } }, "\u2190 Back")),
        React.createElement("div", { className: "chat-messages" },
            messages.map((msg, index) => (React.createElement("div", { key: index, className: `message-row ${msg.sender === 'user' ? 'message-user' : 'message-bot'}` },
                React.createElement("div", { className: `message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}` },
                    msg.text,
                    React.createElement("div", { className: "message-timestamp" }, msg.timestamp))))),
            isBotTyping && (React.createElement("div", { className: "message-row message-bot" },
                React.createElement("div", { className: "typing-indicator" },
                    React.createElement("div", { className: "dot" }, "\u2022"),
                    React.createElement("div", { className: "dot" }, "\u2022"),
                    React.createElement("div", { className: "dot" }, "\u2022")))),
            React.createElement("div", { ref: messagesEndRef })),
        React.createElement("div", { className: "chat-input" },
            React.createElement("div", { className: "input-wrapper" },
                React.createElement("input", { className: "input-field", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), placeholder: "Type your message..." }),
                React.createElement("button", { className: "send-button", onClick: handleSend }, "Send")))));
};
export default TherapyChat;
