import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const Verification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { isLoading, error, verification } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pasteCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pasteCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");

   
    try {
      const result = await verification(verificationCode);
      if (result?.user) {
      navigate("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl
    oveflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-fuchsia-600 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-sm font-bold text-center mb-6 text-gray-500">
          Enter a 6 digit magic 😋
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="size-12 text-center text-2xl font-bold bg-gray-700  text-white border-2 border-gray-700 rounded-lg
                                focus:outline-none focus:border-green-700"
              />
            ))}
          </div>
          {error && <p className="mt-2 text-red-500 font-semibold">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
            className="mt-3 w-full py-3 bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-bold
                    rounded-lg shadow-lg hover:from-indigo-600 hover:to-rose-500 focus:outline-none focus:ring-
                    focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Verification;
