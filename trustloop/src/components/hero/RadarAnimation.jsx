import { motion } from "framer-motion";

const RadarAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          initial={{
            scale: 0.2,
            opacity: 0,
          }}
          animate={{
            scale: [0.2, 2.4],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: ring * 1.2,
            ease: "linear",
          }}
          className="
            absolute
            rounded-full
            border
            border-[#00E5CC]/20
          "
          style={{
            width: 200,
            height: 200,
          }}
        />
      ))}

      <div
        className="
        w-5
        h-5
        rounded-full
        bg-[#00E5CC]
        shadow-[0_0_40px_rgba(0,229,204,0.9)]
      "
      />
    </div>
  );
};

export default RadarAnimation;