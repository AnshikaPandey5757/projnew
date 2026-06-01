import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";
import TrustAnalytics from "../components/dashboard/TrustAnalytics";
import RecentActivity from "../components/dashboard/RecentActivity";
import ActiveLendings from "../components/dashboard/ActiveLendings";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <StatsCards />

      <div className="grid xl:grid-cols-3 gap-6 mt-6">
        <div className="xl:col-span-2">
          <TrustAnalytics />
        </div>

        <RecentActivity />
      </div>

      <div className="mt-6">
        <ActiveLendings />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;