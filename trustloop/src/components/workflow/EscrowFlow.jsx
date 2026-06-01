import { motion } from "framer-motion";
import {
  Wallet,
  Shield,
  IndianRupee,
  CheckCircle,
} from "lucide-react";

const EscrowFlow = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      className="rounded-[32px] glass p-8"
    >
      <h3 className="text-2xl font-bold text-white">
        Deposit Escrow Flow
      </h3>

      <p className="mt-3 text-gray-400">
        Deposits remain protected throughout
        the borrowing lifecycle.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <FlowCard
          icon={Wallet}
          title="Borrower Pays"
        />

        <FlowCard
          icon={Shield}
          title="Held Securely"
        />

        <FlowCard
          icon={IndianRupee}
          title="Damage Review"
        />

        <FlowCard
          icon={CheckCircle}
          title="Refund Released"
        />
      </div>
    </motion.div>
  );
};

function FlowCard({
  icon: Icon,
  title,
}) {
  return (
    <div className="rounded-2xl glass p-5 text-center">
      <div
        className="
          mx-auto
          mb-4
          w-12
          h-12
          rounded-xl
          flex
          items-center
          justify-center
          bg-[#00E5CC]/10
        "
      >
        <Icon
          className="text-[#00E5CC]"
          size={22}
        />
      </div>

      <p className="text-white font-medium">
        {title}
      </p>
    </div>
  );
}

export default EscrowFlow;