import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming Navbar.js is in the same folder

const MainLayout = () => {
  return (
    // This is the global background container we previously had in App.js
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
      {/* The Aurora background */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
        <div className="absolute top-[-50%] left-[-20%] w-[60rem] h-[60rem] bg-blue-500 rounded-full filter blur-3xl animate-aurora"></div>
        <div className="absolute top-[-20%] right-[-20%] w-[50rem] h-[50rem] bg-purple-600 rounded-full filter blur-3xl animate-aurora" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-[-50%] left-[20%] w-[40rem] h-[40rem] bg-pink-500 rounded-full filter blur-3xl animate-aurora" style={{ animationDelay: '10s' }}></div>
      </div>
      
      {/* This container ensures all content sits on top of the background */}
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* The <Outlet/> will render the specific page component (like Home.js) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;