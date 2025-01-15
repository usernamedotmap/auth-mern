import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to bg-emerald-900 flex items-center
    justify-center relative overflow-hidden"
    >
      <motion.div
        className="size-16 border-4 border-t-4 border-t-green-500 border-green-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, Infinity, ease: "linear" }}
      ></motion.div>
    </div>
  );
};

export default LoadingSpinner;
