import { motion } from "framer-motion";

const Switch = ({ toggle, onClick }) => {
  return (
    <button
      onClick={onClick}
      // 18px doesn't exist in tailwind it goes from 16px to 20px.
      // 30px also doesn't exist in tailwind it goes from 28px to 32px.
      style={{ height: "18px", width: "30px" }}
      className={`border rounded-full transition-colors duration-200 flex items-center ${
        toggle ? "bg-main" : "bg-white"
      }`}
    >
      <motion.div
        animate={{
          x: toggle ? "12px" : "0px",
          transition: {
            type: "tween",
            duration: 0.14,
          },
        }}
        className="w-4 h-4 transition-all rounded-full shadow bg-white"
      ></motion.div>
    </button>
  );
};

export default Switch;
