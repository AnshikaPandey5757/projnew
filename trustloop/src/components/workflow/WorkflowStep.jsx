import { motion } from "framer-motion";

const WorkflowStep = ({
  stepNumber,
  title,
  description,
  icon: Icon,
  active = false,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className={`
        relative
        rounded-[28px]
        p-6
        transition-all
        ${active ? "glass-strong shadow-[0_0_40px_rgba(0,229,204,0.12)]" : "glass"}
      `}
    >
      {/* Decorative Number */}
      <span
        className="
          absolute
          top-4
          right-5
          text-5xl
          font-black
          text-white/5
        "
      >
        {stepNumber}
      </span>

      <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#00E5CC]/10 border border-[#00E5CC]/20 mb-5">
        <Icon
          size={26}
          className="text-[#00E5CC]"
        />
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default WorkflowStep;