import { motion } from "framer-motion";
import {
  MessageSquare,
  ShieldCheck,
  Users,
} from "lucide-react";

import Testimonials from "./Testimonials";

const CommunityFeed = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-[#00E5CC] font-semibold">
            06 — Community Trust
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold text-white font-syne">
            Trusted By Real
            <br />
            Communities.
          </h2>

          <p className="mt-6 text-gray-400 text-lg">
            Students, hostel residents, and apartment societies
            rely on TrustLoop every day to safely share valuable
            items with confidence.
          </p>
        </motion.div>

        {/* TRUST STATS */}
        <div className="grid md:grid-cols-3 gap-6 mt-16 mb-20">
          
          <StatCard
            icon={<Users size={24} />}
            value="25,000+"
            label="Verified Members"
          />

          <StatCard
            icon={<ShieldCheck size={24} />}
            value="98.7%"
            label="Successful Returns"
          />

          <StatCard
            icon={<MessageSquare size={24} />}
            value="42,000+"
            label="Community Reviews"
          />
        </div>

        {/* REVIEWS */}
        <Testimonials />

        {/* CHAT STYLE BUBBLES */}
        <div className="mt-20 max-w-4xl mx-auto space-y-6">
          
          <ChatBubble
            left
            message="Borrowed a gaming console for the weekend. Returned it without any issues."
          />

          <ChatBubble
            message="AI verification confirmed no damage. Deposit refunded instantly."
          />

          <ChatBubble
            left
            message="This feels safer than typical marketplace apps."
          />
        </div>
      </div>
    </section>
  );
};

function StatCard({ icon, value, label }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="rounded-3xl p-6 glass text-center">
      <div className="flex justify-center mb-4 text-[#00E5CC]">
        {icon}
      </div>
      <div className="max-w-md px-5 py-4 rounded-3xl glass text-gray-300">
function ChatBubble({
  message,
  left = false,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      className={`flex ${
        left ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className="
          max-w-md
          px-5
          py-4
          rounded-3xl
          bg-white/5
          border
          border-white/10
          backdrop-blur-xl
          text-gray-300
        "
      >
        {message}
      </div>
    </motion.div>
  );
}

export default CommunityFeed;