import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as userManagementIdl } from './declarations/user_management';
import { idlFactory as aiTherapyIdl } from './declarations/ai_therapy';
import AuthComponent from 'src/Thynkora-AI-frontend/components/Auth/AuthComponent';
import TherapyChat from 'src/Thynkora-AI-frontend/components/AITherapy/TherapyChat';
import Journal from 'src/Thynkora-AI-frontend/components/Journal/JournalComponent';
import DAODashboard from 'src/Thynkora-AI-frontend/components/DAO/DAODashboard';
import EmergencySupport from 'src/Thynkora-AI-frontend/components/Emergency/EmergencySupport';
import './App.css';
const App = () => {
    const [authClient, setAuthClient] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userActor, setUserActor] = useState(null);
    const [aiActor, setAiActor] = useState(null);
    const [activeTab, setActiveTab] = useState('therapy');
    const [userProfile, setUserProfile] = useState(null);
    useEffect(() => {
        initAuth();
    }, []);
    const initAuth = async () => {
        const client = await AuthClient.create();
        setAuthClient(client);
        const isAuthenticated = await client.isAuthenticated();
        setIsAuthenticated(isAuthenticated);
        if (isAuthenticated) {
            await setupActors(client);
        }
    };
    const setupActors = async (client) => {
        const identity = client.getIdentity();
        const agent = new HttpAgent({ identity });
        // In production, use mainnet
        if (process.env.NODE_ENV === 'production') {
            await agent.fetchRootKey();
        }
        const userActor = Actor.createActor(userManagementIdl, {
            agent,
            canisterId: process.env.REACT_APP_USER_MANAGEMENT_CANISTER_ID,
        });
        const aiActor = Actor.createActor(aiTherapyIdl, {
            agent,
            canisterId: process.env.REACT_APP_AI_THERAPY_CANISTER_ID,
        });
        setUserActor(userActor);
        setAiActor(aiActor);
        // Load user profile
        try {
            const profile = await userActor.getProfile();
            setUserProfile(profile);
        }
        catch (error) {
            console.log('No profile found, user needs to create one');
        }
    };
    const handleLogin = async () => {
        if (!authClient)
            return;
        await authClient.login({
            identityProvider: 'https://identity.ic0.app',
            onSuccess: async () => {
                setIsAuthenticated(true);
                await setupActors(authClient);
            },
        });
    };
    const handleLogout = async () => {
        if (!authClient)
            return;
        await authClient.logout();
        setIsAuthenticated(false);
        setUserActor(null);
        setAiActor(null);
        setUserProfile(null);
    };
    if (!isAuthenticated) {
        return React.createElement(AuthComponent, { onLogin: handleLogin });
    }
    return (React.createElement("div", { className: "app" },
        React.createElement("header", { className: "app-header" },
            React.createElement("h1", null, "Thynkora-AI"),
            React.createElement("nav", null,
                React.createElement("button", { className: activeTab === 'therapy' ? 'active' : '', onClick: () => setActiveTab('therapy') }, "AI Therapy"),
                React.createElement("button", { className: activeTab === 'journal' ? 'active' : '', onClick: () => setActiveTab('journal') }, "Journal"),
                React.createElement("button", { className: activeTab === 'dao' ? 'active' : '', onClick: () => setActiveTab('dao') }, "DAO"),
                React.createElement("button", { className: activeTab === 'emergency' ? 'active' : '', onClick: () => setActiveTab('emergency') }, "Emergency")),
            React.createElement("button", { onClick: handleLogout }, "Logout")),
        React.createElement("main", { className: "app-main" },
            activeTab === 'therapy' && (React.createElement(TherapyChat, { aiActor: aiActor, userProfile: userProfile })),
            activeTab === 'journal' && (React.createElement(Journal, { userActor: userActor, userProfile: userProfile })),
            activeTab === 'dao' && (React.createElement(DAODashboard, null)),
            activeTab === 'emergency' && (React.createElement(EmergencySupport, { userProfile: userProfile })))));
};
export default App;
