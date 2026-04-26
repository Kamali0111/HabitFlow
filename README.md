# HabitFlow — AI-Powered Daily Habit Tracker

HabitFlow is a production-ready, full-stack SaaS application built to help users build consistency and track their life transformations through smart, AI-driven insights.

## 🚀 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Recharts, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (JSON Web Tokens) with HttpOnly concepts
- **Architecture**: Strict MVC (Models, Views, Controllers)

## ✨ Features
- **Modern SaaS UI**: Glassmorphism design with smooth animations and dark mode toggle.
- **Habit Tracking**: CRUD operations for habits with streak calculation and "Streak Freeze" capability.
- **AI Insights**: Locally computed smart suggestions based on the last 30 days of habit data.
- **Advanced Analytics**: Weekly Bar Charts, Monthly Momentum Area Charts, and a 90-day Activity Heatmap.
- **Authentication**: Secure JWT-based registration and login system.
- **Seed Data**: Pre-populated with test data for immediate exploration.

## 🛠️ Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/habitflow`)

### 1. Backend Setup
```bash
cd backend
npm install
node seed.js  # This will seed the database with demo user Alex Johnson
npm run dev
```
**Credentials for Seed User:**
- **Email**: `alex@demo.com`
- **Password**: `demo1234`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/habitflow
JWT_SECRET=supersecretkey12345
NODE_ENV=development
```

## 🧠 AI Engine Logic
The AI Insights engine analyzes:
- **Consistency Score**: Overall completion rate.
- **Best Day Detection**: Identifies which day of the week you are most productive.
- **At-Risk Habits**: Highlights habits with <40% completion in the last 30 days.
- **Momentum Trends**: Compares current week performance with the previous week.
- **Overload Detection**: Warns if you have too many habits with low completion.

## 📸 API Documentation
- `POST /api/auth/register`: Create a new account
- `POST /api/auth/login`: Authenticate and get token
- `GET /api/habits`: Fetch all habits
- `POST /api/habits/:id/complete`: Toggle completion for today
- `GET /api/analytics/summary`: Get high-level stats
- `GET /api/ai/suggestions`: Get AI-calculated insights

---
Built with ❤️ by HabitFlow Team.
