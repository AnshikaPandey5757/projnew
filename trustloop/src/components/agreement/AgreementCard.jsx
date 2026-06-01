import { motion } from "framer-motion";

const AgreementCard = ({
  title,
  borrower,
  lender,
  duration,
  deposit,
  status = "Active",
}) => {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl p-6 glass"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-amber-400/5" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-syne text-xl font-bold text-white">
            {title}
          </h3>

          <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold">
            {status}
          </span>
        </div>

        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex justify-between">
            <span>Borrower</span>
            <span className="text-white">{borrower}</span>
          </div>

          <div className="flex justify-between">
            <span>Lender</span>
            <span className="text-white">{lender}</span>
          </div>

          <div className="flex justify-between">
            <span>Duration</span>
            <span className="text-white">{duration}</span>
          </div>

          <div className="flex justify-between">
            <span>Deposit</span>
            <span className="font-semibold text-amber-300">
              ₹{deposit}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AgreementCard;