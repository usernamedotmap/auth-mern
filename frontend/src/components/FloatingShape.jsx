import { motion } from "framer-motion";

const FloatingShape = ({ color, size, top, left, right, delay }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl `}
      style={{top, left, right}}
      animate={{
        y: ["0%", "100%", "0%"],
        x: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        delay,
      }}

      aria-hidden='true'
    ></motion.div>
  );
};

export default FloatingShape;
