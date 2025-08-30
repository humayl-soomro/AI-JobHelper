import React, { useState, useEffect } from 'react'
import API from '../api/axios';
import { Link } from 'react-router-dom';
import ResumeUpload from '../components/ResumeUpload';
import ResumeResults from '../components/ResumeResults';
import Toast from '../components/Toast';
const Analyzer = () => {
    const [resume, setResume] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedResume, setSelectedResume] = useState(null);
    const [results, setResults] = useState('');
    
    const [isOpen, setIsOpen] = useState(false);
    
    const [toast, setToast] = useState({ message: "", type: "", visible: false });
    
    const triggerToast = (message, type = "info") => {
      setToast({ message, type, visible: true });
      setTimeout(() => {
        setToast({ message: "", type: "", visible: false });
      }, 3000);
    };

    useEffect(() => {
    const fetchResume = async () => {
        try {
        const response = await API.get('/resume/');
        setResume(response.data);
        console.log("Fetched resume:", response.data);  // Log here after fetch
        } catch (error) {
        console.error(error);
        }
    };
    fetchResume();
    }, [isOpen]);
  
    const handleResumeSelect = (resume) => {
      setSelectedResume(resume);
      
    };
    
    const deleteResume = async (resume_id) => {
        try {
          await API.delete(`/resume/${resume_id}/`);
          setResume((prevResumes) => prevResumes.filter((resume) => resume.id !== resume_id));
        } catch (error) {
          console.error(error);
        }
      };

    const handleAnalyze = async (e) => {
      e.preventDefault();
      if (!selectedResume) {
        triggerToast("Please select a resume to analyze.", "error");
        return;
      }
      try {
          console.log("Sending the following data to the backend:", { job_description: description, resume_id: resume.id });
        const response = await API.post('/analyze-resume/', { job_description: description, resume_id: selectedResume.id });
        setResults(response.data);  // Convert to JSON and format response.data);
        console.log("Analyzed resume:", response.data);  // Log here after analysis
        } catch (error) {
        console.error("Could not analyze resume:", error.response.data.detail || error);
        }
    };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
          {toast.visible && <Toast message={toast.message} type={toast.type} />}

      <h1 className="text-3xl font-bold text-center mb-8">🧾 Analyzer</h1>

<div className="flex flex-col lg:flex-row gap-10 items-start justify-center">
  {/* Form Section */}
  <form 
    onSubmit={handleAnalyze} 
    className="w-full max-w-md bg-base-100 shadow-lg rounded-xl p-6 flex flex-col gap-4"
  >
    {/* Job Description Input */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">Job Description</span>
      </label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter job description here"
        required
        className="input input-bordered w-full"
      />
    </div>

    {/* Resume Textarea */}
    <div className="form-control">
      <label className="label">
        <span className="label-text font-medium">Selected Resume</span>
      </label>
      <textarea disabled
        value={selectedResume?.parsed_text || ""}
        onChange={(e) => setResume(e.target.value)}
        placeholder="Click on one of the resumes"
        required
        className="textarea textarea-bordered w-full h-40"
      />
    </div>

    {/* Submit Button */}
    <button type="submit" className="btn btn-primary w-full">Analyze</button>
  </form>

  {/* Resume Results Section */}
  <div className="w-full max-w-xl">
          {results ? (<div>
            <ResumeResults results={results} />
          </div>
    ) : (
      <div className="card bg-base-200 shadow-md rounded-xl p-6 flex items-center justify-center h-40 text-gray-500 italic">
        Results will appear here
      </div>
    )}
  </div>
</div>

          
{/* --------------------- Show the uploaded resumes ----------------- */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-12">
  {/* Upload Resume Card */}
  <ResumeUpload setIsOpen={setIsOpen} isOpen={isOpen} />

  {/* Resume Cards */}
  {resume.map((resume) => (
    <div
      key={resume.id}
      onClick={() => handleResumeSelect(resume)}
      className="card relative cursor-pointer rounded-xl border-2 border-transparent overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

      <div className="card-body flex flex-col items-center justify-between relative z-10 p-4">
        <h2 className="card-title text-center text-lg font-semibold">
          {`Resume ${resume?.name}`}
        </h2>

        {/* Delete Button */}
        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-sm btn-error text-white opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.stopPropagation();
              deleteResume(resume.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ))}
</div>


          

    </div>
  )
}

export default Analyzer