import {
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const activities = [
  {
    icon: CheckCircle,
    text: "DSLR returned successfully",
    color: "text-green-400",
  },
  {
    icon: Clock,
    text: "Projector pickup scheduled",
    color: "text-yellow-400",
  },
  {
    icon: AlertTriangle,
    text: "Damage review submitted",
    color: "text-red-400",
  },
];

const RecentActivity = () => {
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-xl font-semibold mb-6">
        Recent Activity
      </h3>

      <div className="space-y-5">
        {activities.map((activity, idx) => {
          const Icon = activity.icon;

          return (
            <div
              key={idx}
              className="flex gap-4 items-center"
            >
              <Icon
                className={activity.color}
                size={18}
              />

              <span>{activity.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;