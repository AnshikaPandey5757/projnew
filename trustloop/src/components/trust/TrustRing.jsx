import { motion } from "framer-motion";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

const TrustRing = ({
  score = 91,
}) => {
  return (
    <motion.div
      initial={{
        scale: 0.8,
        opacity: 0,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
      }}
      viewport={{ once: true }}
      className="w-[220px] h-[220px]"
    >
      <CircularProgressbar
        value={score}
        text={`${score}`}
        styles={buildStyles({
          pathColor: "#00E5CC",
          trailColor: "rgba(255,255,255,0.08)",
          textColor: "#ffffff",
          textSize: "18px",
        })}
      />
    </motion.div>
  );
};

export default TrustRing;