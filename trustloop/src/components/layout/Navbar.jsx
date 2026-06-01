import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import MobileMenu from "./MobileMenu";
import ThemeToggle from "../common/ThemeToggle";

const navLinks = [
  { label: "Discover", path: "/#discovery-feed" },
  { label: "Trust", path: "/#trust-score" },
  { label: "AI Verification", path: "/#ai-verification" },
  { label: "Community", path: "/#community" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed
          top-0
          left-0
          right-0
          z-40
          transition-all
          duration-300
          ${
            scrolled
              ? "backdrop-blur-xl bg-[#0B0F1A]/80 border-b border-white/5"
              : ""
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-20 flex items-center justify-between">
            
            {/* Logo */}
            <Link
              to="/"
              className="
                font-syne
                text-2xl
                font-bold
                text-white
              "
            >
              TrustLoop
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.path}
                  className="
                    text-gray-400
                    hover:text-white
                    transition-all
                  "
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>

              <Link to="/signup" className="btn btn-accent" aria-label="Sign up for TrustLoop">Sign Up Free</Link>

              <ThemeToggle />
            </div>

            {/* Mobile */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white focus-ring"
              onClick={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
              aria-expanded={mobileOpen}
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.nav>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
      />
    </>
  );
};

export default Navbar;