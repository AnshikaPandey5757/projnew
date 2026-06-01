import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center gap-3 glass rounded-2xl px-5 py-4">
      <Search
        size={18}
        className="text-[#00E5CC]"
      />

      <input
        type="text"
        placeholder="Search cameras, laptops, tools..."
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
};

export default SearchBar;