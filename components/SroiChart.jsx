"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Investment (₦1)', value: 1, fill: 'var(--blue)' },
  { name: 'Social Value (₦8)', value: 8, fill: 'var(--green)' },
];

export default function SroiChart() {
  return (
    <div style={{ height: "300px", width: "100%", marginTop: "24px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" width={150} tick={{ fill: 'var(--cream)', fontSize: 14 }} axisLine={false} tickLine={false} />
          <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ background: "var(--navy)", border: "1px solid var(--grey-dark)", color: "var(--cream)" }} />
          <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
