import { motion } from "framer-motion";

import WorkflowTimeline from "./WorkflowTimeline";
import EscrowFlow from "./EscrowFlow";

const HowItWorks = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
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
          className="max-w-3xl"
        >
          <span className="text-[#00E5CC] font-semibold">
            04 — How It Works
          </span>

          <h2
            className="
              mt-4
              text-5xl
              md:text-6xl
              font-syne
              font-bold
              text-white
            "
          >
            A Safer Way
            <br />
            To Share Anything.
          </h2>

          <p
            className="
              mt-6
              text-lg
              text-gray-400
              leading-relaxed
            "
          >
            Every transaction is protected through
            identity verification, escrow deposits,
            AI condition analysis, and trust scoring.
          </p>
        </motion.div>

        {/* Workflow */}
        <div className="mt-20">
          <WorkflowTimeline />
        </div>

        {/* Escrow Visualization */}
        <div className="mt-20">
          <EscrowFlow />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;