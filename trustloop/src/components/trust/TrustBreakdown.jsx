import { motion } from "framer-motion";

const metrics = [
  {
    label: "Successful Returns",
    value: 96,
  },
  {
    label: "Reviews",
    value: 92,
  },
  {
    label: "Verification Level",
    value: 100,
  },
  {
    label: "Dispute History",
    value: 88,
  },
];

const TrustBreakdown = () => {
  return (
    <div className="space-y-6">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">
              {metric.label}
            </span>

            <span className="text-white">
              {metric.value}%
            </span>
          </div>

          <div className="h-3 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${metric.value}%`,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
              }}
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-[#00E5CC]
                to-[#FFB347]
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBreakdown;