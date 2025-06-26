import React from 'react';
import { Link } from 'react-router-dom';
import JobList from '../../components/jobs/JobList';

const EmployerDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Employer Dashboard</h2>
          <Link
            to="/employer/profile"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            View Profile
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Job Management</h3>
            <p className="text-gray-600 mt-2">Post and manage your job listings</p>
            <Link
              to="/employer/post-job"
              className="mt-4 text-blue-600 hover:text-blue-800 inline-block"
            >
              Post New Job →
            </Link>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
            <p className="text-gray-600 mt-2">View and manage job applications</p>
            <Link
              to="/employer/applications"
              className="mt-4 text-blue-600 hover:text-blue-800 inline-block"
            >
              View Applications →
            </Link>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Company Profile</h3>
            <p className="text-gray-600 mt-2">Update your company information</p>
            <Link
              to="/employer/profile"
              className="mt-4 text-blue-600 hover:text-blue-800 inline-block"
            >
              Edit Profile →
            </Link>
          </div>
        </div>
      </div>

      {/* Posted Jobs Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Posted Jobs</h2>
          <Link
            to="/employer/post-job"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Post New Job
          </Link>
        </div>
        <JobList />
      </div>
    </div>
  );
};

export default EmployerDashboard; 