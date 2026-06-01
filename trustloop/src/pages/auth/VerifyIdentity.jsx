import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Upload, CheckCircle } from "lucide-react";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const VerifyIdentity = () => {
  const { currentUser } = useAuth();
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFiles = (event) => {
    setFiles(Array.from(event.target.files));
    setError("");
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!currentUser) {
      setError("Please log in to verify your identity.");
      return;
    }

    if (files.length === 0) {
      setError("Please upload at least one verification file.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const result = await authService.verifyIdentity(formData);
      setMessage(result.message || "Verification submitted successfully.");
      localStorage.setItem("trustloop-user", JSON.stringify(result.user));
    } catch (err) {
      setError(err.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <span className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-[#00E5CC]/10
            border
            border-[#00E5CC]/20
          ">
            <ShieldCheck size={16} className="text-[#00E5CC]" />
            Trust Verification
          </span>

          <h1 className="
            mt-6
            font-syne
            text-5xl
            md:text-6xl
            font-bold
            text-white
          ">
            Verify Your Identity
          </h1>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto">
            Verified users gain higher trust scores, lower deposits and access to premium listings.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 mt-16">
          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-bold text-white">Verification Steps</h2>
            <div className="space-y-5 mt-8">
              {["Phone Verification", "Email Verification", "Government ID", "Face Verification", "Community Verification"].map((step, index) => (
                <div key={step} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5">
                  <div className="w-10 h-10 rounded-full bg-[#00E5CC]/10 flex items-center justify-center text-[#00E5CC]">
                    {index + 1}
                  </div>
                  <span className="text-white">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <h2 className="text-2xl font-bold text-white">Upload Government ID</h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <label className="block text-sm text-gray-300">Choose files</label>
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFiles}
                className="w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#00E5CC] file:text-black"
              />

              <div className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center">
                <Upload className="mx-auto text-[#00E5CC]" />
                <p className="mt-4">Select Aadhaar, PAN, College ID or selfie images</p>
              </div>

              {error && <p className="text-red-400">{error}</p>}
              {message && <p className="text-emerald-400">{message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-[#00E5CC] text-black font-semibold disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Verify Identity"}
              </button>
            </form>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <ActionCard icon={ShieldCheck} label="Verify Identity" />
              <ActionCard icon={CheckCircle} label="Confirm Trust" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ActionCard({ icon: Icon, label }) {
  return (
    <button className="
      p-5
      rounded-2xl
      bg-white/5
      border
      border-white/10
      flex
      flex-col
      items-center
      gap-3
      hover:border-[#00E5CC]/30
      transition-all
    ">
      <Icon size={24} className="text-[#00E5CC]" />
      <span className="text-white">{label}</span>
    </button>
  );
}

export default VerifyIdentity;
