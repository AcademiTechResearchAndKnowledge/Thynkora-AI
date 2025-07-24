# 🧠 Thynkora-AI

**Thynkora-AI** is a decentralized, AI-powered mental wellness platform built on the **Internet Computer Protocol (ICP)**. It enables users to securely journal their emotions, receive supportive feedback from an empathetic AI, and contribute to the platform’s future through decentralized governance.

Designed with a strong emphasis on **privacy**, **cultural relevance**, and **scalability**, Thynkora-AI offers a mindful alternative to centralized mental health tools that often compromise user data and user agency.

## 📌 Summary

Thynkora-AI empowers users to document their thoughts, feelings, and life journeys through secure, private journaling—while using AI to provide intelligent feedback, reflections, and personal insights. Built with Internet Identity and deployed on ICP canisters, your data remains fully encrypted and owned by you.

---

## 🚀 Features

- 🤖 **Therapy Chat** – Chat with a culturally aware, supportive AI  
- 📝 **Emotional Journaling** – Write and track your moods in a private journal  
- 🔐 **Decentralized Privacy** – All data is stored securely on ICP canisters  
- 🌍 **Cultural Sensitivity** – AI understands emotional nuances from diverse cultures  
- 🗳️ **Governance Ready** – Community-led roadmap through decentralized voting

---
## 📜 Table of Contents

- [🎥 Recording](#-recording)
- [🧠 Architecture Diagram](#-architecture-diagram)
- [📲 Tech Stack](#-tech-stack)
- [📦 Installation & Setup](#-installation--setup)
- [🧪 Demo & Code Walkthrough](#-demo--code-walkthrough)
- [🖌️ UI/UX Design](#-uiux-design)
- [📈 Business Model](#-business-model)
- [💬 Team Roles](#-team-roles)
- [📄 License](#-license)
- [📞 Contact](#-contact)

---
## 🎥 Recording

To demonstrate the full potential of WellMind AI, we’ve prepared two key video recordings:

- **The Pitch Deck Presentation** provides a strategic overview of the problem we’re solving, our unique decentralized solution, business model, market fit, and our vision for scalability and impact.

- **The Product Demo + Code Walkthrough** showcases the actual working prototype — including how users interact with the platform, how the AI and blockchain components work together, and a look into our development process and architecture.

🎞️ Pitch Deck Presentation
📍 Watch here

💻 Product Demo + Code Walkthrough
📍 Watch here

---
## 🧠 Architecture Diagram

Thynkora AI is designed as a decentralized journaling platform that merges AI-driven reflection with secure identity and governance. Built on the Internet Computer Protocol (ICP), it prioritizes user privacy, data ownership, and community-led development.

---

### 🔧 System Components

| Component             | Description                                                                 |
|-----------------------|-----------------------------------------------------------------------------|
| **Frontend (React)**  | A responsive journaling interface hosted as an ICP asset canister.         |
| **Canisters (Backend)** | Smart contracts handle journal logic, DAO governance, and AI request routing. |
| **Internet Identity** | Enables secure, anonymous, and user-owned authentication.                  |
| **AI Assistant (LLM)**| Processes journaling prompts and returns reflective guidance.              |
| **DAO Governance**    | Users propose, vote, and influence platform evolution.                     |
| **Decentralized Storage** | All journal entries and actions are stored securely in ICP canisters.       |

---

### 🔄 System Workflow

1. **User Authentication**  
   - User logs in using Internet Identity (WebAuthn-based, privacy-first).
2. **Journal Interaction**  
   - User writes or speaks a journal entry on the frontend.
3. **AI Prompting**  
   - The journal is sent to an AI canister, which responds with insights or questions.
4. **Entry Storage**  
   - The final journal entry and AI output are stored in a personal on-chain canister.
5. **DAO Participation**  
   - User can submit/vote on DAO proposals for platform improvements or features.
  
   ### 🧩 Architecture Overview

```plaintext
+------------------------+
|   User (Frontend UI)  |
+-----------+------------+
            |
            v
+------------------------+      +----------------------+
|   Journal Canister     | <--> |  AI Prompt Canister  |
+-----------+------------+      +----------------------+
            |
            v
+------------------------+      +----------------------+
|  DAO Governance Canister| <--> |  Voting Interface    |
+------------------------+      +----------------------+
            |
            v
+------------------------+
| Internet Identity Auth |
+------------------------+
```
### 📌 Architecture Image

![Architecture Diagram](src/assets/architecture.png)
---
## 🛠️ Local Development Setup

### ✅ Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [dfx SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
- [Git](https://git-scm.com/)
- [Vite](https://vitejs.dev/) (installed via npm)

---

### 📦 Installation & Setup
1. **Clone the Repository**
First, clone the project from GitHub and navigate into the directory:
```bash
git clone https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI.git
cd Thynkora-AI
```
2. **Stop Any Running DFX Processes**
Make sure no conflicting DFX instances are running:

```bash
dfx stop
dfx killall
```
3. **Start the Internet Computer Replica**
Launch a clean local ICP replica in the background:

```bash
dfx start --background --clean
```
4. **Deploy the Canisters**
Deploy the backend canisters and frontend assets:

```bash
dfx deploy
```
5. **Access the App**
Once deployment is successful, open your browser and go to the local URL printed in the terminal (usually something like):
```bash
http://localhost:4943/?canisterId=<frontend_canister_id>
```

### 📁 Project Structure
```
Thynkora-AI/
├── node_modules/                        # Dependency packages installed via npm/yarn

├── src/                                 # Main source code directory
│
│   ├── Thynkora-AI-backend/             #   BACKEND CANISTERS (Motoko)
│   │   ├── ai_therapy/                  # Handles therapy chatbot logic and message processing
│   │   ├── dao_governance/              # DAO logic: proposals, voting, decision-making
│   │   ├── emergency_response/          # Handles emergency support requests and responses
│   │   ├── journal_storage/             # Manages secure journal entries and retrieval
│   │   ├── user_management/             # User accounts, identity handling, authentication
│   │   └── mail_moa/                    # Email notifications and alerts 
│
│   ├── Thynkora-AI-frontend/            #   FRONTEND (React + Vite)
│   │   ├── components/                  # Reusable UI components for different modules
│   │   │   ├── AITherapy/               # Chat UI for interacting with the therapy AI
│   │   │   ├── Auth/                    # Login, signup, and auth-related components
│   │   │   ├── DAO/                     # DAO dashboard UI: proposals, voting, etc.
│   │   │   ├── Emergency/               # Emergency UI components (e.g., SOS or quick contact)
│   │   │   └── Journal/                 # UI for writing and viewing journal entries
│   │
│   │   ├── hooks/                       # Custom React hooks (e.g., useJournal, useAuth)
│   │
│   │   ├── pages/                       # Landing and navigation images for page transitions
│   │   │   ├── AboutUsPage.jpg
│   │   │   ├── ArticlesPage.jpg
│   │   │   ├── CustomerSupportPage.jpg
│   │   │   ├── PTSPage.jpg
│   │   │   ├── landing-bg.jpg
│   │   │   ├── p1.jpg
│   │   │   └── temp/                   # (Optional) Temporary files or drafts
│   │
│   │   ├── public/                      # (Optional)Static public assets (favicons, logo, etc.)
│   │   │   ├── .ic-assets.json5         # (Optional)Internet Computer asset metadata
│   │   │   ├── favicon.ico              # (Optional)Website favicon
│   │   │   └── logo.svg                 # (Optional)App logo
│   │
│   │   ├── src/                         # App logic and entry point
│   │   │   ├── declarations/           # Types and interface declarations
│   │   │   ├── App.tsx                 # Main React component entry
│   │   │   ├── App.scss                # Main global styles
│   │   │   ├── index.scss              # App root styles
│   │   │   ├── main.tsx                # React + Vite root mount script
│   │   │   ├── vite-env.d.ts           # TypeScript env support for Vite
│   │   │   └── utils/                  # Utility functions and helpers
│   │
│   │   └── assets/                     # (Optional) Custom folder for images, fonts, icons
│
├── index.html                          # HTML template used by Vite
├── .env                                # Environment variables (e.g., canister IDs, secrets)
├── .gitignore                          # Git ignore list
├── README.md                           # Project overview and setup instructions
├── dfx.json                            # DFINITY config file (defines canisters, network)
├── package.json                        # Project metadata and dependencies
├── package-lock.json                   # Exact versions of installed npm packages
├── tsconfig.json                       # TypeScript configuration
├── vite.config.ts                      # Vite build/configuration file
```

### Demo video link:  
https://drive.google.com/file/d/1GYeR2iFpXIqB1djNGFNBhgXygCw6mzT_/view?usp=sharing
