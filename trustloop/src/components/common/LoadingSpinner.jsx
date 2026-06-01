import { motion } from "framer-motion";

const LoadingSpinner = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: "linear",
        }}
        className="
          w-12
          h-12
          border-4
          border-[#00E5CC]/20
          border-t-[#00E5CC]
          rounded-full
        "
      />

      <p className="text-gray-400">
        {text}
      </p>
    </div>
  );
};

export default LoadingSpinner;