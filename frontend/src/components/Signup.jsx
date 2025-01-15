import React, { useState } from "react";
import { motion } from "framer-motion";

import Input from "./Input";
import { Loader, Lock, Mail, UserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "./PasswordEme";
import { useAuthStore } from "../store/authStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { signup, error, isLoading, } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData)
      navigate("/verification-email")
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-screen-lg bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-fuchsia-600 to-emerald-500 text-transparent bg-clip-text">
          Create Account
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            icon={UserRound}
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Input
            icon={Mail}
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <PasswordStrengthMeter password={formData.password} />

          <motion.button
            className="mt-5 w-full py-3 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-bold
          rounded-lg shadow-lg hover:from-indigo-600 hover:to-rose-500 focus:outline-none focus:ring-
          focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
           {isLoading ?  <Loader className="size-24 mx-auto animate-spin"/> : "Signup"}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-400 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-800">
          Already have an account?{" "}
          <Link to={"/login"} className="text-teal-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Signup;
