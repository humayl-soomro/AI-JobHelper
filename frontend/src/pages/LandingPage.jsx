import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import ResumeUpload from '../components/ResumeUpload';

const LandingPage = () => {
    const [currentUser, setCurrentUser] = useState(null);

    // Get current user
    const fetchCurrentUser = async () => {
        try {
          const response = await API.get('/auth/current-user/');
            setCurrentUser(response.data);
            console.log("Fetched current user:", currentUser);
        } catch (error) {
          console.log(error);
        }
    };
    
    useEffect(() => {
        fetchCurrentUser();
    }, []);
    
  return (
     <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      {/* Greeting */}
  <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
    Hi {currentUser?.username || "there"}! <br />
    What would you like to do today?
  </h1>

  {/* Options Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
    
    {/* Job Tracker Card */}
    <a
      href="/jobs"
      className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center group"
    >
      <div className="text-6xl mb-4 text-blue-500">
        📌
      </div>
      <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
        Job Tracker
      </h2>
      <p className="text-gray-500">
        Keep track of your job applications, interviews, offers, and notes.
      </p>
    </a>

    {/* Resume Analyzer Card */}
    <a
      href="/resume/analyze"
      className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center group"
    >
      <div className="text-6xl mb-4 text-purple-500">
        🧾
      </div>
      <h2 className="text-xl font-semibold mb-2 group-hover:text-purple-600">
        Resume Analyzer
      </h2>
      <p className="text-gray-500">
        Analyze resumes, match skills with job descriptions, and get insights.
      </p>
    </a>

  </div>
</div>

  )
}

export default LandingPage