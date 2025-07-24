import React, { useState, useRef, useEffect } from 'react';
const TherapyChat = ({ aiActor, userProfile }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);
    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
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
        const userMessage = { sender: 'user', text: input };
        const botMessage = { sender: 'bot', text: getBotResponse(input) };
        setMessages((prev) => [...prev, userMessage, botMessage]);
        setInput('');
    };
    return (React.createElement("div", { className: "flex flex-col h-screen bg-white" },
        React.createElement("div", { className: "flex items-center justify-between px-6 py-4 shadow-sm border-b bg-gray-50" },
            React.createElement("h1", { className: "text-xl font-semibold text-gray-800" }, "Thynkora Therapy Bot"),
            React.createElement("span", { className: "text-sm text-gray-500" },
                "User: ",
                userProfile?.name || 'Guest')),
        React.createElement("div", { className: "flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-100" },
            messages.map((msg, index) => (React.createElement("div", { key: index, className: `flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}` },
                React.createElement("div", { className: `max-w-xs md:max-w-md lg:max-w-2xl px-4 py-2 rounded-lg shadow ${msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'}` }, msg.text)))),
            React.createElement("div", { ref: messagesEndRef })),
        React.createElement("div", { className: "p-4 border-t bg-white" },
            React.createElement("div", { className: "flex gap-2" },
                React.createElement("input", { type: "text", className: "flex-1 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), placeholder: "Type your message..." }),
                React.createElement("button", { className: "px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow", onClick: handleSend }, "Send")))));
};
export default TherapyChat;
