import React, { useEffect, useState } from 'react';
import PageTitle from '../../Components/PageTitle/PageTitle';

const Home = () => {
  const [records,setRecords] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/expenseRecord');
        const data = await response.json();
        setRecords(data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [records]);
  
  return (
    <div>
      <PageTitle title="Home"/>
      <h1 className="mt-20 text-center text-dark">{records.length}</h1>

    </div>
  );
};
  
export default Home;