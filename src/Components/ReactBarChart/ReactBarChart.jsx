import React from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import useExpenseFunctions from '../../CustomHook/ExpenseFunctions';
import Loader from '../Loader/Loader';

const ReactBarChart = () => {
  const { isLoading, forecastData } = useExpenseFunctions();
  const renderCustomizedLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} dx={50} dy={15} fill="#3f3859" textAnchor="middle" fontSize={16} fontWeight="bold">
        Tk {Math.round(value)}
      </text>
    );
  };
  const formatXAxisTick = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    return `${dayName}, ${formattedDate}`;
  };
  const colors = ['#42629e', '#81e3c2'];

  return (
    <div className="mt-10 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Forecasted expenses for the next 7 days</h1>
      { 
        isLoading ? (
          <Loader/>
        ) 
        : (
          <BarChart width={900} height={450} data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxisTick} fontSize={14} fontWeight="bold"/>
            <YAxis fontSize={12} fontWeight="bold"/>
            <Tooltip />
            <Bar dataKey="amount" label={renderCustomizedLabel}>
              {forecastData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        )
      } 
    </div>
  );
};

export default ReactBarChart;