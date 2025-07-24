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

## 🛠️ Local Development Setup

### ✅ Prerequisites

Install the following tools:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [dfx SDK](https://internetcomputer.org/docs/current/developer-docs/setup/install/)
- [Git](https://git-scm.com/)
- [Vite](https://vitejs.dev/) (installed via npm)

---

### 📁 Clone the Repository

```bash
git clone https://github.com/AcademiTechResearchAndKnowledge/Thynkora-AI.git

cd Thynkora-AI

dfx stop

dfx killall

dfx start --background --clean

dfx deploy
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
