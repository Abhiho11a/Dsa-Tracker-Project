import React, { useState } from 'react'
import '../App.css'
import { X } from 'lucide-react'

const Progress = ({closeProgressChart}) => {

    const [data,setData] = useState(JSON.parse(localStorage.getItem('dataObj')) || [])
    const[uniqueTopic,setUniqueTopic] = useState([...new Set(data.map(it => it.topic))])

    function getPercentage(topic){
      const count = data.filter(it => it.topic.toLowerCase() === topic.toLowerCase()).length; //Total number of ques of particular topic
      const easy = ((data.filter( it => ((it.topic.toLowerCase() === topic.toLowerCase() && it.difficulty.toLowerCase() ==="easy"))).length))
      const medium = ((data.filter( it => ((it.topic.toLowerCase() === topic.toLowerCase() && it.difficulty.toLowerCase() ==="medium"))).length))
      const hard = ((data.filter( it => ((it.topic.toLowerCase() === topic.toLowerCase() && it.difficulty.toLowerCase() ==="hard"))).length))
      const revisedcount = ((data.filter( it => ((it.topic.toLowerCase() === topic.toLowerCase() && it.revised[0] !== 0))).length))
      
      const perc = ((count/data.length)*100).toFixed(1)
      //console.log((perc,"e",easy,"m",medium,"h",hard))
      return {count,perc,easy,medium,hard,revisedcount};
    }
    
  return (
    <div className='absolute top-18 w-full left-0 backdrop-blur-xl z-1000'>
        <div className="flex flex-col bg-gray-300 justify-self-center text-neutral-700 w-100 gap-5 px-10 py-5">
          <div className="flex justify-between items-center">
            <h2 className='mx-auto text-center text-3xl'>Progress</h2>
            <X className='hover:scale-115 cursor-pointer transition-all' onClick={() => closeProgressChart()}/>
          </div> 
          {data.length === 0?<h2 className='mx-auto text-center'>Add Questions to view data.</h2>:
            <>
              <div className='flex flex-col gap-3 overflow-y-scroll hide-scrollbar h-132 lg:h-114 scrollbar-hide'>
                { uniqueTopic.map(it => {
                  const {count,perc,easy,medium,hard,revisedcount} = getPercentage(it)
                  return(
                    <div className='flex flex-col gap-1'>
                        <div className="flex w-full justify-between">
                          <h2 className='first-letter:capitalize font-semibold text-xl'>{it}</h2>
                          <h2>{perc}%</h2>
                        </div>
                        <div className="flex text-sm font-semibold">Easy:{easy} Medium:{medium} Hard:{hard} <br />Revised:{revisedcount}/{count}</div>
                        <div className='w-full h-4 bg-white'>
                          <div style={{width:`${perc}%`}} className={` h-4 bg-green-500`}></div>
                        </div>
                    </div>
                  )})}
              </div>
            </>
          }
          {data.length !== 0 && <div className='mx-auto text-center'>Questions solved per day:</div>}
        </div>
    </div>
  )
}

export default Progress