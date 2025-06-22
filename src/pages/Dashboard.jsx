import React from "react";

import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";
import "./dashboard.css";

const data = [
  { name: "Week 1", earnings: 1200, hours: 40 },
  { name: "Week 2", earnings: 1500, hours: 45 },
  { name: "Week 3", earnings: 900, hours: 30 },
  { name: "Week 4", earnings: 1800, hours: 50 }
];

const sessions = JSON.parse(localStorage.getItem("timeSessions")) || [];
const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);
const format = (s) => new Date(s * 1000).toISOString().substr(11, 8);

export default function Dashboard() {
  return (
    <section className="dashboard">
      <h2>Analytics Overview</h2>

      <div className="charts">
        <div className="chart-card">
          <h3>Earnings (₹)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="earnings" stroke="#00c38a" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-card">
          <h3>Logged Hours</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
      </div>
    </section>
  );
}
