import { Route, Routes } from "react-router"
import Navbar from "./Components/Navbar/Navbar"
import About from "./pages/About/About"
import ExpenseRecord from "./pages/ExpenseRecord/expenseRecord"
import Home from "./pages/Home/Home"
import NotFound from "./pages/NotFound/NotFound"

function App() {
  
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/about" element={<About/>} ></Route>
        <Route path="/expenseRecord" element={<ExpenseRecord/>} ></Route>
        <Route path="*" element={<NotFound/>} ></Route>
      </Routes>
    </>
  )
}

export default App
