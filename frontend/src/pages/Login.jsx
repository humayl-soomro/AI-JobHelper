import React, { useState } from 'react'
import API from '../api/axios';

import { useAuthStore } from '../store/auth';
import { useNavigate } from 'react-router-dom';

import Toast from '../components/Toast';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const setTokens = useAuthStore((state) => state.setTokens);
    
    // Toast state
  const [toast, setToast] = useState({ message: "", type: "", visible: false });

  const triggerToast = (message, type = "info") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast({ message: "", type: "", visible: false });
    }, 3000);
  };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/auth/login/', { username, password });
            setTokens(data.access, data.refresh);
            triggerToast("Logged in successfully!");
            navigate('/');
        } catch (error) {
          console.log(error);
          triggerToast(error.response.data.detail, "error");
        }
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">

    {toast.visible && <Toast message={toast.message} type={toast.type} />}
  {/* Login Card */}
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
    <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

    {/* Login Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Username */}
      <div className="form-control">
        <label htmlFor="username" className="label">
          <span className="label-text font-medium">Username</span>
        </label>
        <input
          type="text"
          placeholder="abc123"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Password */}
      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text font-medium">Password</span>
        </label>
        <input
          type="password"
          placeholder="Type here"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full mt-4">Login</button>
    </form>

    {/* Optional Links */}
    <p className="text-center text-gray-500 text-sm mt-4">
      Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
    </p>
  </div>
</div>

  )
}

export default Login