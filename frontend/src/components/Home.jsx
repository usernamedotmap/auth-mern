import React from 'react'
import {motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Loader } from 'lucide-react';

const Home = () => {

  const {user, logout, isLoading} = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault()
    await logout();
  }
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.9}}
    animate={{ opacity: 1, scale: 1}}
    exit={{ opacity: 0, scale: 0.9}}
    transition={{ duration: 0.5}}
    className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl
    shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl text-center mb-6 font-bold bg-gradient-to-r from-green-900 to-emerald-600 text-transparent bg-clip-text'>
        Dashboard
      </h2>

      <div className='space-y-8'>
          <motion.div
          className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: 1, y:0}}
          transition={{ delay: 0.2}}
          >
            <h3 className='text-xl font-semibold text-green-400 mb-3'>Profile Information</h3>
            <p className='text-gray-300'>Name: {user.name}</p>
            <p className='text-gray-300'>Name: {user.email}</p>
          </motion.div>
      </div>


      <motion.button
      whileHover={{ scale: 1.05}}
      whileTap={{ scale: 0.95}}
      onClick={handleLogout}
      className='w-full py-4 px-4 bg-gradient-to-r from-green-500 to-emerald-900 text-white font-bold
      rounded-lg mt-4 focus:ring-offset-gray-900 focus:ring-green-500 focus:ring-offset-2 focus:outline-none focus:ring-2' 
      >
       {isLoading ?  <Loader className="size-24 mx-auto animate-spin"/> : "Logout"}
      </motion.button>
    </motion.div>
  )
}

export default Home