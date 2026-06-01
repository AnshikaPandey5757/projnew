import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShieldCheck, MapPin, IndianRupee } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import lendingService from "../services/lendingService";

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadItem = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await lendingService.getItem(id);
        setItem(data);
      } catch (err) {
        setError(err.message || "Unable to load item.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadItem();
    }
  }, [id]);

  const handleRequestBorrow = async () => {
    setError("");
    setMessage("");

    if (!currentUser) {
      setError("Please login to request borrowing this item. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    try {
      await lendingService.requestBorrow(id);
      setMessage("Borrow request submitted successfully.");
    } catch (err) {
      setError(err.message || "Unable to submit borrow request.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-white">
        Loading item details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0F1A] flex items-center justify-center text-red-400 px-6">
        {error}
      </div>
    );
  }

  if (!item) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        <img
          src={item.images?.[0] || "/images/discovery/camera.jpg"}
          alt={item.title}
          className="rounded-[32px] w-full h-[500px] object-cover"
        />

        <div>
          <h1 className="font-syne text-5xl font-bold">{item.title}</h1>
          <p className="text-gray-400 mt-4">{item.description}</p>

          <div className="space-y-4 mt-10">
            <Info icon={ShieldCheck} text={`Owner: ${item.owner}`} />
            <Info icon={MapPin} text={item.location || "Location not specified"} />
            <Info icon={IndianRupee} text={`₹${item.deposit} Deposit`} />
          </div>

          {message && <p className="text-emerald-400 mt-6">{message}</p>}
          {error && <p className="text-red-400 mt-6">{error}</p>}

          <button onClick={handleRequestBorrow} className="btn btn-accent mt-10">
            Request Borrow
          </button>
          <button onClick={() => navigate(-1)} className="ml-4 btn btn-ghost mt-10">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

function Info({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="text-[#00E5CC]" />
      {text}
    </div>
  );
}

export default ItemDetails;
