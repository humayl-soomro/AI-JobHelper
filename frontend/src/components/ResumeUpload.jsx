import React, { useState } from 'react'
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

const ResumeUpload = ({setIsOpen, isOpen}) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [parsedText, setParsedText] = useState('');
  const [fileName, setFileName] = useState('');

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', fileName);
    try {
      const response = await API.post('/resume/', formData);
      setMessage(response.data.message);
      setParsedText(response.data.parsed_text || 'No selectable text found in PDF. It may be image-only.');
      navigate('/resume/analyze');
    } catch (error) {
      console.error(error);
      setMessage('Error uploading file');
    }
  };

  return (
  <div>
  {/* Resume Upload Card */}
  <div 
    onClick={() => setIsOpen(true)} 
    className="card w-72 h-56 bg-base-100 shadow-lg border-2 border-cyan-600 rounded-3xl cursor-pointer hover:bg-cyan-500 transition-all duration-300 flex items-center justify-center"
  >
    <div className="text-center">
      <h2 className="card-title text-lg font-bold text-cyan-600 group-hover:text-white transition-colors">Resume Upload +</h2>
    </div>
  </div>

  {/* Modal */}
  {isOpen && (
    <div className="modal modal-open">
      <div className="modal-box relative max-w-md">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>

        {/* Modal Title */}
        <h3 className="font-bold text-xl mb-6 text-center">Upload Your Resume</h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* File Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Select Resume (PDF)</span>
            </label>
            <input 
              type="file" 
              accept=".pdf,.docx" 
              onChange={handleFileChange} 
              className="file-input file-input-primary w-full"
              required
            />
          </div>

          {/* Resume Name Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Resume Name</span>
            </label>
            <input 
              type="text" 
              placeholder="Enter file name to identify your resume" 
              onChange={(e) => setFileName(e.target.value)} 
              className="input input-bordered w-full" 
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-2">Upload</button>
        </form>

        {/* Feedback Message */}
        {message && <p className="mt-4 text-center text-sm text-gray-600">{message}</p>}

        {/* Parsed Resume Text */}
        {parsedText && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner overflow-auto max-h-60">
            <h4 className="font-semibold mb-2">Parsed Resume Text:</h4>
            <pre className="text-sm whitespace-pre-wrap">{parsedText}</pre>
          </div>
        )}
      </div>
    </div>
  )}
</div>

  )
}

export default ResumeUpload