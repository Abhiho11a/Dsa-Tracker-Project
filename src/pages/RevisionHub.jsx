import { CalendarCheck, Eye} from 'lucide-react'
import React, { useState } from 'react'
import '../App.css'
import Notif from '../components/Notification'

const Revised = () => {

  const [data,setData] = useState(() => (JSON.parse(localStorage.getItem('dataObj')) || []))
  const [notificationMsg,setNotificaionMsg] = useState('')

  const revisionPending = data.filter(obj => obj.revised[0] === 0)
  const revisionDone = data.filter(obj => obj.revised[0] !== 0)
  console.log(revisionPending)

  const groupedByDifficulty = revisionPending.reduce((acc, item) => {
    const difficulty = item.difficulty.toLowerCase(); // normalize

  if (!acc[difficulty]) {
    acc[difficulty] = [];
  }
  acc[difficulty].push(item);
  return acc;
}, {});

// console.log(groupedByDifficulty)

  function handleDone(questionId){
    const updatedData = data.map(obj => obj.id === questionId ? {...obj,revised:[1,new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:"numeric"})]}:obj)
    setData(updatedData)

    localStorage.setItem('dataObj',JSON.stringify(updatedData))
  }

  function countLastRevisedDays(date){
    const dateArray = date.split('/')
    const currDateArray = new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:"numeric"}).split('/')

    if(currDateArray[1] - dateArray[1] === 0 && currDateArray[2] - dateArray[2] === 0)
      return `${currDateArray[0]-dateArray[0]?`${currDateArray[0]-dateArray[0]} days ago`:"today"}`
    else if(currDateArray[1] - dateArray[1] !== 0 && currDateArray[2] - dateArray[2] === 0)
      return `${`${(31 - dateArray[0] + Number(currDateArray[0]))} days ago`}`
  }

  function updateRevisedDate(obj){
    const updatedData = data.map(it => it.id === obj.id?{...it,revised:[it.revised[0]+1,new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:"numeric"})]}:it)

    setData(updatedData)
    setNotificaionMsg("✅ Updated Revised Date.")
    setTimeout(() => {
    setNotificaionMsg('')
  },2000)
    localStorage.setItem('dataObj',JSON.stringify(updatedData))
  }

  return (
    <div className='flex flex-col justify-self-center mb-10 sm:mb-1 py-15 px-2'>

      {data.length === 0?<h2 className='text-center'>Add Questions to view data.</h2>:
      <>
      {revisionPending.length !== 0 ? (
        <fieldset className="border border-gray-400 rounded-2xl shadow-sm p-4 sm:p-6 bg-white max-w-5xl mx-auto mt-10">
          <legend className="text-xl sm:text-2xl font-bold text-gray-800 px-3 text-center sm:text-left">
            Revision Pending
            </legend>
            
            {/* Questions */}
            <div className="flex flex-col">
              {Object.entries(groupedByDifficulty).map(([diff, diffData], diffIndex) => (
                <div key={diff} className="mt-4">
                  {diffIndex !== 0 && <hr className="border-t-4 border-gray-300 my-3" />}
                  <h3 className={`text-lg sm:text-base font-bold mb-3 text-left sm:px-4 
                  ${ diff === "easy" ? "text-green-600" : diff === "medium" ? "text-yellow-600" : "text-red-600" }`}>
                    {diff === "easy" ? "🟢 Easy" : diff === "medium" ? "🟡 Medium" : "🔴 Hard"}
                  </h3>

                  {diffData.map((it, ind) => (
                    <div key={it.que} className="px-2 ">
                      <div className="grid grid-cols-3 items-center gap-3 sm:gap-6 py-3 px-2 hover:bg-gray-50 transition-all duration-200">
                        {/* Question Name */}
                        <h2 className={`font-semibold text-md sm:text-sm md:text-base truncate text-left text-gray-800`}>
                          {ind + 1}. {it.que}
                        </h2>

                        {/* Date */}
                        <p className="text-[13px] sm:text-sm text-gray-600 text-center -ml-[10px]">
                          {it.date}
                        </p>

                        {/* Actions */}
                        <div className="flex justify-center items-center sm:gap-4">
                          <a
                            href={it.links}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center text-sm gap-1 px-3 py-1 rounded-md hover:bg-gray-100 text-blue-500 transition"
                            title="View Question">
                              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                              <span className="hidden sm:inline">View</span>
                          </a>
                          <button
                            className="px-3 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white cursor-pointer text-sm transition-all"
                            title="Mark as Revised"
                            onClick={() => handleDone(it.id)}>
                            Done
                          </button>
                        </div>
                      </div>

                      {/* Thin separator between questions */}
                      {ind !== diffData.length - 1 && (
                        <hr className="border-t border-gray-200" />
                      )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </fieldset>) : (
              <h2 className="text-center mt-6 text-gray-600 font-medium">
                You don't have any pending revision questions.
              </h2>)}

      {revisionDone.length !== 0 ? (
        <fieldset className="border border-gray-400 rounded-2xl shadow-sm p-4 sm:p-6 bg-white max-w-5xl mx-auto mt-10">
          <legend className="text-xl sm:text-2xl font-bold text-gray-800 px-3 text-center sm:text-left">
            Revision Done
          </legend>

          {/* Header Row */}
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 px-2 sm:px-4 py-2 border-b border-gray-300 text-gray-700 font-semibold text-md sm:text-sm md:text-base">
            <span className="text-left">Question</span>
            <span className="text-center">Revised</span>
            <span className="hidden md:block text-center">Difficulty</span>
            <span className="text-center">Update</span>
          </div>

          {/* Questions */}
          <div className="flex flex-col divide-y divide-gray-200">
            {revisionDone.map((it, ind) => (
              <div
                key={it.que}
                className="grid grid-cols-3 md:grid-cols-4 items-center gap-5 sm:gap-9 px-2 sm:px-4 py-3 hover:bg-gray-50 transition-all duration-200 ">

                  {/* Question Name */}
                  <h2
                  className={`font-semibold text-sm sm:text-sm md:text-base truncate text-left
                    ${ it.difficulty === "Easy" ? "text-green-600 md:text-gray-800" : 
                       it.difficulty === "Medium" ? "text-yellow-600 md:text-gray-800" : 
                       "text-red-600 md:text-gray-800"}`}>{ind + 1}. {it.que} </h2>


                  {/* Last Revised */}
                  <p className="text-[13px]  sm:text-sm text-gray-600 text-center sm:text-center">
                    {countLastRevisedDays(it.revised[1])}
                  </p>

                  {/* Difficulty (Desktop only) */}
                  <span
                    className={`hidden md:inline-block px-3 py-1 rounded-full text-xs font-semibold text-center w-fit mx-auto
                      ${ it.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : it.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"}`}>{it.difficulty}</span>

                  {/* Update Button */}
                  <div className="flex justify-center">
                    <button
                      title="Update Last Revised Date"
                      onClick={() => updateRevisedDate(it)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center">
                        <CalendarCheck size={18} className="text-gray-700" />
                    </button>
                  </div>
              </div>
            ))}
          </div>
        </fieldset>) : (
          <h2 className="text-center mt-6 text-gray-600 font-medium">You haven’t revised any question yet.</h2>)}
          </>}

          {notificationMsg && <Notif msg={notificationMsg}/>}
    </div>
  )
}

export default Revised