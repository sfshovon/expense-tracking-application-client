import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Accordion from '../../Components/Accordion/Accordion';
import FromToDate from '../../Components/FromToDate/FromToDate';
import PageTitle from '../../Components/PageTitle/PageTitle';
import TotalExpense from '../../Components/TotalExpense/TotalExpense';

const ExpenseReport = () => {
  const [records,setRecords] = useState([]);
  const [rangeRecords,setRangeRecords] = useState([]);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [totalExpense, setTotalExpense] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/expenseRecord');
        const data = await response.json();
        setRecords(data);
        setRangeRecords(data);
        getTotalExpense(data);
      } 
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleReportsByRange = () => {
    let recordsByRange = [];
    records.map(record => {
      const recordDate = new Date(record.date);
      recordDate.setHours(0, 0, 0, 0);
      if (recordDate >= fromDate.setHours(0, 0, 0, 0) && recordDate <= toDate.setHours(0, 0, 0, 0)) {
        recordsByRange.push(record);
      }
    })
    getTotalExpense(recordsByRange);
    setRangeRecords(recordsByRange);
  }

  const getTotalExpense = (records) => {
    const totalDailyAmount = records.reduce((subTotal, record) => subTotal + record?.amount, 0);
    setTotalExpense(totalDailyAmount);
  }

  const handleExpenseDelete = id => {
    const proceed = window.confirm("Are you sure you want to delete this record?");
    if(proceed){
      const url = `http://localhost:5000/expenseRecord/${id}`;
      fetch(url, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        const remainingRecords = records.filter(record => record._id !== id)
        setRecords(remainingRecords);
        setRangeRecords(remainingRecords); 
      })
      alert('Record Deleted Successfully!!!');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-12">
      <PageTitle title="Expense Report"/>
      <div className="mt-20 flex justify-center items-center gap-4">
        <h2 className="mt-6 text-center text-dark font-semibold">Expenditure Report: </h2>
        <FromToDate fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate}/>
        <div>
          <button className="mt-6 btn btn-success p-4" onClick={handleReportsByRange}>Go</button>
        </div>
      </div>
      <Accordion handleExpenseDelete={handleExpenseDelete} records={rangeRecords.sort((a, b) => {
          const dateA = new Date(a?.date);
          const dateB = new Date(b?.date);
          return dateA - dateB;
        })}
      />
      <TotalExpense totalExpense={totalExpense}/>
    </div>
  );
};

export default ExpenseReport;