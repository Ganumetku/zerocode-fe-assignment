// src/services/auth.ts
import axios from 'axios';

const API_URL = 'https://your-api-url.com/api'; // Replace with your actual API URL

// Mock implementation - in a real app, this would call your backend
export const registerUser = async (name: string, email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response
  return {
    user: { id: '1', name, email },
    token: 'mock-jwt-token'
  };
};

export const loginUser = async (email: string, password: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response
  return {
    user: { id: '1', name: 'Test User', email },
    token: 'mock-jwt-token'
  };
};

export const getUser = async (token: string) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Mock response
  return { id: '1', name: 'Test User', email: 'test@example.com' };
};