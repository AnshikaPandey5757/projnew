import { motion } from "framer-motion";

const stats = [
  {
    title: "Trust Score",
    value: "91/100",
  },
  {
    title: "Items Lent",
    value: "42",
  },
  {
    title: "Deposit Protected",
    value: "₹24,500",
  },
  {
    title: "Successful Returns",
    value: "98.7%",
  },
];

const StatsCards = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <motion.div
          key={stat.title}
          whileHover={{ y: -5 }}
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          p-6
        "
        >
          <p className="text-gray-500">
            {stat.title}
          </p>

          <h3 className="text-4xl font-bold mt-3">
            {stat.value}
          </h3>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;