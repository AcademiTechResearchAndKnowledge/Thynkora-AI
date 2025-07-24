import React, { useState } from 'react';
const SimpleChatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
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
        setMessages([...messages, userMessage, botMessage]);
        setInput('');
    };
    return (React.createElement("div", { className: "min-h-screen bg-gray-100 p-4 flex flex-col" },
        React.createElement("div", { className: "flex-1 overflow-auto bg-white rounded-lg p-4 shadow-inner mb-4" }, messages.map((msg, index) => (React.createElement("div", { key: index, className: `mb-2 text-${msg.sender === 'user' ? 'right' : 'left'}` },
            React.createElement("span", { className: `inline-block px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'}` }, msg.text))))),
        React.createElement("div", { className: "flex gap-2" },
            React.createElement("input", { className: "flex-1 px-4 py-2 border rounded-md", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSend(), placeholder: "Type your message..." }),
            React.createElement("button", { className: "px-4 py-2 bg-blue-500 text-white rounded-md", onClick: handleSend }, "Send"))));
};
export default SimpleChatbot;
