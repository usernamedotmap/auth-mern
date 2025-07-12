import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "https://auth-server-mern.onrender.com/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, data);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success("Verification Code sent to your Email");
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      toast.error(error.response.data.message);
      console.log("Error in signup function", error);
    }
  },

  verification: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      toast.success("");
      return response.data;
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      toast.error(error.response.data.message || "Error Verifying Email");
      console.log("Error in verification function", error);
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
      toast.success("Login Successfully");
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      console.log("Error in login function", error);
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      toast.success("Logout Successfully");
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      console.log("Error in logout function", error);
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
      
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
      console.log("Error in forgotPassword function", error);
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null, message: null });
    try {
    const response = await axios.post(`${API_URL}/reset-password/${token}`, {password} );
      set({message: response.data.message, isLoading: false});
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false});
      console.log("Error in resetPassword", error);
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false });
      console.log("Error in checkAuth function", error);
    }
  },

  
}));
