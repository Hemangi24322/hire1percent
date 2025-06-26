// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="bg-white shadow">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between h-16">
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold">
//               Hire1Percent
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             {user ? (
//               <>
//                 <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
//                   Dashboard
//                 </Link>
//                 <Link to="/profile" className="text-gray-600 hover:text-gray-900">
//                   Profile
//                 </Link>
//                 <button
//                   onClick={logout}
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link to="/login" className="text-gray-600 hover:text-gray-900">
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Register
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    // We removed 'bg-white' and 'shadow' to make it transparent
    // and added 'text-white' for readability on a dark background.
    <nav className="fixed top-0 left-0 w-full z-50 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white">
              Hire1Percent
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 font-bold transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;