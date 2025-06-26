// src/pages/profile/Profile.js

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import CandidateProfile from './CandidateProfile';
import EmployerProfile from './EmployerProfile';
import AdminProfile from './AdminProfile';

const Profile = () => {
  const { user } = useAuth();

  // First, handle the loading state before attempting to render a profile.
  // If the user object hasn't been loaded yet, show a loading message.
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 text-center">
        <p>Loading user information...</p>
      </div>
    );
  }

  // Once we are sure the user object exists, we can safely render the correct profile.
  const renderProfile = () => {
    switch (user.role) {
      case 'candidate':
        return <CandidateProfile />;
      case 'employer':
        return <EmployerProfile />;
      case 'admin':
        return <AdminProfile />;
      default:
        // This case will now only be reached if the user exists but has an unknown role.
        return <div>Invalid user role.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {renderProfile()}
      </div>
    </div>
  );
};

export default Profile;