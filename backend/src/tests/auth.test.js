const axios = require('axios');

const API_URL = 'http://localhost:5000/api/auth';
let authToken = '';
let testUser = {
  email: `test${Date.now()}@example.com`,
  password: 'Test123!@#',
  role: 'candidate'
};

// Helper function to log test results
const logTest = (testName, success, message) => {
  console.log(`\n=== ${testName} ===`);
  console.log(`Status: ${success ? '✅ PASSED' : '❌ FAILED'}`);
  console.log(`Message: ${message}`);
  console.log('===================\n');
};

// Test Registration
const testRegistration = async () => {
  try {
    const response = await axios.post(`${API_URL}/register`, testUser);
    authToken = response.data.token;
    logTest('Registration', true, 'User registered successfully');
    return true;
  } catch (error) {
    logTest('Registration', false, error.response?.data?.message || error.message);
    return false;
  }
};

// Test Login
const testLogin = async () => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: testUser.email,
      password: testUser.password
    });
    logTest('Login', true, 'User logged in successfully');
    return true;
  } catch (error) {
    logTest('Login', false, error.response?.data?.message || error.message);
    return false;
  }
};

// Test Get Current User
const testGetCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { 'x-auth-token': authToken }
    });
    logTest('Get Current User', true, 'User data retrieved successfully');
    return true;
  } catch (error) {
    logTest('Get Current User', false, error.response?.data?.message || error.message);
    return false;
  }
};

// Test Update Profile
const testUpdateProfile = async () => {
  try {
    const profileData = {
      name: 'Test User',
      bio: 'This is a test bio',
      skills: ['JavaScript', 'Node.js', 'React'],
      experience: [{
        title: 'Software Developer',
        company: 'Test Company',
        location: 'Test Location',
        from: new Date(),
        current: true,
        description: 'Test description'
      }]
    };

    const response = await axios.put(`${API_URL}/profile`, profileData, {
      headers: { 'x-auth-token': authToken }
    });
    logTest('Update Profile', true, 'Profile updated successfully');
    return true;
  } catch (error) {
    logTest('Update Profile', false, error.response?.data?.message || error.message);
    return false;
  }
};

// Test Change Password
const testChangePassword = async () => {
  try {
    const passwordData = {
      currentPassword: testUser.password,
      newPassword: 'NewTest123!@#'
    };

    const response = await axios.put(`${API_URL}/change-password`, passwordData, {
      headers: { 'x-auth-token': authToken }
    });
    logTest('Change Password', true, 'Password changed successfully');
    return true;
  } catch (error) {
    logTest('Change Password', false, error.response?.data?.message || error.message);
    return false;
  }
};

// Test Logout
const testLogout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`, {}, {
      headers: { 'x-auth-token': authToken }
    });
    logTest('Logout', true, 'User logged out successfully');
    return true;
  } catch (error) {
    logTest('Logout', false, error.response?.data?.message || error.message);
    return false;
  }
};

// Run all tests
const runAllTests = async () => {
  console.log('\n=== Starting API Tests ===\n');
  
  const tests = [
    { name: 'Registration', fn: testRegistration },
    { name: 'Login', fn: testLogin },
    { name: 'Get Current User', fn: testGetCurrentUser },
    { name: 'Update Profile', fn: testUpdateProfile },
    { name: 'Change Password', fn: testChangePassword },
    { name: 'Logout', fn: testLogout }
  ];

  for (const test of tests) {
    console.log(`\nRunning ${test.name} test...`);
    await test.fn();
  }

  console.log('\n=== API Tests Completed ===\n');
};

// Run the tests
runAllTests();