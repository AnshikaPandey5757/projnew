import { motion } from "framer-motion";

const PageWrapper = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#00E5CC]/10 blur-[180px] rounded-full" />

        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#FFB347]/10 blur-[180px] rounded-full" />
      </div>

      {/* Grid Overlay */}
      <div
        className="
          fixed
          inset-0
          opacity-[0.03]
          pointer-events-none
          bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]
          bg-[size:50px_50px]
        "
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageWrapper;