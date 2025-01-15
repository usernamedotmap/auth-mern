import { useState } from "react";
import { motion } from "framer-motion";
import Input from "./Input";
import { Mail, Lock, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isLoading, login, error } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log("Error", error)
    }
    

  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="max-w-screen bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-fuchsia-600 to-emerald-500 text-transparent bg-clip-text">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            icon={Mail}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            icon={Lock}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center mb-4">
            <Link to="/forgot-password" className="text-sm text-green-400 hover:underline">
              Forgot Password
            </Link>
          </div>
          {error && <p className="text-red-500 text-semibold mb-2">{error}</p>}

          <motion.button
            className="mt-3 w-full py-3 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-bold
                  rounded-lg shadow-lg hover:from-indigo-600 hover:to-rose-500 focus:outline-none focus:ring-
                  focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="size-6 text-gray-400 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-8 py-4 bg-gray-400 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-800">
          {`Don't have an account? `}
          <Link to={"/signup"} className="text-teal-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;
