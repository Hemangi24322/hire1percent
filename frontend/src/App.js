import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/profile/Profile';
import Jobs from './pages/Jobs';
import Candidates from './pages/Candidates';
import PostJob from './components/jobs/PostJob';
import JobList from './components/jobs/JobList';
import DashboardLayout from './components/layout/DashboardLayout';
import MainLayout from './components/layout/MainLayout';
// function App() {
//   return (
//     <AuthProvider>
//       <Router future={{ v7_startTransition: true }}></Router>
//       <Router>
//         <div className="min-h-screen bg-gray-50">
//           <Navbar />
//           <main className="container mx-auto px-4 py-8">
//             <Routes>
               
//                <Route path="/" element={<Home />}  />
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} /> 
//               { <Route
//                 path="/dashboard"
//                 element={
//                   <PrivateRoute>
//                     <Dashboard />
//                   </PrivateRoute>
//                 }
//               /> }
//               {<Route
//                 path="/profile"
//                 element={
//                   <PrivateRoute>
//                     <Profile />
//                   </PrivateRoute>
//                 }
//               /> }
//                <Route
//                 path="/employer/profile"
//                 element={
//                   <PrivateRoute>
//                     <Profile />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/jobs"
//                 element={
//                   <PrivateRoute>
//                     <Jobs />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/candidates"
//                 element={
//                   <PrivateRoute>
//                     <Candidates />
//                   </PrivateRoute>
//                 }
//               />
//               <Route path="/employer/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
//               <Route path="/employer/jobs" element={<PrivateRoute><JobList /></PrivateRoute>} />
//               <Route path="*" element={<Navigate to="/" replace />} /> 
//             </Routes>
//           </main>
//         </div>
        
//       </Router>
     
    
      
//     </AuthProvider>
//   );
// }

// export default App; 


function App() {
  return (
    <AuthProvider>
      <Router>
       
        {/* This main div now holds the global background styling */}
        <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
          {/* The Aurora background is now here, in the global layout */}
          <div className="absolute top-0 left-0 right-0 bottom-0 z-0 overflow-hidden">
            <div className="absolute top-[-50%] left-[-20%] w-[60rem] h-[60rem] bg-blue-500 rounded-full filter blur-3xl animate-aurora"></div>
            <div className="absolute top-[-20%] right-[-20%] w-[50rem] h-[50rem] bg-purple-600 rounded-full filter blur-3xl animate-aurora" style={{ animationDelay: '5s' }}></div>
            <div className="absolute bottom-[-50%] left-[20%] w-[40rem] h-[40rem] bg-pink-500 rounded-full filter blur-3xl animate-aurora" style={{ animationDelay: '10s' }}></div>
          </div>
          
          {/* This container ensures all content sits on top of the background */}
          <div className="relative z-10">
            <Navbar />
            <main>
             
              <Routes  >
                 <Route element={<MainLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<DashboardLayout />}>
                { <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              /> }
              {<Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              /> }
               <Route
                path="/employer/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/jobs"
                element={
                  <PrivateRoute>
                    <Jobs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/candidates"
                element={
                  <PrivateRoute>
                    <Candidates />
                  </PrivateRoute>
                }
              />
              <Route path="/employer/post-job" element={<PrivateRoute><PostJob /></PrivateRoute>} />
              <Route path="/employer/jobs" element={<PrivateRoute><JobList /></PrivateRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} /> 
            </Route>
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;