import { motion } from "framer-motion";

const DamageDetection = ({
  damages = [
    {
      id: 1,
      top: "28%",
      left: "35%",
      width: "22%",
      height: "16%",
    },
  ],
}) => {
  return (
    <>
      {damages.map((damage) => (
        <motion.div
          key={damage.id}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="
            absolute
            border-2
            border-red-500
            bg-red-500/10
            rounded-lg
          "
          style={{
            top: damage.top,
            left: damage.left,
            width: damage.width,
            height: damage.height,
          }}
        >
          <div className="absolute -top-7 left-0 text-[10px] px-2 py-1 rounded bg-red-500 text-white">
            Scratch Detected
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default DamageDetection;