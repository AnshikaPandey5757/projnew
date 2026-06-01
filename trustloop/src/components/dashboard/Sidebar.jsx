import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  HandCoins,
  ShieldCheck,
  Bell,
  Settings,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "My Listings",
    icon: Package,
    path: "/lend-item",
  },
  {
    name: "Requests",
    icon: HandCoins,
    path: "/borrow-requests",
  },
  {
    name: "Trust Report",
    icon: ShieldCheck,
    path: "/trust-report",
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "/notifications",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

const Sidebar = () => {
  return (
    <aside
      className="
      fixed
      left-0
      top-0
      h-screen
      w-72
      bg-white/[0.03]
      backdrop-blur-xl
      border-r
      border-white/10
      hidden
      lg:flex
      flex-col
    "
    >
      <div className="p-8">
        <h1 className="font-syne text-3xl font-bold">
          TrustLoop
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Community Lending Network
        </p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `
                flex items-center gap-4
                px-4 py-3
                rounded-2xl
                transition-all
                ${
                  isActive
                    ? "bg-[#00E5CC]/10 text-[#00E5CC]"
                    : "text-gray-400 hover:bg-white/5"
                }
              `
              }
            >
              <Icon size={18} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;