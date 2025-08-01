import React, { useState } from 'react'
import {motion} from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import Input from './Input';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {isLoading, forgotPassword} = useAuthStore();

    const handleSubmit = async (e) => {
      e.preventDefault()
      await forgotPassword(email)
      setIsSubmitted(true)
    }

  return (
    <>
    <motion.div
    animate={{ opacity: 1, y: 0}}
    initial={{ opacity:0, y: 20}}
    transition={{ duration: 0.5}}
    className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
    overflow-hidden'
    >
        <div className='p-8'>
            <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-500 to-emerald-700 text-transparent bg-clip-text'>Forgot Password</h2>
       
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <p className='text-gray-300 mb-6 text-center'>
                  Enter your Email address and we'll send you a link to reset ur password
                </p>
                <Input 
                  icon={Mail}  
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.button
                  whileHover={{scale: 1.02}}
                  whileTap={{ scale: 0.98}}
                  className='w-full py-3 px-4 bg-gradient-to-t from-green-500 to-emerald-500 text-white font-bold
                  rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-700 focus:outline-none focus:ring-2
                  focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                  type='submit'
                >
                  {isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send reset link"}
                </motion.button>
              </form>
            ): (
              <div className='text-center'>
                <motion.div
                initial={{ scale: 0}}
                animate={{ scale: 1}}
                transition={{ type: "spring", stiffness: 500, damping: 30}}
                className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                >
                  <Mail className='size-8 text-whte '/>
                 
                </motion.div>
                <p className='text-gray-300 mb-6'>
                    If an account exists for {email}, you will receive a password reset link shortly.
                  </p>
              </div>
            )}
        </div>

        <div className='py-4 px-8 bg-gray-800 bg-opacity-50 flex justify-center'>
          <Link to={"/login"} className='text-sm text-green-400 hover:underline flex items-center'>
            <ArrowLeft className='size-4 mr-2' />Back to Login
          </Link>
        </div>

    </motion.div>
  </>
  )
}

export default ForgotPassword