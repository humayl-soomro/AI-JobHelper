import React, { useState, useEffect, useMemo } from 'react'

import API from '../api/axios';
import EditJobsModal from '../components/EditJobsModal';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [form, setForm] = useState({ company: "", title: "", job_url: "", description: "", status: "applied", notes: "", date_applied: "", tags: "" });
  
    const [searchQuery, setSearchQuery] = useState("");




    const fetchJobs = async () => {
        try {
            const {data} = await API.get('/jobs/');
            setJobs(data);
        } catch (error) {
            console.log(error);
        }
    }

    const createJob = async (e) => {
        e.preventDefault();
        try {
          await API.post("/jobs/", { ...form, tags: form.tags.split(",").map(t => t.trim()) });
          setForm({ company: "", title: "", job_url: "", description: "", status: "applied", notes: "", date_applied: "", tags: "" });
          fetchJobs();
          
        } catch (error) {
          alert(JSON.stringify(error.response.data.company));
          
        }
    };
    
    // Filtered jobs based on search query
    const filteredJobs = useMemo(() => {
      if (!searchQuery) return jobs;
      const query = searchQuery.toLowerCase();

      return jobs.filter((job) =>
        job.company.toLowerCase().includes(query) ||
        job.title.toLowerCase().includes(query) ||
        job.status.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }, [jobs, searchQuery]);

    const deleteJob = async (id) => {
        try {
            await API.delete(`/jobs/${id}/`);
            fetchJobs();
        } catch (error) {
            console.log(error);
        }
  }

  useEffect(() => { fetchJobs(); }, []);
  return (
   <div className="flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">📌 Job Tracker</h2> 

<form onSubmit={createJob} className="max-w-4xl mx-auto bg-base-100 shadow-lg rounded-xl p-6">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Company */}
    <div className="form-control">
      <label className="label">
        <span className="label-text">Company</span>
      </label>
      <input 
        type="text"
        placeholder="Company"
        className="input input-bordered w-full"
        value={form.company}
        required
        onChange={e => setForm({ ...form, company: e.target.value })}
      />
    </div>

    {/* Title */}
    <div className="form-control">
      <label className="label">
        <span className="label-text">Title</span>
      </label>
      <input 
        type="text"
        placeholder="Title"
        className="input input-bordered w-full"
        required
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
    </div>

    {/* Job URL */}
    <div className="form-control">
      <label className="label">
        <span className="label-text">Job URL</span>
      </label>
      <input 
        type="url"
        placeholder="In this format: https://example.com"
        className="input input-bordered w-full"
        required
        value={form.job_url}
        onChange={e => setForm({ ...form, job_url: e.target.value })}
      />
    </div>

    {/* Date Applied */}
    <div className="form-control">
      <label className="label">
        <span className="label-text">Date Applied</span>
      </label>
      <input 
        type="date"
        className="input input-bordered w-full"
        required
        value={form.date_applied}
        onChange={e => setForm({ ...form, date_applied: e.target.value })}
      />
    </div>

    {/* Status */}
    <div className="form-control">
      <label className="label">
        <span className="label-text">Status</span>
      </label>
      <select 
        className="select select-bordered w-full"
        value={form.status}
        onChange={e => setForm({ ...form, status: e.target.value })}
      >
        <option value="applied">Applied</option>
        <option value="interview">Interview</option>
        <option value="offer">Offer</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    {/* Tags */}
    <div className="form-control">
      <label className="label">
        <span className="label-text">Tags</span>
      </label>
      <input 
        type="text"
        placeholder="e.g. remote, frontend"
        className="input input-bordered w-full"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
      />
    </div>

    {/* Description (full width) */}
    <div className="form-control md:col-span-2">
      <label className="label">
        <span className="label-text">Description</span>
      </label>
      <textarea 
        className="textarea textarea-bordered w-full"
        placeholder="Description"
        value={form.description}
        onChange={e => setForm({ ...form, description: e.target.value })}
      ></textarea>
    </div>

    {/* Notes (full width) */}
    <div className="form-control md:col-span-2">
      <label className="label">
        <span className="label-text">Notes</span>
      </label>
      <textarea 
        className="textarea textarea-bordered w-full"
        placeholder="Notes"
        value={form.notes}
        onChange={e => setForm({ ...form, notes: e.target.value })}
      ></textarea>
    </div>
  </div>

  {/* Submit Button */}
  <div className="form-control mt-8">
    <button type="submit" className="btn btn-primary w-full">Create Job</button>
  </div>
</form>

      

 <div>
    {/* --------------------------- Search Bar ---------------------------- */}
    <div className="flex justify-end mb-4 mt-12">
      <input
        type="text"
        placeholder="Search by company, title, status, or tags..."
        className="input input-bordered w-full md:w-1/3"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    {/* --------------------------- Job Table ---------------------------- */}
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="table w-full">
        {/* Head */}
        <thead className="bg-base-200">
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Tags</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-base-100">
                <td className="font-medium">{job.company}</td>
                <td>{job.title}</td>
                <td className="max-w-xs truncate">{job.description}</td>
                <td>
                  <span
                    className={`badge text-white ${
                      job.status === "applied"
                        ? "badge-info"
                        : job.status === "interview"
                        ? "badge-warning"
                        : job.status === "offer"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td>
                  {job.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                      {job.tags.map((tag, i) => (
                        <span key={i} className="badge badge-outline">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-400 italic">No tags</span>
                  )}
                </td>
                <td className="flex gap-2 justify-center">
                  <button
                    className="btn btn-sm btn-error text-amber-50"
                    onClick={() => deleteJob(job.id)}
                  >
                    Delete
                  </button>
                  <EditJobsModal job={job} fetchJobs={fetchJobs} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center py-4 text-gray-500 italic">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>


    </div>
  )
}

export default Jobs