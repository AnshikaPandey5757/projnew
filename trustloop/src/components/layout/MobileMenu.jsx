import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Discover", path: "/#discovery-feed" },
  { label: "Trust Score", path: "/#trust-score" },
  { label: "AI Verification", path: "/#ai-verification" },
  { label: "Community", path: "/#community" },
];

const MobileMenu = ({
  open,
  setOpen,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28 }}
            className="fixed top-0 right-0 h-screen w-[85%] max-w-[380px] z-50 p-6"
          >
            <div className="h-full rounded-l-3xl glass-strong p-6 flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <h2 className="font-syne text-2xl font-bold">
                TrustLoop
              </h2>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-md text-gray-300 hover:text-white focus-ring"
              >
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-lg text-gray-300 hover:text-white transition-all"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              <Link
                to="/signup"
                className="w-full btn btn-accent inline-flex items-center justify-center"
                onClick={() => setOpen(false)}
              >
                Sign Up Free
              </Link>
            </div>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;