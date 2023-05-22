import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const useExpenseFunctions = () => {
  const { register, setValue, handleSubmit, control, formState: { errors }, reset } = useForm({
    mode: 'onBlur', 
  });
  const [addFormData, setAddFormData] = useState(null);
  const [records,setRecords] = useState([]);
  const [rangeRecords,setRangeRecords] = useState([]);
  const [pieData,setPieData] = useState([]);
  const [fromDate,setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState(new Date());
  const [totalExpense,setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/expenseRecord');
        const data = await response.json();
        setRecords(data);
        setRangeRecords(data);
        getTotalExpense(data);
        createPieList(data);
      } 
      catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

  const onExpenseAddFormSubmit = async (data) => {
    const { title, amount, categories, date, notes } = data;
    const records = { title, amount, categories, date, notes };
    try {
      const response = await fetch('http://localhost:5000/expenseRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(records),
      });
      const responseData = await response.json();
      alert('Record Added Successfully!!!');
      handleClear();
      setAddFormData(data);
    } 
    catch (error) {
      console.error('Error adding record:', error);
    }
  };

  const handleClear = () => {
    reset(); 
    setValue('categories', null); 
  };
  
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

  const handleUpdateExpense = (id, data) => {
    const { title, amount, categories, notes } = data;
    const updatedRecord = { title, amount, categories, notes };
    const url = `http://localhost:5000/expenseRecord/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedRecord)
    })
    .then(res => res.json())
    .then(() => {
      alert('Report Updated Successfully!!!');
      const updatedRecords = records.map(record => {
        if (record._id === id) {
          return { ...record, ...updatedRecord };
        }
        return record;
      });
      setRecords(updatedRecords);
      setRangeRecords(updatedRecords);
      getTotalExpense(updatedRecords);
      createPieList(updatedRecords);
    });
  };

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
    createPieList(recordsByRange);
  }

  const getTotalExpense = (records) => {
    const totalDailyAmount = records.reduce((subTotal, record) => subTotal + parseInt(record?.amount), 0);
    setTotalExpense(totalDailyAmount);
  }

  const createPieList = (recordList) => {
    let categoryList= []
    recordList?.map((record) => {
      const existingCategory = categoryList.find((item) => item.title === record.categories.label);
      if (existingCategory) {
        existingCategory.amount += parseInt(record.amount);
      } 
      else {
        categoryList.push({ title: record.categories.label, amount: parseInt(record.amount) })
      }
    });
    setPieData(categoryList);
  }
  
  return { 
    register, setValue, handleSubmit, control, errors , reset,
    addFormData, setAddFormData, records, setRecords, rangeRecords, setRangeRecords, pieData, setPieData, fromDate,setFromDate, toDate, setToDate, totalExpense, setTotalExpense, handleReportsByRange, getTotalExpense, onExpenseAddFormSubmit, handleExpenseDelete, handleUpdateExpense, handleClear, createPieList
  }
};

export default useExpenseFunctions ;