import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const DashboardLayout = () => {
  return (
    // This layout has a simple, light background for readability
    <div className="min-h-screen w-full bg-gray-100">
      <Navbar />
      {/* pt-24 provides padding to push content below the fixed navbar */}
      <main className="pt-24">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;