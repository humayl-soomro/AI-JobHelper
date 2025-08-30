import React, { useState } from 'react'
import API from '../api/axios';

const EditJobsModal = ({ job, fetchJobs  }) => {
    const [form, setForm] = useState({ company: job.company, title: job.title, job_url: job.job_url, description: job.description, status: job.status, notes: job.notes, date_applied: job.date_applied, tags: job.tags });
    const [isOpen, setIsOpen] = useState(false);
    
    const updateJob = async (id) => {
  try {
    await API.put(`/jobs/${id}/`, {
      ...form,
      tags: Array.isArray(form.tags)
        ? form.tags.map(t => t.trim())
        : form.tags.split(",").map(t => t.trim())
    });

    
    fetchJobs();
      console.log("Job updated successfully");
      setIsOpen(false);
  } catch (error) {
    console.log(error);
  }
};
  return (
      <div>
          {/* Button to open modal */}
        <button className="btn" onClick={() => setIsOpen(true)}>
            Edit Job
        </button>

        {/* Modal */}
        {isOpen && (
            <div className="modal modal-open">
            <div className="modal-box relative">
                {/* Close button */}
                <button
                onClick={() => setIsOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                ✕
                </button>

                {/* Modal content */}
                <h3 className="font-bold text-lg mb-4">Edit Job</h3>
                
                <form onSubmit={e => { e.preventDefault(); updateJob(job.id) }} className="flex flex-col space-y-2 mb-6 mx-auto">
              
              <label htmlFor="company">Company</label>
              <input className="input" placeholder="Company"
                  value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />

              <label htmlFor="title">Title</label>
              <input className="input" placeholder="Title"
                  value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />

              <label htmlFor="job_url">Job URL</label>
              <input className="input" placeholder="Job URL"
                  value={form.job_url} onChange={e => setForm({ ...form, job_url: e.target.value })} />

              <label htmlFor="description">Description</label>
              <input type='textarea' className="input" placeholder="Description"
                  value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

              <label htmlFor="status">Status</label>
              <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
              </select>

              <label htmlFor="notes">Notes</label>
              <input type='textarea' className="input" placeholder="Notes"
                  value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />

              <label htmlFor="date_applied">Date Applied</label>
              <input type='date' className="input" placeholder="Date Applied"
                  value={form.date_applied} onChange={e => setForm({ ...form, date_applied: e.target.value })} />

              <label htmlFor="tags">Tags</label>
              <input className="input" placeholder="Tags"
                  value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />

              <button type="submit" className="btn btn-primary">Confirm Edit</button>
          </form>
            </div>
            </div>
        )}

        
    </div>
  )
}

export default EditJobsModal