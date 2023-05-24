import { Bar, BarChart, CartesianGrid, Cell, Tooltip, XAxis, YAxis } from 'recharts';
import regression from 'regression';
import PageTitle from '../../Components/PageTitle/PageTitle';
import { data } from './data';

const Home = () => {
  const linearRegression = (data) => {
    const points = data.map((entry, index) => [index, entry.amount]);
    const predictedData = [];
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#8884d8'];
    for (let i = 1; i <= 7; i++) {
      const result = regression.linear(points);
      const nextIndex = data.length + i;
      const predictedAmount = result.predict(nextIndex)[1];
      const nextDate = new Date();
      nextDate.setDate(nextDate.getDate() + i);
      const formattedDate = nextDate.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });
      predictedData.push({
        date: formattedDate,
        amount: predictedAmount,
        color: colors[i - 1], // Assign a color from the colors array
      });
      points.push([nextIndex, predictedAmount]);
    }
    return predictedData;
  };
  const predictedData = linearRegression(data);
  const renderCustomizedLabel = ({ x, y, value }) => {
    return (
      <text x={x} y={y} dx={50} dy={15} fill="#000" textAnchor="middle" fontSize={16} fontWeight="bold">
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

  return (
    <div className="min-h-screen bg-base-200 pt-20">
      <PageTitle title="Home" />
      <div className="mt-10 flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Forecasted expenses for the next 7 days</h1>
        <BarChart width={900} height={450} data={predictedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={formatXAxisTick} fontSize={14} fontWeight="bold"/>
          <YAxis fontSize={12} fontWeight="bold"/>
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" label={renderCustomizedLabel}>
            {predictedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </div>
    </div>
  );
};

export default Home;