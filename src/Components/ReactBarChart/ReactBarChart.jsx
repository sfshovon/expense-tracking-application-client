import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useExpenseFunctions from '../../CustomHook/useExpenseFunctions';
import Loader from '../Loader/Loader';

const ReactBarChart = () => {
  const { isLoading, forecastData } = useExpenseFunctions();
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [fontSize, setFontSize] = useState(0);
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const renderCustomizedLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} dx={dx} dy={dy} fill="#000" textAnchor="middle" fontSize={fontSize} fontWeight="bold">
        Tk {Math.round(value)}
      </text>
    );
  };
  const formatXAxisTick = (dateString) => {
    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric'
    });
    return `${dayName}, ${formattedDate}`;
  };
  const colors = ['#42629e', '#81e3c2'];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 320 && window.innerWidth < 668) {
        setHeight(300);
        setWidth(350);
        setFontSize(8);
        setDx(16)
        setDy(20)
      } 
      else if (window.innerWidth > 668) {
        setHeight(450);
        setWidth(900);
        setFontSize(16);
        setDx(50)
        setDy(25)
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <h1 className="text-lg md:text-3xl font-bold text-center text-blue-800 mb-6">Forecasted expenses for the next 7 days</h1>
      <div className="mt-10 flex justify-center items-center mx-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <ResponsiveContainer width={width} height={height}>
            <BarChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatXAxisTick} fontSize={fontSize} fontWeight="bold" />
              <YAxis fontSize={fontSize} fontWeight="bold" />
              <Tooltip />
              <Bar dataKey="amount" label={renderCustomizedLabel}>
                {forecastData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ReactBarChart;
