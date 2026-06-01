import { motion } from "framer-motion";

const SectionHeading = ({
  number,
  badge,
  title,
  description,
  center = false,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      className={center ? "text-center" : ""}
    >
      {number && (
        <h1
          className="
          text-[90px]
          md:text-[140px]
          font-black
          text-white/[0.03]
          leading-none
          select-none
        "
        >
          {number}
        </h1>
      )}

      {badge && (
        <span className="text-[#00E5CC] font-semibold">
          {badge}
        </span>
      )}

      <h2
        className="
        mt-3
        text-5xl
        md:text-6xl
        font-bold
        font-syne
        text-white
      "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
          mt-5
          max-w-2xl
          text-gray-400
          text-lg
          leading-relaxed
          mx-auto
        "
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;