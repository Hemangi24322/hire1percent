import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/jobs/employer', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch jobs');
      setLoading(false);
    }
  };

  const handleStatusChange = async (jobId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/jobs/${jobId}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      // Refresh the jobs list
      fetchJobs();
    } catch (err) {
      setError('Failed to update job status');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Posted Jobs</h2>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No jobs posted yet. Click "Post New Job" to create your first job posting.
        </div>
      ) : (
        <div className="grid gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <p className="text-gray-600 mt-1">{job.location}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      job.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {job.status}
                  </span>
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                    className="rounded-md border-gray-300 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="filled">Filled</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Job Type</span>
                  <p className="text-gray-900">{job.jobType}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Salary Range</span>
                  <p className="text-gray-900">{job.salaryRange}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Required Timings</span>
                  <p className="text-gray-900">{job.requiredTimings}</p>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-sm text-gray-500">Description</span>
                <p className="text-gray-900 mt-1 line-clamp-2">{job.description}</p>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <Link
                  to={`/employer/jobs/${job._id}/applications`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  View Applications
                </Link>
                <Link
                  to={`/employer/jobs/${job._id}/edit`}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList; 