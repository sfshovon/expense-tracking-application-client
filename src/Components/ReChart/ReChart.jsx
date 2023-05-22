import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const ReChart = ({ pieData }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#d10a4d"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, title, amount }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <g>
        <circle cx={cx} cy={cy} r={innerRadius + (outerRadius - innerRadius) * 0.4}
          fill="#f5f5f5" stroke="white" strokeWidth={4} />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight="bold" fill="#333333"
        >
          Spent Per Category
        </text>
        <text x={x} y={y} fill="black" textAnchor={x > cx ? "start" : "end"}  dominantBaseline="central" fontSize={14} fontWeight="bold"
        >
          <tspan x={x} dy={-10}>{title}</tspan>
          <tspan x={x} dy={20}>{`$${amount}`}</tspan>
        </text>
      </g>
    );
  };
  
  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={180}
            fill="#8884d8"
            dataKey="amount"
          >
            { 
              pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReChart;