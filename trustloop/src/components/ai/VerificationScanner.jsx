import { motion } from "framer-motion";

const VerificationScanner = () => {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          absolute
          left-0
          w-full
          h-28
          bg-gradient-to-b
          from-transparent
          via-[#00E5CC]/25
          to-transparent
          blur-md
        "
      />

      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#00E5CC]/15 border border-[#00E5CC]/30">
        <span className="text-xs font-medium text-[#00E5CC]">
          AI SCANNING
        </span>
      </div>
    </div>
  );
};

export default VerificationScanner;