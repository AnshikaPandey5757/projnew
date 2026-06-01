import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const variants = {
  phone: {
    label: "Phone Verified",
    color: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  },
  email: {
    label: "Email Verified",
    color: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  identity: {
    label: "Government ID",
    color: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  },
  society: {
    label: "Society Verified",
    color: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  },
};

const VerificationBadge = ({
  type = "phone",
}) => {
  const badge =
    variants[type] || variants.phone;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-xl
        border
        ${badge.color}
      `}
    >
      <ShieldCheck size={16} />
      <span className="text-sm font-medium">
        {badge.label}
      </span>
    </motion.div>
  );
};

export default VerificationBadge;