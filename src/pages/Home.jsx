import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import Form from '../components/Form'
import Notification from '../components/Notification'
import '../App.css'
import { PlusIcon, Trash2Icon } from 'lucide-react'

const Home = () => {
  const [data,setData] = useState(JSON.parse(localStorage.getItem("dataObj")) || [])
  const [showform,setShowForm] = useState(false)

  const [Que,setQue] = useState('')
  const [Link,setLink] = useState('')
  const [Topic,setTopic] = useState('')
  const [Difficulty,setDifficulty] = useState('')
  const [Note,setNote] = useState('')
  const [date,setDate] = useState('')
  const [notiMsg,setNotiMsg] = useState('')
    

  function AddNewTask(){
    let queAlreadyExist = data.some(it => it.que.toLowerCase() === Que.toLowerCase())

    if(queAlreadyExist)
      setNotiMsg("⚠️ This question is already in your tracker.")
    else
    {
      const ques = Que
      const link = Link
      const topic = Topic
      const difficulty = Difficulty
      const note = Note
      const currentDate = date?date:new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:"numeric"})
      
      if(ques && link && topic && difficulty)
      {
        date?setNotiMsg(`✅Question Added to Date ${date} Successfully`):setNotiMsg("✅Question Added Successfully")
        const newDataObj = {id:uuidv4(),que:ques,links:link,date:currentDate,topic:topic,difficulty:difficulty,note:note,revised:[0,new Date().toLocaleDateString([],{day:'2-digit',month:'2-digit',year:"numeric"})]}
        const updatedData = [...data,newDataObj]
        localStorage.setItem('dataObj',JSON.stringify(updatedData))
        setData(updatedData)
      }
      else{
        alert("Please fill all the details.")
        return
      }
    }
      
    // console.log(data,uuidv4())
    setTimeout(()=>{  
        setNotiMsg("")
      },2000)

    setQue('')
    setLink('')
    setTopic('')
    setDifficulty('')
    setNote('')
    setDate('')
    setShowForm(false)
  }

  function sortByDate(sortProp) {
    if(sortProp === "")
      return
    else{
    // console.log(sortProp)
    const parseDate = (str) => {
    const parts = str.split('/');
    let [day, month, year] = parts.map(Number);
    if (year < 100) year += 2000;
    return new Date(year, month - 1, day);
  }

  const sortedData = sortProp === "O-N"?
  [...data].sort((a, b) => parseDate(a.date) - parseDate(b.date)):
  [...data].sort((a, b) => parseDate(b.date) - parseDate(a.date));
  setData(sortedData);
  }};

  function deleteQue(delId){
    setNotiMsg("❌Question Deleted Successfully")
    setTimeout(() => {
      setNotiMsg('')
    },2000)
    const newData = data.filter(it => it.id!== delId)
    localStorage.setItem('dataObj',JSON.stringify(newData))
    setData(newData)
  }

  const groupedByDate = data.reduce((acc, question) => {
    const date =question.date;
    
    // if date not already in the object, create an empty array
    if (!acc[date]) {
      acc[date] = [];
    }
    
    // push the current question into the array of that date
    acc[date].push(question);
    
    return acc; // return the updated object for next iteration
  }, {});

  function addQueToDate(date){
    setShowForm(true)
    setDate(date)
  }

  return (
    <div className='flex justify-self-center flex-col w-full'>
        { showform && 
        <Form 
            Que={Que} 
            setQue={setQue} 
            Link={Link} 
            setLink={setLink} 
            Topic={Topic} 
            setTopic={setTopic} 
            Difficulty={Difficulty} 
            setDifficulty={setDifficulty}
            Note={Note}
            setNote={setNote}
            hideForm={() => setShowForm(false)}
            AddNewTask={() => AddNewTask()}
            /> }

        { !showform && (data.length === 0?(
          <div className='flex gap-5 text-center mt-[30vh] flex-col text-xl'>
            <h1>No History Found....</h1>
            <p>Click the below <button className='bg-green-600 rounded-md px-1 py-1 font-semibold text-xs text-white'>Add Task</button> to Track Questions.
            </p></div>):
            <div className='overflow-y-scroll hide-scrollbar flex flex-col gap-5 py-23 p-5 justify-self-center items-center'>
              <select onClick={(e) => sortByDate(e.target.value)} className='mr-80 md:mr-100 lg:mr-110 -mt-2.5 w-15 border-2 border-neutral-300 rounded-sm outline-none active:outline-2'>
                <option value="" selected hidden className='text-xs hover:bg-gray-400'>Sort</option>
                <option value="O-N" className='text-xs'>Oldest-Newest</option>
                <option value="N-O" className='text-xs'>Newest-Oldest</option>
              </select>
              {Object.entries(groupedByDate).map(([date, data]) => (
                  <fieldset key={date} className='border-2 border-gray-300 w-95 lg:w-125'>
                      <legend className="ml-3">
                        <span>{date}</span>
                      </legend>

                        <PlusIcon onClick={() => addQueToDate(date)} size={25}
                          className="bg-green-500 rounded-sm flex justify-self-end mr-5 mt-[-25px] p-1 font-extrabold text-white cursor-pointer hover:bg-green-600"/>

                      {data.map((obj, idx) => (
                      <div key={idx} className='flex py-3 px-3 gap-5 lg:gap-20 md:gap-20 mt-2 items-center '>
                          <span className='w-50 flex gap-1'> {idx+1}. <h3 className='first-letter:capitalize'>{obj.que}</h3></span>
                          <a href={obj.links} target='blank' className='flex items-center gap-1 p-2 rounded hover:bg-gray-100 text-blue-500'>📖 View</a>
                          <button onClick={() => deleteQue(obj.id)} className='bg-red-600 hover:bg-red-500 cursor-pointer text-white rounded-md p-1'>
                          <Trash2Icon size={20}/>
                          </button>
                      </div>
                      ))}
                  </fieldset>
              ))}
          </div>
    )}
    <button onClick={() => setShowForm(true)} className='bg-green-600 mt-5 rounded-md px-2 py-1 font-semibold text-white cursor-pointer hover:bg-green-700 right-5 bottom-18 z-100 fixed'>Add Task</button>
    {notiMsg && <Notification msg={notiMsg}/>}
    </div>
  )
}


export default Home;