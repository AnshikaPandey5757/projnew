import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-6 bg-[#0B0F1A]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center py-20">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00E5CC]/20 bg-[#00E5CC]/10 px-4 py-2">
              <Sparkles size={14} className="text-[#00E5CC]" />
              <span className="text-sm text-[#00E5CC]">AI Verified Community Lending</span>
            </div>

            <h1 className="mt-8 font-syne font-black text-white leading-tight text-5xl md:text-6xl">
              Borrow <span className="text-[#00E5CC]">Anything.</span>
              <br />
              Trust <span className="text-[#FFB347]">Everyone.</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-xl">
              Secure hyperlocal borrowing powered by identity verification, AI damage detection, trust scores, security deposits and digital agreements.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                className="btn btn-accent inline-flex items-center gap-3"
                type="button"
                onClick={() => navigate("/lend")}
              >
                Start Lending <ArrowRight size={18} />
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => {
                  window.location.hash = "#discovery-feed";
                }}
              >
                Explore Items
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <div className="rounded-2xl glass p-6">
              <h3 className="text-white font-bold mb-4">Nearby Trusted Items</h3>

              <div className="space-y-4">
                <ItemPreview title="Canon EOS R50" score="94" distance="0.4 km" />
                <ItemPreview title="Projector" score="95" distance="2.2 km" />
              </div>

              <div className="mt-6 p-4 rounded-xl bg-[#00E5CC]/10 border border-[#00E5CC]/20">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#00E5CC]" />
                  <div>
                    <h4 className="text-white font-semibold">AI Condition Verification Enabled</h4>
                    <p className="text-gray-400 text-sm">Damage protection active</p>
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

function ItemPreview({ title, score, distance }) {
  return (
    <div className="flex justify-between items-center rounded-xl bg-white/5 border border-white/10 p-3">
      <div>
        <h4 className="text-white">{title}</h4>
        <p className="text-gray-500 text-sm">{distance}</p>
      </div>
      <div className="px-3 py-1 rounded-lg bg-[#00E5CC]/10 text-[#00E5CC] text-sm">{score}/100</div>
    </div>
  );
}

export default HeroSection;
