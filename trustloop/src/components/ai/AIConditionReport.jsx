import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  BrainCircuit,
  Camera,
} from "lucide-react";

import BeforeAfterViewer from "./BeforeAfterViewer";
import VerificationScanner from "./VerificationScanner";
import aiVerificationService from "../../services/aiVerificationService";

const AIConditionReport = () => {
  const [itemName, setItemName] = useState("Canon EOS R5");
  const [itemCategory, setItemCategory] = useState("Camera");
  const [itemDescription, setItemDescription] = useState(
    "High-end mirrorless camera with a light scratch on the lens mount, a loose power switch, and minor surface scuffs."
  );
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const damageDetected = Boolean(report?.damages?.length);
  const statusClass = damageDetected
    ? "bg-red-500/10 border-red-500/20 text-red-300"
    : "bg-emerald-500/10 border-emerald-500/20 text-emerald-300";

  async function handleGenerateReport() {
    setLoading(true);
    setError("");

    try {
      const aiReport = await aiVerificationService.generateConditionReport({
        title: itemName,
        category: itemCategory,
        description: itemDescription,
      });
      setReport(aiReport);
    } catch (err) {
      setError(err.message || "AI report generation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="ai-verification" style={{ scrollMarginTop: "7rem" }} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#00E5CC] font-semibold">
              04 — AI Verification
            </span>

            <h2 className="mt-4 text-5xl md:text-6xl font-bold text-white font-syne">
              AI Damage Detection
              <br />
              Before Disputes Happen.
            </h2>

            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              TrustLoop now performs real AI analysis for item condition reports.
              Enter item details, generate an AI report, and uncover damage risks instantly.
            </p>

            <div className="mt-10 space-y-4">
              <Feature icon={<Camera size={18} />} title="Item-level insights" />
              <Feature icon={<BrainCircuit size={18} />} title="GPT-powered reports" />
              <Feature icon={<ShieldCheck size={18} />} title="Trust-focused recommendations" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-[36px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl p-8"
          >
            <VerificationScanner />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-white font-syne text-2xl font-bold">
                  AI Condition Report
                </h3>

                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusClass}`}>
                  {damageDetected ? (
                    <AlertTriangle size={16} className="text-red-400" />
                  ) : (
                    <ShieldCheck size={16} className="text-emerald-400" />
                  )}
                  <span className="text-sm">
                    {damageDetected ? "Dispute Triggered" : "No New Damage"}
                  </span>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-gray-400 text-sm">Item name</label>
                  <input
                    value={itemName}
                    onChange={(event) => setItemName(event.target.value)}
                    className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-white placeholder:text-gray-500"
                    placeholder="Canon EOS R5"
                  />
                </div>

                <div className="grid gap-2 md:grid-cols-2">
                  <div className="grid gap-2">
                    <label className="text-gray-400 text-sm">Category</label>
                    <input
                      value={itemCategory}
                      onChange={(event) => setItemCategory(event.target.value)}
                      className="rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-white placeholder:text-gray-500"
                      placeholder="Camera"
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-gray-400 text-sm">Condition notes</label>
                    <textarea
                      value={itemDescription}
                      onChange={(event) => setItemDescription(event.target.value)}
                      rows={4}
                      className="min-h-[140px] rounded-2xl border border-white/10 bg-slate-950/20 px-4 py-3 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleGenerateReport}
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-3xl bg-[#00E5CC] px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#00d8b8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Analyzing..." : "Generate AI Report"}
                </button>

                {error ? (
                  <p className="text-red-400">{error}</p>
                ) : report ? (
                  <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                    <div className="grid gap-3 md:grid-cols-3">
                      <StatCard title="Condition" value={`${report.conditionScore ?? 0}%`} />
                      <StatCard
                        title="Issues Found"
                        value={`${report.damages?.length ?? 0}`}
                      />
                      <StatCard
                        title="AI Latency"
                        value={report.analysisTime ?? "2.1s"}
                      />
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Summary</p>
                        <p className="mt-2 text-white text-sm">
                          {report.summary ?? "AI generated condition summary will appear here."}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">Recommendations</p>
                        <p className="mt-2 text-white text-sm">
                          {report.recommendations ?? "The AI will suggest next steps after analysis."}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">
                    Enter item details and generate a report to see AI-powered condition analysis.
                  </p>
                )}
              </div>

              <BeforeAfterViewer showDamage={damageDetected} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-[#00E5CC]/10 border border-[#00E5CC]/20 flex items-center justify-center text-[#00E5CC]">
        {icon}
      </div>

      <span className="text-gray-300">
        {title}
      </span>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
      <p className="text-gray-500 text-xs">
        {title}
      </p>

      <h4 className="text-white font-bold text-xl mt-1">
        {value}
      </h4>
    </div>
  );
}

export default AIConditionReport;