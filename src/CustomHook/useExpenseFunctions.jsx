import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useExpenseFunctions = () => {
  const { register, setValue, handleSubmit, control, formState: { errors }, reset } = useForm({
    mode: 'onBlur', 
  });
  const [addFormData, setAddFormData] = useState(null);
  const [records,setRecords] = useState([]);
  const [forecastData,setForecastData] = useState([]);
  const [rangeRecords,setRangeRecords] = useState([]);
  const [pieData,setPieData] = useState([]);
  const [fromDate,setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState(new Date());
  const [totalExpense,setTotalExpense] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch('https://expense-tracking-application-server.vercel.app/expenseRecord');
        const data = await response.json();
        setRecords(data);
        setRangeRecords(data);
        getTotalExpense(data);
        createPieList(data);
        setIsLoading(false);
      } 
      catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        const response = await fetch('https://expense-tracking-application-server.vercel.app/forecastRecord');
        const data = await response.json();
        setForecastData(data);
        setIsLoading(false);
      } 
      catch (error) {
        console.error('Error fetching data: ', error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onFormSubmit = async (data) => {
    const { title, amount, categories, date, notes } = data;
    const records = { title, amount, categories, date, notes };
    try {
      const response = await fetch('https://expense-tracking-application-server.vercel.app/expenseRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(records),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const responseData = await response.json();
      handleClear();
      setAddFormData(responseData);
      toast("Record Has Been Added", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true,
      });
    } catch (error) {
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
      const url = `https://expense-tracking-application-server.vercel.app/expenseRecord/${id}`;
      fetch(url, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        const remainingRecords = records.filter(record => record?._id !== id)
        setRecords(remainingRecords);
        setRangeRecords(remainingRecords); 
        getTotalExpense(remainingRecords);
        toast("Record Has Been Deleted", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000, 
          hideProgressBar: false, 
          closeOnClick: true, 
          pauseOnHover: true, 
          draggable: true,
        });
      })
      alert('Record Deleted Successfully!!!');
    }
  }

  const handleUpdateExpense = (id, data) => {
    const { title, amount, categories, notes } = data;
    const updatedRecord = { title, amount, categories, notes };
    const url = `https://expense-tracking-application-server.vercel.app/expenseRecord/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(updatedRecord)
    })
    .then(res => res.json())
    .then(() => {
      const updatedRecords = records.map(record => {
        if (record?._id === id) {
          return { ...record, ...updatedRecord };
        }
        return record;
      });
      setRecords(updatedRecords);
      setRangeRecords(updatedRecords);
      getTotalExpense(updatedRecords);
      createPieList(updatedRecords);
      toast("Record Has Been Updated", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, 
        hideProgressBar: false, 
        closeOnClick: true, 
        pauseOnHover: true, 
        draggable: true,
      });
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
    const totalDailyAmount = records.reduce((subTotal, record) => subTotal + parseFloat(record?.amount), 0);
    setTotalExpense(totalDailyAmount);
  }

  const createPieList = (recordList) => {
    let categoryList= []
    recordList?.map((record) => {
      const existingCategory = categoryList.find((item) => item?.title === record?.categories?.label);
      if (existingCategory) {
        existingCategory.amount += parseFloat(record.amount);
      } 
      else {
        categoryList.push({ title: record?.categories?.label, amount: parseFloat(record?.amount) })
      }
    });
    setPieData(categoryList);
  }
  
  return { 
    register, setValue, handleSubmit, control, errors , reset,
    addFormData, setAddFormData, records, setRecords, forecastData, setForecastData,rangeRecords, setRangeRecords, pieData, setPieData, fromDate, setFromDate, toDate, setToDate, totalExpense, setTotalExpense, isLoading, setIsLoading, handleReportsByRange, getTotalExpense, onFormSubmit, handleExpenseDelete, handleUpdateExpense, handleClear, createPieList
  }
};

export default useExpenseFunctions ;