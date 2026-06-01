import { motion } from "framer-motion";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  loading = false,
  ...props
}) => {
  const variants = {
    primary:
      "bg-[#00E5CC] text-black hover:shadow-[0_0_30px_rgba(0,229,204,0.45)]",

    secondary:
      "bg-white/5 border border-white/10 text-white hover:border-[#00E5CC]/40",

    amber:
      "bg-[#FFB347] text-black hover:shadow-[0_0_25px_rgba(255,179,71,0.4)]",

    ghost:
      "text-gray-300 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      disabled={loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 btn focus-ring",
        variants[variant],
        sizes[size],
        loading && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" style={{ borderTopColor: 'transparent' }} />
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;