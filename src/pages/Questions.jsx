import { Code, Trash2, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import '../App.css'
import Notif from '../components/Notification'

const Questions = () => {
  const [data,setData] = useState(() => JSON.parse(localStorage.getItem("dataObj")) || [])
  const [displayData,setDisplayData] = useState(data)
  const [showNote,setShowNote] = useState([false,null])
  const [searchval,setSearchVal] = useState('')
  const [filterval,setFilterVal] = useState("All")
  const [notiMsg,setNotiMsg] = useState('')
  

  function handleFilters(value){
  setSearchVal(value)

  const searchedData = data.filter(it => it.que.toLowerCase().includes(value.toLowerCase()))
  setDisplayData(searchedData)
  }


  useEffect(() => {
    if(filterval === "All")
      setDisplayData(data)
    else
      setDisplayData(data.filter(it => it.difficulty === filterval))
  },[filterval,data])

  useEffect(() =>{
    if(searchval === "")
    {
      const updatedData = data
      setDisplayData(updatedData)
    }
  },[searchval,data])


  function deleteQue(dltQue){
    const updatedData = data.filter(obj => obj.id !== dltQue.id)
    setData(updatedData)
    setNotiMsg("❌Question Deleted Successfully")
    setTimeout(() => {
      setNotiMsg('')
    },2000)
    localStorage.setItem('dataObj',JSON.stringify(updatedData))
  }


  function getPlatform(questionLink){
    if(questionLink.includes("leetcode"))
      return "Leetcode"
    else if(questionLink.includes("geeksforgeeks"))
      return "Geeks For Geeks"
    else if(questionLink.includes("hackerrank"))
      return "HackerRank"
    else if(questionLink.includes("codeforces"))
      return "CodeForces"
    else if(questionLink.includes("hackerearth"))
      return "HackerEarth"
    else if(questionLink.includes("codechef"))
      return "CodeChef"
    else
      return "Unknown"
  }

  return (
    <div className='flex flex-col justify-self-center gap-5 py-23 mb-10'>
      <div className="flex border-2 border-neutral-300 justify-between px-3 py-1 rounded-md items-center md:w-140">
        <input type="text" className='border-none outline-none' value={searchval} onChange={(e) => handleFilters(e.target.value)} placeholder='Search question...'/>
        <X size={20} className='cursor-pointer hover:bg-gray-300 rounded-sm' onClick={() => setSearchVal('')}/>
      </div>

      <div className="flex gap-5 px-1 text-sm">
        <button onClick={() => setFilterVal("All")} className={`bg-gray-100 rounded-md border-2 hover:scale-105 px-3 py-1 cursor-pointer transition-all duration-200 border-neutral-400 ${filterval === "All"?"bg-purple-100 border-purple-300 scale-110":""}`}>All</button>
        <button onClick={() => setFilterVal("Easy")} className={`bg-gray-100 rounded-md border-2 hover:scale-105 px-3 py-1 cursor-pointer transition-all duration-200 border-neutral-400 ${filterval === "Easy"?"bg-purple-100 border-purple-300 scale-110":""}`}>Easy</button>
        <button onClick={() => setFilterVal("Medium")} className={`bg-gray-100 rounded-md border-2 hover:scale-105 px-3 py-1 cursor-pointer transition-all duration-200 border-neutral-400 ${filterval === "Medium"?"bg-purple-100 border-purple-300 scale-110":""}`}>Medium</button>
        <button onClick={() => setFilterVal("Hard")} className={`bg-gray-100 rounded-md border-2 hover:scale-105 px-3 py-1 cursor-pointer transition-all duration-200 border-neutral-400 ${filterval === "Hard"?"bg-purple-100 border-purple-300 scale-120":""}`}>Hard</button>
      </div>

      <div className="flex flex-col gap-5">
        {displayData.length === 0?
        <h2 className='text-center text-lg lg:text-2xl'>Question Not Found!!</h2>:
        displayData.map((queObj,idx) => (
          <div
          key={queObj.id}
          onMouseLeave={() => setShowNote([false, null])}
          className={`relative shadow-md hover:shadow-lg border border-gray-200 border-l-3  ${queObj.difficulty === "Easy"?"border-l-green-500":queObj.difficulty === "Medium"?"border-l-yellow-500":"border-l-red-500"} rounded-xl py-4 px-8 transition-all bg-white group hover:scale-[1.02] w-full max-w-[600px] mx-auto`}>

            {/* Question title */}
            <div className="flex justify-between items-start mb-2">
              <p
                className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                  queObj.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : queObj.difficulty === "Hard"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>{queObj.difficulty}</p>

              <Trash2
                size={22}
                onClick={() => deleteQue(queObj)}
                className="text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer 
                          opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300"
                title="Delete Question"/>
            </div>

            <h2 className="flex font-bold text-md mb-1 wrap-break-words max-w-60">
              {idx + 1}.<p className='first-letter:capitalize font-medium'>{queObj.que}</p>
            </h2>

            {/* SOlved date + Platform */}
            <div className="text-xs sm:text-sm text-gray-700 mb-2 flex flex-wrap gap-10 md:gap-12">
              <p>🗓️ Solved: {queObj.date}</p>
              <div className='flex items-center gap-1'>
                <Code size={16} color='black'/> 
                <p>Platform: {getPlatform(queObj.links)}</p>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4 text-sm sm:text-base font-medium flex-wrap">
              <a
                href={queObj.links}
                className="text-blue-700 hover:underline"
                title={`redirect to ${getPlatform(queObj.links)}`}>
                🔗 Practice</a>
              <h2
                title="View Additional Note"
                className="cursor-pointer text-gray-800 hover:text-blue-600"
                onClick={() =>
                  setShowNote([!showNote[0], showNote[0] ? null : idx])
                }
              >{showNote[1] === idx ? "Hide Note" : "View Note"}</h2>
            </div>

            {/* Notes Section */}
            {showNote[1] === idx && (
              <div className=" mt-3 border-t border-gray-200 pt-2 text-sm wrap-break-words overflow-hidden">

                {/* 🏷️ Topic tags */}
                <div className='flex gap-2'>
                  <h3 className="font-semibold text-[#00A2FF] mb-1">Topics:</h3>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {queObj.topic?.split(" ").filter(topic => topic.trim() !== "").map((topic, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium ${topic === " "?"hidden":""}`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                <p className="text-gray-600 leading-relaxed 
                whitespace-pre-wrap wrap-break-words break-all overflow-hidden w-full max-w-65">
                  {queObj.note ? queObj.note : "Note Not Found."}</p>

              </div>)}
          </div>
        ))}
      </div>
      {notiMsg && <Notif msg={notiMsg}/>}
    </div>
  )
}

export default Questions