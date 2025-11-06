import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { apiGetDashboard } from "../api/mockApi";

const COLORS = ["#4caf50", "#e0e0e0"];

export default function DonutChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiGetDashboard().then((res) => setData(res.donut));
  }, []);

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
