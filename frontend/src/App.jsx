  import { Navigate, Route, Routes } from "react-router-dom"
  import {Toaster} from 'react-hot-toast'
  import FloatingShape from "./components/FloatingShape"
  import Signup from './components/Signup';
  import Login from './components/Login';
  import Verification from "./components/Verification";
  import { useAuthStore } from "./store/authStore";
  import { useEffect } from "react";
  import Home from "./components/Home";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";



  function App() {

    const {isCheckingAuth, checkAuth, user, message} = useAuthStore();
  
    useEffect(() => {
      checkAuth()
    }, [checkAuth])

    if (isCheckingAuth) return <LoadingSpinner />
    return (
      <>
    <Toaster />
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-green-900 to-emerald-900
    flex items-center justify-center relative overflow-hidden">
        
      
      <FloatingShape color='bg-green-500' size={`w-64 h-64`} top="-5%" left='10%' delay={0} />
      <FloatingShape color='bg-red-500' size={`w-64 h-64`} top="50%" left='10%' delay={2} />
      <FloatingShape color='bg-slime-500' size={`w-64 h-64`} top="80%" left='-10%' delay={1} />
      <FloatingShape color='bg-purple-600' size={`w-32 h-32`} top="-50" left='20%' delay={1} />
      <FloatingShape color='bg-fuchsia-800' size={`w-80 h-80`} top="-20%" left='30%' delay={5} />
      <FloatingShape color='bg-indigo-800' size={`w-80 h-80`} top="-20%" left='5%' right="-60%" delay={3} />
      <FloatingShape color='bg-teal-500' size={`w-52 h-52`} top="90%" right="5%" delay={2} />



      <Routes>
        <Route path="/" element={user?.isVerified ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/signup" element={!user?.isVerified ? <Signup /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!user?.isVerified ? <Login /> : <Navigate to={"/"}/>} />
        <Route path="/verification-email" element={  <Verification /> } />
        <Route path="/forgot-password" element={  <ForgotPassword /> } />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    
    </div>  
    
    </>
    )
  }

  export default App
