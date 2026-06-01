import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", score: 72 },
  { month: "Feb", score: 75 },
  { month: "Mar", score: 80 },
  { month: "Apr", score: 85 },
  { month: "May", score: 91 },
];

const TrustAnalytics = () => {
  return (
    <div className="glass rounded-3xl p-6">
      <h3 className="text-xl font-semibold mb-8">
        Trust Score Growth
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />

            <Line
              dataKey="score"
              stroke="#00E5CC"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrustAnalytics;