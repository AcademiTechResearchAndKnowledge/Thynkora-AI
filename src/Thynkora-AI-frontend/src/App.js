import React, { useState } from "react";
import "./index.scss";
import landingImg from "./pages/landing-bg.jpg";
import p1Img from "./pages/p1.jpg";
import aboutUsImg from "./pages/about-us.jpg";
import articlesImg from "./pages/articles.jpg";
import ptsImg from "./pages/pts.jpg";
import customerSupportImg from "./pages/customer-support.jpg";
// Main app modules (shown after image navigation)
//import TherapyChat from "./components/TherapyChat";
//import Journal from "./components/Journal";
//import DAODashboard from "./components/DAODashboard";
//import EmergencySupport from "./components/EmergencySupport";
function App() {
    const [showLanding, setShowLanding] = useState(true);
    const [showp1, setShowp1] = useState(false);
    const [showAboutUsPage, setShowAboutUsPage] = useState(false);
    const [showArticlesPage, setShowArticlesPage] = useState(false);
    const [showPTSPage, setShowPTSPage] = useState(false);
    const [showCustomerSupportPage, setShowCustomerSupportPage] = useState(false);
    const [enteredApp, setEnteredApp] = useState(false);
    const handleNavigate = (fromSetter, toSetter) => {
        fromSetter(false);
        toSetter(true);
    };
    const handleFinalNavigate = () => {
        setShowCustomerSupportPage(false);
        setEnteredApp(true);
    };
    // Final App Tabs
    const [activeTab, setActiveTab] = useState("chat");
    if (showLanding) {
        return (React.createElement("div", null,
            React.createElement("img", { src: landingImg, alt: "Landing", style: { width: "100%", height: "100vh", display: "block" } }),
            React.createElement("button", { style: { position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }, onClick: () => handleNavigate(setShowLanding, setShowp1) })));
    }
    if (showp1) {
        return (React.createElement("div", null,
            React.createElement("img", { src: p1Img, alt: "P1", style: { width: "100%", height: "100vh", display: "block" } }),
            React.createElement("button", { style: { position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }, onClick: () => handleNavigate(setShowp1, setShowAboutUsPage) })));
    }
    if (showAboutUsPage) {
        return (React.createElement("div", null,
            React.createElement("img", { src: aboutUsImg, alt: "About Us", style: { width: "100%", height: "100vh", display: "block" } }),
            React.createElement("button", { style: { position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }, onClick: () => handleNavigate(setShowAboutUsPage, setShowArticlesPage) })));
    }
    if (showArticlesPage) {
        return (React.createElement("div", null,
            React.createElement("img", { src: articlesImg, alt: "Articles", style: { width: "100%", height: "100vh", display: "block" } }),
            React.createElement("button", { style: { position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }, onClick: () => handleNavigate(setShowArticlesPage, setShowPTSPage) })));
    }
    if (showPTSPage) {
        return (React.createElement("div", null,
            React.createElement("img", { src: ptsImg, alt: "PTS", style: { width: "100%", height: "100vh", display: "block" } }),
            React.createElement("button", { style: { position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }, onClick: () => handleNavigate(setShowPTSPage, setShowCustomerSupportPage) })));
    }
    if (showCustomerSupportPage) {
        return (React.createElement("div", null,
            React.createElement("img", { src: customerSupportImg, alt: "Customer Support", style: { width: "100%", height: "100vh", display: "block" } }),
            React.createElement("button", { style: { position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }, onClick: handleFinalNavigate })));
    }
    /*
    // Main App UI
    return (
      <div className="app">
        <nav className="app-nav">
          <button onClick={() => setActiveTab("chat")}>Therapy</button>
          <button onClick={() => setActiveTab("journal")}>Journal</button>
          <button onClick={() => setActiveTab("dao")}>DAO</button>
          <button onClick={() => setActiveTab("emergency")}>Emergency</button>
        </nav>
  
        <div className="app-content">
          {activeTab === "chat" && <TherapyChat />}
          {activeTab === "journal" && <Journal />}
          {activeTab === "dao" && <DAODashboard />}
          {activeTab === "emergency" && <EmergencySupport />}
        </div>
      </div>
    );
    */
}
export default App;
