"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Default values for AuthContext
const defaultAuthContext = {
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
};

// Create Context with default values
const AuthContext = createContext(defaultAuthContext);

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    
    if (token) {
      axios
        .get('https://api.muktihospital.com/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data); // Set user data if token is valid
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  // Login method
  const login = (token) => {
    localStorage.setItem('authToken', token);
    axios
      .get('https://api.muktihospital.com/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setUser(null);
      });
  };

  // Logout method
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
