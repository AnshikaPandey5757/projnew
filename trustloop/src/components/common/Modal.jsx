import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="
              fixed
              inset-0
              bg-black/70
              backdrop-blur-sm
              z-50
            "
          />

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[95%] max-w-2xl rounded-3xl p-6"
          >
            <div className="glass-strong flex items-center justify-between mb-6 p-4 -m-4 rounded-t-3xl">
              <h2 className="text-xl font-semibold text-white">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white focus-ring p-2 rounded-md"
              >
                <X />
              </button>
            </div>
            <div className="mt-2">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;