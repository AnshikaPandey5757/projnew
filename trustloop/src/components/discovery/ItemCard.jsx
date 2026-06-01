import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  MapPin,
  Calendar,
  IndianRupee,
} from "lucide-react";

const ItemCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/item/${item.id}`)}
      whileHover={{
        y: -8,
        rotateX: 3,
        rotateY: -3,
      }}
      transition={{ duration: 0.25 }}
      className="min-w-[340px] rounded-[32px] overflow-hidden group relative glass cursor-pointer"
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-500
          bg-gradient-to-br
          from-[#00E5CC]/10
          to-[#FFB347]/10
        "
      />

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        <div className="absolute top-4 left-4">
          <div
            className="
              flex
              items-center
              gap-1
              px-3
              py-1
              rounded-full
              bg-[#00E5CC]/15
              border
              border-[#00E5CC]/20
            "
          >
            <ShieldCheck
              size={14}
              className="text-[#00E5CC]"
            />

            <span className="text-xs text-[#00E5CC]">
              {item.trustScore}
            </span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <span
            className="
              px-3
              py-1
              rounded-full
              bg-emerald-500/15
              text-emerald-300
              text-xs
            "
          >
            Available
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-white text-xl font-semibold">
          {item.name}
        </h3>

        <p className="text-gray-400 mt-2">
          {item.owner}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Tag
            icon={<MapPin size={14} />}
            label={item.distance}
          />

          <Tag
            icon={<Calendar size={14} />}
            label={item.duration}
          />

          <Tag
            icon={<IndianRupee size={14} />}
            label={item.deposit}
          />
        </div>
      </div>
    </motion.div>
  );
};

function Tag({ icon, label }) {
  return (
    <div
      className="
        flex
        items-center
        gap-2
        px-3
        py-2
        rounded-xl
        bg-white/5
        border
        border-white/10
      "
    >
      {icon}
      <span className="text-xs text-gray-300">
        {label}
      </span>
    </div>
  );
}

export default ItemCard;