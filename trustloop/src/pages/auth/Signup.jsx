import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";
import authService from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(response.user);
      localStorage.setItem("trustloop-user", JSON.stringify(response.user));
      localStorage.setItem("trustloop-token", response.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full
          max-w-lg
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
        "
      >
        <div className="text-center">
          <h1 className="font-syne text-4xl font-bold text-white">
            Join TrustLoop
          </h1>

          <p className="text-gray-400 mt-3">
            Build trust. Borrow smarter.
          </p>
        </div>

        <form className="space-y-5 mt-8" onSubmit={handleSubmit}>
          <Input
            icon={<User size={18} />}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
          />

          <Input
            icon={<Mail size={18} />}
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
          />

          <Input
            icon={<Lock size={18} />}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
          />

          <Input
            icon={<Lock size={18} />}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            type="password"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-4
              rounded-2xl
              bg-[#00E5CC]
              text-black
              font-semibold
              flex
              justify-center
              items-center
              gap-2
              disabled:opacity-60
            "
          >
            {loading ? "Creating account..." : "Create Account"}
            <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-6 text-center text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00E5CC]">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

function Input({ icon, placeholder, type = "text", name, value, onChange }) {
  return (
    <div className="
      flex
      items-center
      gap-3
      bg-white/5
      border
      border-white/10
      rounded-2xl
      px-4
      py-4
    ">
      {icon}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          bg-transparent
          outline-none
          w-full
          text-white
          placeholder:text-gray-500
        "
      />
    </div>
  );
}

export default Signup;
