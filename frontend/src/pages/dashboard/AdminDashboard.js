import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeJobs, setActiveJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        // Fetch all jobs for admin
        const jobsResponse = await axios.get('http://localhost:3000/api/jobs/all', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAllJobs(jobsResponse.data);
        setActiveJobs(jobsResponse.data.filter(job => job.status === 'active').length);

        // Placeholder for fetching total users and applications (not yet implemented backend)
        // In a real app, you would have separate endpoints for these
        // For now, we'll just simulate with some counts from existing data or mock data
        setTotalUsers(0); // This would come from a /api/users/count endpoint
        setTotalApplications(0); // This would come from a /api/applications/count endpoint

      } catch (err) {
        console.error('Error fetching admin dashboard data:', err);
        setError('Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-4">Loading admin dashboard...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        {/* System Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">System Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-700">Total Users</h3>
              <p className="text-2xl font-bold text-blue-900">{totalUsers}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-700">Active Jobs</h3>
              <p className="text-2xl font-bold text-green-900">{activeJobs}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-700">Total Applications</h3>
              <p className="text-2xl font-bold text-purple-900">{totalApplications}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-gray-600">Manage system users</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              Manage Users →
            </button>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Job Listings</h3>
            <p className="text-gray-600">Review and manage job listings</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              Manage Jobs →
            </button>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">System Settings</h3>
            <p className="text-gray-600">Configure system settings</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              Settings →
            </button>
          </div>
        </div>

        {/* All Job Listings for Admin */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">All Job Listings</h2>
          {allJobs.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">No job postings found.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {allJobs.map((job) => (
                <div key={job._id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.employer?.name || job.employer?.email || 'N/A'} - {job.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        job.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : job.status === 'closed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">
                    <p>Type: {job.jobType}</p>
                    <p>Salary: {job.salaryRange}</p>
                    <p>Posted: {new Date(job.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-3 flex justify-end">
                    <button
                      onClick={() => window.location.href = `/jobs/${job._id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">System Activity</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 