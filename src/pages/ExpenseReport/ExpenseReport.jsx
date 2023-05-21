import React, { useEffect, useState } from 'react';
import Accordion from '../../Components/Accordion/Accordion';
import PageTitle from '../../Components/PageTitle/PageTitle';

const ExpenseReport = () => {
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
    <div className="min-h-screen bg-gray-50 pt-12">
      <PageTitle title="About"/>
       <h1 className="mt-20 text-center text-dark">{records.length}</h1>
       <Accordion records={records} />
    </div>
  );
};

export default ExpenseReport;