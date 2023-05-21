import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar/Navbar"
import ExpenseRecord from "./pages/ExpenseRecord/expenseRecord"
import ExpenseReport from "./pages/ExpenseReport/ExpenseReport"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound/NotFound"

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/expenseReport" element={<ExpenseReport/>} ></Route>
        <Route path="/expenseRecord" element={<ExpenseRecord/>} ></Route>
        <Route path="*" element={<NotFound/>} ></Route>
      </Routes>
    </>
  )
}

export default App
