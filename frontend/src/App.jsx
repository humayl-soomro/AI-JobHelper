import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from './store/auth'

import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/Register'
import Jobs from './pages/jobs'
import ResumeUpload from './components/ResumeUpload'
import Analyzer from './pages/Analyzer'
import LandingPage from './pages/LandingPage'
import ResumeResults from './components/ResumeResults'

const App = () => {

  function PrivateRoute({ children }) {
    const { access } = useAuthStore()
    return access ? children : <Navigate to = "/login" />
  }
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<PrivateRoute> <LandingPage /> </PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path="/resume/upload" element={<PrivateRoute><ResumeUpload /></PrivateRoute>} />
        <Route path="/resume/analyze" element={<PrivateRoute><Analyzer /></PrivateRoute>} />
        <Route path="/results" element={<ResumeResults />} />
      </Routes>


    </div>
  )
}

export default App