Budget Insight & Expense Tracker (MERN)
📌 Project Overview

A full-stack MERN application to track income, expenses, and generate AI-based financial insights.

🚀 Features
🔐 User Authentication (Login / Signup)
➕ Add / Edit / Delete Transactions (CRUD)
📊 Income vs Expense Chart
📅 Monthly / Yearly Filter
🎯 Budget Tracking
📤 Export CSV
🤖 AI Financial Insights
🏗️ Architecture Diagram
Frontend (React)
      ↓
Axios API Calls
      ↓
Backend (Node.js + Express)
      ↓
MongoDB Database
      ↓
AI API (OpenRouter)
⚙️ Setup Instructions
1️⃣ Clone Repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
2️⃣ Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
OPENROUTER_API_KEY=your_key

Run:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🌐 API Endpoints
Auth
POST /api/auth/signup
POST /api/auth/login
Transactions
GET /api/transactions
POST /api/transactions
PUT /api/transactions/
DELETE /api/transactions/
AI
POST /api/ai
🧪 Demo Credentials
Email: test@gmail.com
Password: 123456
📦 Tech Stack
Frontend: React + Bootstrap
Backend: Node.js + Express
Database: MongoDB
AI: OpenRouter API

Author
Kavya
