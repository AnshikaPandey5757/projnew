import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const DigitalSignature = ({
  signer = "Verified User",
  timestamp = "May 2026",
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        rotate: -10,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        rotate: -6,
        scale: 1,
      }}
      viewport={{ once: true }}
      className="
      inline-flex
      items-center
      gap-3
      px-5
      py-3
      rounded-2xl
      bg-emerald-500/10
      border
      border-emerald-400/30
      backdrop-blur-lg
      shadow-[0_0_30px_rgba(0,229,204,0.15)]
    "
    >
      <ShieldCheck className="w-5 h-5 text-emerald-400" />

      <div>
        <p className="font-semibold text-emerald-300">
          Digitally Signed ✍️
        </p>

        <p className="text-xs text-gray-400">
          {signer} • {timestamp}
        </p>
      </div>
    </motion.div>
  );
};

export default DigitalSignature;