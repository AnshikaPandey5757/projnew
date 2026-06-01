import { useState } from "react";

const categories = [
  "All",
  "Electronics",
  "Books",
  "Gaming",
  "Tools",
  "Appliances",
  "Music",
];

const CategoryTabs = () => {
  const [active, setActive] = useState("All");

  return (
    <div className="flex gap-3 overflow-auto">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActive(category)}
          className={`
            px-5
            py-3
            rounded-2xl
            whitespace-nowrap
            transition-all
            ${active === category ? "bg-[#00E5CC] text-black" : "btn-ghost text-gray-400"}
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;