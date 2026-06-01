import { motion } from "framer-motion";
import DigitalSignature from "./DigitalSignature";

const AgreementPreview = () => {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[#00E5CC] font-semibold">
              05 — Digital Agreement
            </span>

            <h2 className="mt-4 text-5xl md:text-6xl font-bold text-white font-syne leading-tight">
              Legally Secure.
              <br />
              Community Friendly.
            </h2>

            <p className="mt-6 text-gray-400 text-lg leading-relaxed">
              Every lending transaction is backed by an
              automatically generated agreement containing
              borrower details, deposits, return conditions,
              penalties and AI-generated condition reports.
            </p>

            <div className="mt-8">
              <DigitalSignature />
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            className="relative rounded-[32px] p-8 overflow-hidden glass"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-amber-400/10" />

            <div className="relative z-10">
              <div className="mb-8">
                <h3 className="text-white font-syne text-2xl font-bold">
                  TrustLoop Lending Agreement
                </h3>

                <p className="text-gray-400 mt-2">
                  Contract ID #TL-2026-84721
                </p>
              </div>

              <div className="space-y-5">
                <AgreementRow
                  label="Item"
                  value="Canon EOS R50 Camera"
                />

                <AgreementRow
                  label="Borrower"
                  value="Rahul Sharma"
                />

                <AgreementRow
                  label="Lender"
                  value="Priya Singh"
                />

                <AgreementRow
                  label="Duration"
                  value="3 Days"
                />

                <AgreementRow
                  label="Deposit"
                  value="₹5,000"
                />

                <AgreementRow
                  label="Penalty"
                  value="Damage Deduction Applicable"
                />

                <AgreementRow
                  label="AI Condition Report"
                  value="Attached"
                />
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <DigitalSignature />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AgreementRow = ({ label, value }) => {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-3">
      <span className="text-gray-400">{label}</span>

      <span className="text-white font-medium text-right">
        {value}
      </span>
    </div>
  );
};

export default AgreementPreview;