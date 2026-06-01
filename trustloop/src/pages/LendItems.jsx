import { useState } from "react";
import { Upload } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import lendingService from "../services/lendingService";

const LendItem = () => {
  const { currentUser } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    deposit: "",
    price: "",
    location: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");
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
    setMessage("");

    if (!currentUser) {
      setError("Please login to list an item.");
      setLoading(false);
      return;
    }

    try {
      await lendingService.createListing({
        title: form.title,
        description: form.description,
        category: form.category,
        deposit: Number(form.deposit) || 0,
        price: Number(form.price) || 0,
        location: form.location,
        images: form.imageUrl ? [form.imageUrl] : [],
      });

      setMessage("Listing published successfully.");
      setForm({
        title: "",
        description: "",
        category: "",
        deposit: "",
        price: "",
        location: "",
        imageUrl: "",
      });
    } catch (err) {
      setError(err.message || "Unable to publish listing.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F1A] p-8 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-syne text-5xl font-bold">List New Item</h1>

        <form className="space-y-6 mt-10" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Item Name"
            className="input"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="5"
            className="input"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="input"
          />

          <input
            name="deposit"
            value={form.deposit}
            onChange={handleChange}
            placeholder="Deposit Amount"
            className="input"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="input"
          />

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="input"
          />

          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="Cover image URL"
            className="input"
          />

          <div className="border-2 border-dashed border-white/10 rounded-3xl p-10 text-center">
            <Upload className="mx-auto text-[#00E5CC]" />
            <p className="mt-4">Use an image URL to attach a cover photo</p>
          </div>

          {error && <p className="text-red-400">{error}</p>}
          {message && <p className="text-emerald-400">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-2xl bg-[#00E5CC] text-black disabled:opacity-60"
          >
            {loading ? "Publishing..." : "Publish Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LendItem;
