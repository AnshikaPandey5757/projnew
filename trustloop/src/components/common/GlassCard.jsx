import { motion } from "framer-motion";
import clsx from "clsx";

const GlassCard = ({
  children,
  className,
  hover = true,
}) => {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.01,
            }
          : {}
      }
      transition={{ duration: 0.25 }}
      className={clsx(`relative overflow-hidden rounded-3xl shadow-xl glass`, className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E5CC]/5 to-[#FFB347]/5" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;