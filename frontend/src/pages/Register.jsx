import React, { useState } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

import Toast from '../components/Toast';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    
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
            await API.post('/auth/register/', { username, email, password });
            alert("Registration successful!");
            navigate('/login');
        } catch (error) {
            triggerToast(error.response.data.username, "error");
            console.log("Registration failed:", error.response.data);
        }
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      {toast.visible && <Toast message={toast.message} type={toast.type} />}
  {/* Registration Card */}
  <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
    <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

    {/* Registration Form */}
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

      {/* Email */}
      <div className="form-control">
        <label htmlFor="email" className="label">
          <span className="label-text font-medium">Email</span>
        </label>
        <input
          type="email"
          placeholder="abc123@example.com"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
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
      <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
    </form>

    {/* Optional Login Link */}
    <p className="text-center text-gray-500 text-sm mt-4">
      Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
    </p>
  </div>
</div>

  )
}

export default Register