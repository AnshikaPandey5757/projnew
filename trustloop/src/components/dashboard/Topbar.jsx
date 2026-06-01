import { Search, Bell } from "lucide-react";

const Topbar = () => {
  return (
    <header
      className="
      sticky
      top-0
      z-30
      backdrop-blur-xl
      bg-[#0B0F1A]/80
      border-b
      border-white/5
    "
    >
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3 glass px-4 py-3 rounded-2xl w-[350px]">
          <Search size={18} />
          <input
            placeholder="Search items..."
            className="bg-transparent outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-5">
          <Bell size={20} />

          <div className="flex items-center gap-3">
            <img
              src="/avatar.jpg"
              alt=""
              className="w-10 h-10 rounded-full"
            />

            <div>
              <p className="text-sm font-medium">
                Anshika
              </p>

              <p className="text-xs text-gray-500">
                Trust Score 91
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;