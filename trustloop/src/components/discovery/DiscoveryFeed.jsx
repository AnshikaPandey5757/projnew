import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import CategoryTabs from "./CategoryTabs";
import ItemCard from "./ItemCard";
import lendingService from "../../services/lendingService";
import { mockItems } from "../../utils/mockData";

const DiscoveryFeed = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const data = await lendingService.getListings();
        setItems((data && data.length > 0) ? data : mockItems);
      } catch (error) {
        console.error("Listing fetch failed:", error);
        setItems(mockItems);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return (
    <section id="discovery-feed" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}>
          <span className="text-[#00E5CC] font-semibold">02 · Discovery Feed</span>
          <h2 className="mt-4 text-5xl md:text-6xl font-bold font-syne text-white">
            Discover Trusted
            <br />
            Items Nearby.
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl">
            Browse items shared by verified members within your college, hostel, or society.
          </p>
        </motion.div>

        <div className="mt-12"><SearchBar /></div>
        <div className="mt-6"><FilterPanel /></div>
        <div className="mt-6"><CategoryTabs /></div>

        <div className="flex gap-8 mt-12 overflow-x-auto pb-6 scrollbar-thin">
          {loading ? (
            <p className="text-gray-400">Loading items...</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <ItemCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.title,
                  owner: item.owner || "local-member@trustloop.net",
                  image: item.images?.[0] || "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
                  trustScore: item.trustScore || "95/100",
                  distance: "0.8 km",
                  duration: "3 Days",
                  deposit: `${item.deposit || 0}`,
                }}
              />
            ))
          ) : (
            <p className="text-gray-400">No listings available yet.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiscoveryFeed;
