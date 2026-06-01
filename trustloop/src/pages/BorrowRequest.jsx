import { useEffect, useState } from "react";
import lendingService from "../services/lendingService";

const BorrowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadRequests = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await lendingService.getBorrowRequests();
        setRequests(data);
      } catch (err) {
        setError(err.message || "Unable to load requests.");
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F1A] p-8 text-white">
      <h1 className="font-syne text-5xl font-bold">Borrow Requests</h1>

      {loading ? (
        <p className="mt-6 text-gray-400">Loading requests...</p>
      ) : error ? (
        <p className="mt-6 text-red-400">{error}</p>
      ) : requests.length === 0 ? (
        <p className="mt-6 text-gray-400">No borrow requests yet.</p>
      ) : (
        <div className="space-y-5 mt-10">
          {requests.map((request) => (
            <div key={request._id} className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-xl font-semibold text-white">
                {request.itemId?.title || "Unknown item"}
              </h3>
              <p className="text-gray-400 mt-2">
                Status: <span className="text-[#00E5CC]">{request.status}</span>
              </p>
              <p className="text-gray-400 mt-2">
                Requested on {new Date(request.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowRequests;
