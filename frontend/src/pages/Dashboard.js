import React from 'react';
import { useAuth } from '../context/AuthContext';
import CandidateDashboard from './dashboard/CandidateDashboard';
import EmployerDashboard from './dashboard/EmployerDashboard';
import AdminDashboard from './dashboard/AdminDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'candidate':
        return <CandidateDashboard />;
      case 'employer':
        return <EmployerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderDashboard()}
    </div>
  );
};

export default Dashboard; 