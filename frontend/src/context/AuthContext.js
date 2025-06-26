import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://hire1percent.onrender.com/api';

  const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server returned non-JSON response');
    }
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }
    return data;
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });

      const data = await handleResponse(response);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err.message === 'Failed to fetch' 
        ? 'Unable to connect to the server. Please check if the server is running.'
        : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData),
        credentials: 'include'
      });

      const data = await handleResponse(response);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      setError(null);
      return data;
    } catch (err) {
      const errorMessage = err.message === 'Failed to fetch' 
        ? 'Unable to connect to the server. Please check if the server is running.'
        : err.message;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
}; 