import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white flex">
      <Sidebar />

      <div className="flex-1 lg:ml-72">
        <Topbar />

        <main className="p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;