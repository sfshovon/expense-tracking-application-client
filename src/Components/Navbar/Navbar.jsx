import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import useChangeScroll from '../../CustomHook/useChangeScroll';
import logo from '../../assets/logo.png';
import CustomLink from '../CustomLInk/CustomLink';

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [zoom, setZoom] = useState(1);
  const navStyle = useChangeScroll();
  
  return (
    <nav className={`fixed w-full top-0 z-50 shadow-lg ${navStyle ? "bg-gray-100" : "bg-gray-200"}`}>
      <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-3 md:block">
            <div
              className="relative flex items-center justify-between gap-5"
              onMouseEnter={() => setZoom(1.5)}
              onMouseLeave={() => setZoom(1)}
            >
              <img src={logo} alt="logo" className="h-12 w-12" style={{ transform: `scale(${zoom})` }} />
              <h2 className="text-lg font-bold text-dark font-mono">Expense Tracker</h2>
            </div>     
            <div className="md:hidden">
              <button
                className="p-2 text-zinc-900 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setMenu(!menu)}
              >
                {
                  menu
                  ?  <AiOutlineClose className="text-zinc-900 h-6 w-6 flex justify-center items-center" />
                  : <AiOutlineMenu className="text-zinc-900 h-6 w-6 flex justify-center items-center" />
                }
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${menu ? "block" : "hidden"}`}> {/* Menu For Mobile Devices */}
            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li className="md:ml-4">
                <CustomLink to="/" className="no-underline font-bold md:mx-5 md:p-0 md:text-lg p-2"> 
                <span className="text-lg hover:animation-ease-in-out hover:text-xl"> Home </span> 
                </CustomLink>
              </li> 
              <li className="md:ml-4">
                <CustomLink to="/expenseRecord" className="no-underline font-bold md:mx-5 md:p-0 md:text-lg p-2"> 
                  <span className="text-lg hover:animation-ease-in-out hover:text-xl"> Expense Record </span> 
                </CustomLink>
              </li>
              <li className="md:ml-4">
                <CustomLink to="/expenseReport" className="no-underline font-bold md:mx-5 md:p-0 md:text-lg p-2"> 
                  <span className="text-lg hover:animation-ease-in-out hover:text-xl"> Expense Report </span> 
                </CustomLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;