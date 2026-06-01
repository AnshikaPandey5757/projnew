import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import RatingStars from "./RatingStars";

const ReviewCard = ({
  name,
  location,
  review,
  rating = 5,
  avatar,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl p-6 glass"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E5CC]/5 to-[#FFB347]/5" />

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-5">
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border border-white/20"
          />

          <div>
            <h4 className="text-white font-semibold">
              {name}
            </h4>

            <div className="flex items-center gap-2">
              <p className="text-gray-400 text-sm">
                {location}
              </p>

              <ShieldCheck
                size={14}
                className="text-[#00E5CC]"
              />
            </div>
          </div>
        </div>

        <RatingStars rating={rating} />

        <p className="mt-5 text-gray-300 leading-relaxed">
          "{review}"
        </p>
      </div>
    </motion.div>
  );
};

export default ReviewCard;