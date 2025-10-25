>### 📢 **Note:** This project is currently in the deployment phase. A functional live demo will be available soon. Thank you.
---
# 🚀 AI Job Tracker + Resume Analyzer

An AI-powered web app to **track job applications** and **analyze resumes vs. job descriptions**.  
This project helps job seekers **stay organized**, **optimize their resumes**, and **land more interviews**.  

---
## ▶️ Video Demo
[Click here for the demo video on Vimeo](https://vimeo.com/1130507046?fl=ip&fe=ec)

---

## 🔧 Features (MVP)

### 👤 User Authentication
- Secure sign-up & login using **JWT Auth** (Django REST Framework)
- Password hashing for security
- Role: Basic user (no admin needed at first)

---

### 📋 Job Application Tracker
- Add, edit, and delete job entries
- Fields: Company, Title, URL, Status (applied, interview, offer, etc.), Notes, Date
- Tagging system (e.g., *remote*, *urgent*, *frontend*)
- Simple filtering for organization
- Search functionality for fetching the desired job

---

### 📂 Resume Upload + Parsing
- Upload **PDF** or **Word** documents
- Extract resume content using **PDFPlumber** / **python-docx**
- View extracted text for verification

---

### 📑 Job Description and Resume Analyzer
- Paste job descriptions
- Select a resume from any of your uploaded resumes with a click
- NLP-powered **resume-to-job comparison**
- Get a **match score (%), matched skills**
- Highlight missing skills and get optimization suggestions

---

### 📊 Dashboard & Visualizations
- Interactive charts with **Chart.js**
- Track job applications, progress, and goals

---

## 🚀 Features Summary

✅ **AI-Powered Resume Analysis** – Get `match_score`, `matched skills`, `missing skills`, and actionable `suggestions`.  
✅ **Job Tracking Dashboard** – Keep track of job applications, statuses, and details.  
✅ **Resume Upload & Parsing** – Upload PDF resumes and extract structured text.  
✅ **Authentication with JWT** – Secure login, signup, and token-based access.  
✅ **Modern UI** – Built with React + Tailwind CSS for a clean, responsive experience.  
✅ **Production-Ready Backend** – Django REST API with authentication, role management, and Hugging Face AI integration.  

---

## 🛠️ Tech Stack

| Layer           | Tech                                      | Purpose                              |
|-----------------|------------------------------------------|--------------------------------------|
| **Frontend**    | React + Vite, Tailwind CSS, Daisy UI, React Router | UI, routing, styling                |
|                 | Axios, Zustand                        | API communication                   |
|                 | Chart.js                      | Data visualization                  |
|                 | React, Daisy UI                           | File upload UI                      |
| **Backend**     | Django, Django REST Framework            | API backend                         |
|                 | JWT (SimpleJWT)                          | Authentication                      |
|                 | PyMuPDF, python-docx             | Resume parsing                      |
|                 | GROQ, Llama LLM API      | AI-powered analysis                |
| **Database**    | PostgreSQL                               | Persistent data storage             |
| **Deployment(Coming Soon)**  | Vercel, Render                   | Frontend/Backend hosting            |

---

## 🌐 Live Demo
🔗 *Coming Soon* (Deploy on Vercel + Render for full-stack demo)

---
## 🤖 AI Matching Logic

The AI-powered analyzer extracts keywords from resumes & job descriptions, clusters similar skills, and calculates a match score.
We use a GROQ model (e.g., Llama-v4) for AI skill matching.

```json
{
  "match_score": 78.5,
  "matched": ["Python", "Machine Learning", "React"],
  "missing": ["Kubernetes", "AWS"],
  "suggestions": [
    "Highlight AWS experience if available",
    "Include projects using Kubernetes"
  ]
}
```
---

## 📁 Project Structure
```bash 
job-tracker/
 ├── backend/
 │ ├── manage.py
 │ ├── config/
 │ ├── jobs/
 │ ├── users/
 │ ├── resume/
 │ ├── Dockerfile
 │ └── requirements.txt
 ├── frontend/
 │ ├── src/
 │ │ ├── components/
 │ │ ├── pages/
 │ │ ├── api/
 │ │ ├── store
 │ │ └── App.jsx
 │ └── vite.config.js
```
---

## 🚀 Getting Started

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/humayl-soomro/AI-JobHelper.git
cd AI-JobHelper

2️⃣ Backend Setup (Django)
cd backend
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env          # Fill in environment variables
python manage.py migrate
python manage.py runserver

3️⃣ Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:5173 and backend on http://127.0.0.1:8000.

## 🔑 Environment Variables
- Create a .env file in the backend directory:
- SECRET_KEY=your_django_secret
- DEBUG=True
- DATABASE_URL=postgres://user:password@localhost:5432/jobtracker
- GROQ_TOKEN=your_huggingface_token

## 📸 Screenshots
To Add

## 📜 License
MIT License © Humayl Soomro

## 💡 Next Steps
- Add Docker setup for easy deployment
- Deploy on live servers
- Improve the UI and add more features
