import { motion } from "framer-motion";

import TrustRing from "./TrustRing";
import TrustBreakdown from "./TrustBreakdown";
import VerificationBadge from "./VerificationBadge";

const TrustScoreWidget = () => {
  return (
    <section id="trust-score" style={{ scrollMarginTop: "7rem" }} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT */}
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
          >
            <span className="text-[#00E5CC] font-semibold">
              03 — Trust Engine
            </span>

            <h2
              className="
                mt-4
                text-5xl
                md:text-6xl
                font-bold
                font-syne
                text-white
              "
            >
              Trust Built
              <br />
              Into Every
              <br />
              Transaction.
            </h2>

            <p
              className="
                mt-6
                text-lg
                text-gray-400
                max-w-xl
              "
            >
              Our AI-powered trust system evaluates
              successful returns, disputes, reviews,
              verification status, and lending history
              to generate a dynamic trust score.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <VerificationBadge type="phone" />
              <VerificationBadge type="email" />
              <VerificationBadge type="identity" />
              <VerificationBadge type="society" />
            </div>
          </motion.div>

          {/* RIGHT */}
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
            className="rounded-[36px] p-10 glass"
          >
            <div className="flex flex-col items-center">
              <TrustRing score={91} />

              <h3
                className="
                mt-6
                text-3xl
                font-bold
                text-white
              "
              >
                Trust Score
              </h3>

              <p className="text-gray-400 mt-2">
                Excellent Community Reputation
              </p>
            </div>

            <div className="mt-12">
              <TrustBreakdown />
            </div>

            <div
              className="
                mt-10
                p-5
                rounded-2xl
                bg-[#00E5CC]/10
                border
                border-[#00E5CC]/20
              "
            >
              <h4 className="text-[#00E5CC] font-semibold">
                Trust Advantage
              </h4>

              <p className="text-gray-300 mt-2">
                Users with scores above 90 receive
                lower deposits, priority approvals,
                and access to premium listings.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TrustScoreWidget;