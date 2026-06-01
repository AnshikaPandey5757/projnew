import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MapPin,
} from "lucide-react";

import HeroParticles from "./HeroParticles";
import RadarAnimation from "./RadarAnimation";
import FloatingTrustBadge from "./FloatingTrustBadge";

const HeroSection = () => {
  return (
    <section
      className="
      relative
      min-h-screen
      flex
      items-center
      overflow-hidden
      px-6
      bg-[#0B0F1A]
    "
    >
      {/* Background */}
      <HeroParticles />

      <div
        className="
        absolute
        inset-0
        bg-[radial-gradient(circle_at_center,rgba(0,229,204,0.08),transparent_60%)]
      "
      />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div
              className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-[#00E5CC]/20
              bg-[#00E5CC]/10
              px-4
              py-2
            "
            >
              <Sparkles
                size={14}
                className="text-[#00E5CC]"
              />

              <span className="text-sm text-[#00E5CC]">
                AI Verified Community Lending
              </span>
            </div>

            {/* Headline */}
            <h1
              className="
              mt-8
              font-syne
              font-black
              text-white
              leading-[0.95]
              text-[4rem]
              md:text-[6rem]
            "
            >
              Borrow
              <span className="text-[#00E5CC]">
                {" "}Anything.
              </span>

              <br />

              Trust
              <span className="text-[#FFB347]">
                {" "}Everyone.
              </span>
            </h1>

            <p
              className="
              mt-8
              text-lg
              text-gray-400
              max-w-xl
              leading-relaxed
            "
            >
              Secure hyperlocal borrowing powered by
              identity verification, AI damage detection,
              trust scores, security deposits and digital
              agreements.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button className="btn btn-accent inline-flex items-center gap-3">
                Start Lending
                <ArrowRight size={18} />
              </button>

              <button className="btn btn-ghost">
                Explore Items
              </button>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-10 mt-14">
              <Metric
                value="25K+"
                label="Verified Members"
              />

              <Metric
                value="98.7%"
                label="Successful Returns"
              />

              <Metric
                value="₹1.2Cr+"
                label="Protected Deposits"
              />
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1,
            }}
            className="relative h-[650px]"
          >
            <RadarAnimation />

            <FloatingTrustBadge />

            {/* Main Glass Panel */}
            <div className="absolute inset-0 rounded-[40px] overflow-hidden glass">
              <div
                className="
                absolute
                inset-0
                bg-gradient-to-br
                from-[#00E5CC]/10
                via-transparent
                to-[#FFB347]/10
              "
              />

              <div className="p-10 relative z-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-bold text-xl">
                    Nearby Trusted Items
                  </h3>

                  <MapPin
                    className="text-[#00E5CC]"
                    size={20}
                  />
                </div>

                <div className="space-y-5 mt-8">
                  <ItemPreview
                    title="Canon EOS R50"
                    score="94"
                    distance="0.4 km"
                  />
    <div className="flex justify-between items-center rounded-2xl glass p-4">

                  <ItemPreview
                    title="Projector"
                    score="95"
                    distance="2.2 km"
                  />
                </div>

                <div
                  className="
                  mt-8
                  rounded-3xl
                  bg-[#00E5CC]/10
                  border
                  border-[#00E5CC]/20
                  p-6
                "
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck
                      className="text-[#00E5CC]"
                    />

                    <div>
                      <h4 className="text-white font-semibold">
                        AI Condition Verification Enabled
                      </h4>

                      <p className="text-gray-400 text-sm">
                        Damage protection active
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

function Metric({ value, label }) {
  return (
    <div>
      <h3 className="text-white text-3xl font-bold">
        {value}
      </h3>

      <p className="text-gray-500 text-sm mt-1">
        {label}
      </p>
    </div>
  );
}

function ItemPreview({
  title,
  score,
  distance,
}) {
  return (
    <div
      className="
      flex
      justify-between
      items-center
      rounded-2xl
      bg-white/5
      border
      border-white/10
      p-4
    "
    >
      <div>
        <h4 className="text-white">
          {title}
        </h4>

        <p className="text-gray-500 text-sm">
          {distance}
        </p>
      </div>

      <div
        className="
        px-3
        py-2
        rounded-xl
        bg-[#00E5CC]/10
        text-[#00E5CC]
        text-sm
      "
      >
        {score}/100
      </div>
    </div>
  );
}

export default HeroSection;