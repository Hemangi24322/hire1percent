import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobAlerts = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://hire1percent.onrender.com/api/jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job alerts');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="text-center">Loading job alerts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Job Alerts</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No new job alerts</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{job.title}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    job.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <p className="text-gray-600">{job.location}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-sm text-gray-500">{job.jobType}</span>
                <span className="text-sm text-gray-500">
                  {job.salaryRange}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">{job.description}</p>
              <button
                onClick={() => window.location.href = `/jobs/${job._id}`}
                className="mt-3 text-blue-600 hover:text-blue-800"
              >
                View Details →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobAlerts; 