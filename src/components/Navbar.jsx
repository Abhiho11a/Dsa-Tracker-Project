import React, { useEffect, useState } from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { BarChart3, MenuIcon, X } from 'lucide-react'
import GenRandomQue from './RandomQues'
import Progress from './Progress'

const Navbar = ({data,setData}) => {
  const [activePage,setActivePage] = useState(localStorage.getItem("ActivePage") || 'Home')
  const [openMenu,handleOpenMenu] = useState(false)
  const [showRandomQue,handleShowRandomque] = useState(false)
  const [showProgress,setShowProgress] = useState(false)
   
  useEffect(() => {
    localStorage.setItem("ActivePage",activePage)
  },[activePage])

  return (
    <nav className="fixed w-full z-100  bg-[#1E293B] text-white px-6 lg:px-10 py-5 flex items-center justify-between shadow-lg">
      
      <div className="flex items-center gap-2">
        <h1 className="font-bold text-2xl">DSA Tracker</h1>
      </div>

      <div className="hidden md:flex lg:flex items-center gap-6 transition-all duration-700 text-gray-300">
        <Link to='/' className={`${activePage === "Home"?'text-green-600 bg-gray-800':''} hover:text-green-600 px-4 py-1 rounded-xl`} onClick={() => setActivePage("Home")}>Home</Link>
        <Link to='/questions' className={`${activePage === "Questions"?'text-green-600 bg-gray-800':''} hover:text-green-600 px-4 py-1 rounded-xl`}  onClick={() => setActivePage("Questions")} >Questions</Link>
        <Link to='/revision-hub' className={`${activePage === "Revised"?'text-green-600 bg-gray-800':''} hover:text-green-600 px-4 py-1 rounded-xl`}  onClick={() => setActivePage("Revised")} >Revision Hub</Link>
      </div>

      <div className="flex items-center gap-4">
        <BarChart3 onClick={() => setShowProgress(prev => !prev)}  className='lg:block hover:scale-115 md:block cursor-pointer'/>
        <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded hidden lg:block md:block" 
        onClick={() => {
        handleShowRandomque(true)
        handleOpenMenu(false)
        }}>
          Random Q
        </button>

        <div className='block mr-2 lg:hidden md:hidden' >
          {openMenu?<X size={30} className="cursor-pointer hover:scale-115 transition-all" 
          onClick={() => {
            handleOpenMenu(false)
            handleShowRandomque(false)
          }}/>:<MenuIcon size={30} className="cursor-pointer hover:scale-115 transition-all" 
          onClick={() => {
            handleOpenMenu(true)
            handleShowRandomque(false)
            }}/>}

          {openMenu && 
          <div className='absolute top-15 left-0 w-full py-10 backdrop-blur-2xl text-lg shadow-md'>
            <div onClick={() => handleOpenMenu(false)} className='flex flex-col items-center text-neutral-600 gap-5 transition-colors duration-500'>
              <Link to='/' className={`w-[80%] text-center p-2 border-neutral-300 border-2 ${activePage === "Home"?'bg-gray-300':''} hover:bg-gray-300`} onClick={() => (setActivePage("Home")) }>Home</Link>
              <Link to='/questions' className={`w-[80%] text-center p-2 border-neutral-300 border-2 ${activePage === "Questions"?'bg-gray-300':''} hover:bg-gray-300`}  onClick={() => setActivePage("Questions")} >Questions</Link>
              <Link to='/revision-hub' className={`w-[80%] text-center p-2 border-neutral-300 border-2 ${activePage === "Revised"?'bg-gray-300':''} hover:bg-gray-300`}  onClick={() => setActivePage("Revised")} >Revision Hub</Link>
              <button className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded" 
                onClick={() => {
                handleShowRandomque(true)
                handleOpenMenu(false)
                }}>
                  Random Q
              </button>
            </div>
          </div>}
        </div>
          {showRandomQue && <GenRandomQue data={data} setData={setData} closeRandomQue={() => handleShowRandomque(false)}/>}
          {showProgress && <Progress closeProgressChart={() => setShowProgress(false)}/>}
      </div>
    </nav>
  )
}

export default Navbar