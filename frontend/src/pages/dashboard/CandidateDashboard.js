import React from 'react';
import { useAuth } from '../../context/AuthContext';
import JobAlerts from '../../components/jobs/JobAlerts';

const CandidateDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Candidate Dashboard</h1>
        
        {/* Profile Completion Status */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Profile Status</h2>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-700">Profile Completion</span>
              <span className="text-blue-700 font-semibold">
                {user?.profileCompleted ? '100%' : 'Incomplete'}
              </span>
            </div>
            {!user?.profileCompleted && (
              <button className="mt-2 text-blue-600 hover:text-blue-800">
                Complete your profile →
              </button>
            )}
          </div>
        </div>

        {/* Job Alerts Section */}
        <div className="mb-8">
          <JobAlerts />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Applied Jobs</h3>
            <p className="text-gray-600">Track your job applications</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              View Applications →
            </button>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Saved Jobs</h3>
            <p className="text-gray-600">View your saved job listings</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              View Saved Jobs →
            </button>
          </div>
          
          <div className="bg-white border rounded-lg p-6 shadow-sm">
            <h3 className="font-semibold mb-2">Job Alerts</h3>
            <p className="text-gray-600">Manage your job alerts</p>
            <button className="mt-4 text-blue-600 hover:text-blue-800">
              Set Alerts →
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600">No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard; 