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

  const handleNavigate = (fromSetter: React.Dispatch<boolean>, toSetter: React.Dispatch<boolean>) => {
    fromSetter(false);
    toSetter(true);
  };

  const handleFinalNavigate = () => {
    setShowCustomerSupportPage(false);
    setEnteredApp(true);
  };

  // Final App Tabs
  const [activeTab, setActiveTab] = useState<"chat" | "journal" | "dao" | "emergency">("chat");

  if (showLanding) {
    return (
      <div>
        <img src={landingImg} alt="Landing" style={{ width: "100%", height: "100vh", display: "block" }} />
        <button style={{ position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }} onClick={() => handleNavigate(setShowLanding, setShowp1)} />
      </div>
    );
  }

  if (showp1) {
    return (
      <div>
        <img src={p1Img} alt="P1" style={{ width: "100%", height: "100vh", display: "block" }} />
        <button style={{ position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }} onClick={() => handleNavigate(setShowp1, setShowAboutUsPage)} />
      </div>
    );
  }

  if (showAboutUsPage) {
    return (
      <div>
        <img src={aboutUsImg} alt="About Us" style={{ width: "100%", height: "100vh", display: "block" }} />
        <button style={{ position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }} onClick={() => handleNavigate(setShowAboutUsPage, setShowArticlesPage)} />
      </div>
    );
  }

  if (showArticlesPage) {
    return (
      <div>
        <img src={articlesImg} alt="Articles" style={{ width: "100%", height: "100vh", display: "block" }} />
        <button style={{ position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }} onClick={() => handleNavigate(setShowArticlesPage, setShowPTSPage)} />
      </div>
    );
  }

  if (showPTSPage) {
    return (
      <div>
        <img src={ptsImg} alt="PTS" style={{ width: "100%", height: "100vh", display: "block" }} />
        <button style={{ position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }} onClick={() => handleNavigate(setShowPTSPage, setShowCustomerSupportPage)} />
      </div>
    );
  }

  if (showCustomerSupportPage) {
    return (
      <div>
        <img src={customerSupportImg} alt="Customer Support" style={{ width: "100%", height: "100vh", display: "block" }} />
        <button style={{ position: "absolute", top: "70%", left: "30%", width: "20%", height: "10%", opacity: 0 }} onClick={handleFinalNavigate} />
      </div>
    );
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
