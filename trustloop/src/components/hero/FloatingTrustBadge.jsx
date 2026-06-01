import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const FloatingTrustBadge = () => {
  return (
    <motion.div
      animate={{
        y: [-12, 12, -12],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
      }}
      className="
      absolute
      -top-10
      -right-8
      rounded-3xl
      border
      border-[#00E5CC]/20
      bg-white/10
      backdrop-blur-xl
      px-6
      py-4
      shadow-[0_0_40px_rgba(0,229,204,0.15)]
    "
    >
      <div className="flex items-center gap-3">
        <ShieldCheck
          size={20}
          className="text-[#00E5CC]"
        />

        <div>
          <p className="text-xs text-gray-400">
            Trust Score
          </p>

          <h3 className="text-2xl font-bold text-white">
            91/100
          </h3>
        </div>
      </div>
    </motion.div>
  );
};

export default FloatingTrustBadge;