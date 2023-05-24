import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Accordion from '../../Components/Accordion/Accordion';
import Button from '../../Components/Button/Button';
import FromToDate from '../../Components/FromToDate/FromToDate';
import PageTitle from '../../Components/PageTitle/PageTitle';
import ReactPieChart from '../../Components/ReactPieChart/ReactPieChart';
import TotalExpense from '../../Components/TotalExpense/TotalExpense';
import useExpenseFunctions from '../../CustomHook/ExpenseFunctions';

const ExpenseReport = () => {
  const { rangeRecords, pieData, fromDate, setFromDate, toDate, setToDate, totalExpense, handleReportsByRange, handleExpenseDelete, handleUpdateExpense, isLoading } = useExpenseFunctions();

  return (
    <div className="bg-base-200 pt-32 px-20 pb-6 min-h-screen">
      <PageTitle title="View Report" />
      {isLoading ? (
        <div className="flex items-center justify-center mt-8">
          <div className="flex justify-center items-center gap-8">
            <h2 className="text-5xl text-red-700 font-bold">Loading</h2>
            <AiOutlineLoading3Quarters className="text-red-700 text-5xl font-bold animate-spin"/>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center">
            <div className="w-1/2">
              <div className="flex justify-center items-center gap-4">
                <h2 className="mt-6 text-center text-dark font-semibold">Expenditure Report: </h2>
                <FromToDate fromDate={fromDate} toDate={toDate} setFromDate={setFromDate} setToDate={setToDate} />
                <div className="mt-6">
                  <Button action="submit" onClick={handleReportsByRange}>Go</Button>
                </div>
              </div>
              <div className="">
                <Accordion
                  handleExpenseDelete={handleExpenseDelete}
                  handleUpdateExpense={handleUpdateExpense}
                  records={rangeRecords.sort((a, b) => {
                    const dateA = new Date(a?.date);
                    const dateB = new Date(b?.date);
                    return dateA - dateB;
                  })}
                />
                <TotalExpense totalExpense={totalExpense} />
              </div>
            </div>
            <div className="w-1/2">
              <ReactPieChart pieData={pieData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpenseReport;