import React from 'react';
import { ToastContainer } from 'react-toastify';
import Accordion from '../../Components/Accordion/Accordion';
import Button from '../../Components/Button/Button';
import FromToDate from '../../Components/FromToDate/FromToDate';
import Loader from '../../Components/Loader/Loader';
import PageTitle from '../../Components/PageTitle/PageTitle';
import ReactPieChart from '../../Components/ReactPieChart/ReactPieChart';
import TotalExpense from '../../Components/TotalExpense/TotalExpense';
import useExpenseFunctions from '../../CustomHook/useExpenseFunctions';

const ExpenseReport = () => {
  const { rangeRecords, pieData, fromDate, setFromDate, toDate, setToDate, totalExpense, handleReportsByRange, handleExpenseDelete, handleUpdateExpense, isLoading } = useExpenseFunctions();

  return (
    <div className="bg-base-200 pt-24 lg:px-20 pb-6 min-h-screen">
      <div >
        <PageTitle title="View Report" />
      </div>
      { 
        isLoading ? (
          <Loader/>
        ) : (
          <div>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 px-6">
              <h2 className="mt-6 text-center text-dark font-semibold">Expenditure Report: </h2>
              <FromToDate fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
              <div className="mt-6">
                <Button action="submit" onClick={handleReportsByRange}>Go</Button>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-start">
              <div className="order-2 w-full lg:w-1/2">
                <div className="px-6">
                  <Accordion
                    handleExpenseDelete={handleExpenseDelete}
                    handleUpdateExpense={handleUpdateExpense}
                    records={rangeRecords.sort((a, b) => 
                      new Date(a?.date) - new Date(b?.date))}
                  />
                  <TotalExpense totalExpense={totalExpense} />
                </div>
              </div>
              <div className="order-1 lg:order-2 w-full lg:w-1/2 lg:mt-4">
                <ReactPieChart pieData={pieData} />
              </div>
            </div>
          </div>
        )
      }
    <ToastContainer/>
    </div>
  );
}

export default ExpenseReport;