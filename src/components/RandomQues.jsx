import { X } from 'lucide-react'
import React, { useState } from 'react'

const GenRandomQue = ({closeRandomQue}) => {

    const [data,setData] = useState(JSON.parse(localStorage.getItem("dataObj")) || [])
    const [topic,setTopic] = useState('')
    const [diffi,setDiffi] = useState('')
    const [isQueGenerated,setIsQueGenerated] = useState(false)
    const [generatedQue,setGeneratedQue] = useState('')

    const topics = ["arrays","strings","linked lists"]

    function generateQuestion(){
        if(topic === "" || diffi === "")
        {
            alert(`Please select ${topic === ""?"topic":""} ${diffi === ""?"difficulty":''}`)
            return
        }
        const filtered = data.filter(it => it.difficulty.toLowerCase() === diffi.toLowerCase() && it.topic.includes(topic.toLowerCase()) );
        if (filtered.length === 0) {
            alert("No question matches this filter!");
            return;
        }
        else
        {
            const randomIndex = Math.floor(Math.random() * filtered.length);
            setGeneratedQue(filtered[randomIndex]);
        }
        
        setIsQueGenerated(true)
        setTopic('')
        setDiffi('')
    }

    function updateRevisedate(que){
        const updatedData = data.map(queObj => queObj.id === que.id?{...queObj,revised:[queObj.revised[0]+1,new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:"numeric"})]}:queObj)
        setData(updatedData)
        localStorage.setItem('dataObj',JSON.stringify(updatedData))
        closeRandomQue()
    }

  return (
    <section className='absolute top-18 left-0 backdrop-blur-md bg-black/40 w-full h-[82vh]'>
        <div className="flex flex-col gap-5 justify-self-center items-center-safe bg-gray-200 mt-25 w-80 lg:w-100 rounded-md text-black p-10">
            <div className="flex justify-between items-center w-full">
                <h2 className='w-full text-center text-2xl  lg:text-3xl md:text-2xl'>Random Question</h2>
                <X size={30} className='cursor-pointer hover:scale-120' onClick={closeRandomQue}/>
            </div>
            <div className="flex gap-5 py-5 justify-between flex-col lg:flex-row">
                <select className='border-2 p-1 border-neutral-400 outline-none hover:border-purple-400 rounded-sm' value={topic} onChange={(e) => setTopic(e.target.value)} title='Select Difficulty level to generate question...'>
                    <option value="" selected hidden>Select Topic</option>
                    {topics.map(it => (
                        <option value={it}>{it}</option>
                    ))}
                </select>
                <select className='border-2 p-1 border-neutral-400 outline-none hover:border-purple-400 rounded-sm' value={diffi} onChange={(e) => setDiffi(e.target.value)} title='Select Topic generate question...'>
                    <option value="" selected hidden>Select Difficulty level</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            {isQueGenerated && 
            <div className='flex flex-col items-center'>
                <h2>{generatedQue.que}</h2>
                <div className="flex gap-5">
                    <button className='rounded-md bg-red-600 text-white cursor-pointer px-2 py-1 text-sm' onClick={closeRandomQue}>Not Done</button>
                    <button onClick={() => updateRevisedate(generatedQue)} className='rounded-md bg-green-600 text-white cursor-pointer px-2 py-1 text-sm' title='Clicking this will updated last revised date to Today!'>Done</button>
                </div>
            </div>
            }
            <div className='flex justify-between w-full'>
                <button className='bg-red-500 p-2 text-white rounded-md hover:bg-red-800 cursor-pointer' onClick={closeRandomQue}>Cancel</button>
                <button  className={`bg-green-500 p-2 text-white rounded-md hover:bg-green-800 ${isQueGenerated?"cursor-no-drop":"cursor-pointer"} ${isQueGenerated?"bg-green-800":""}`} onClick={() => generateQuestion()}>Generate</button>
            </div>
        </div>
    </section>
  )
}

export default GenRandomQue