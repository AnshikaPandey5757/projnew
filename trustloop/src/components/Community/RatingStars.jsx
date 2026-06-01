import { Star } from "lucide-react";
import { motion } from "framer-motion";

const RatingStars = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.08,
            type: "spring",
          }}
        >
          <Star
            size={18}
            fill={index < rating ? "#FFB347" : "transparent"}
            stroke="#FFB347"
            className="
              drop-shadow-[0_0_8px_rgba(255,179,71,0.7)]
            "
          />
        </motion.div>
      ))}
    </div>
  );
};

export default RatingStars;