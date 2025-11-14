import React, { useState } from 'react'
import '../App.css'

const Form = ({Que,setQue,Link,setLink,Topic,setTopic,Difficulty,setDifficulty,Note,setNote,hideForm,AddNewTask}) => {
      const topics = ["Arrays", "Strings", "Linked_List", "Stack", "Queue", "Recursion", "DP", "Graph", "Binary_Tree", "BST"]

  return (
    <div className='flex flex-col justify-items-center bg-gray-600 h-[92vh]  w-full z-1000'>
            <div className="flex flex-col gap-3  md:gap-5 justify-self-center bg-white  mx-auto mt-20 lg:mt-30 py-10 p-23 lg:p-10 rounded-md">
                <div className="flex gap-3 md:gap-5  flex-col lg:flex-row -mx-15 md:mx-0">
                    <input type="text" name='ques' value={Que} onChange={(e) => setQue(e.target.value)} className='border-2 border-gray-400 px-2 rounded-md py-1 ' placeholder='Enter Question..' required/>
                    <input type="text" name='link' value={Link} onChange={(e) => setLink(e.target.value)} className='border-2 border-gray-400 px-2 rounded-md py-1' placeholder='Paste Link of The Solved Question..'/>
                </div>
                
                <div className="flex gap-5 flex-col lg:flex-row -mx-15 md:mx-0">
                    <select name="difficulty" className='border-2 border-gray-400 px-2 rounded-md py-1 ' value={Difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                        <option selected hidden >Choose Difficulty Level</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                
                <textarea value={Note} className='border-2 border-gray-400 px-2 rounded-md py-1 -mx-15 md:mx-0' onChange={(e) => setNote(e.target.value)} placeholder='Quick Points To Remember...'></textarea>
                
                <div className="flex flex-col w-full">
                    <label className="text-gray-700 mb-1 text-sm font-semibold -mx-15 md:mx-0">Select Topic:</label>
                    <div className="flex flex-wrap text-sm gap-2 w-70 lg:w-100 bg-gray-100 p-2 rounded-md border border-gray-300 -mx-15 md:mx-0">
                        {topics.map((topic) => (
                            <button
                                key={topic}
                                type="button"
                                onClick={() => {
                                    if(!Topic.includes(topic))
                                        setTopic(prev => prev+" "+topic)
                                    else
                                    {
                                        const updatedTopic = Topic.replace(topic,'');
                                        setTopic(updatedTopic);
                                    }
                                }}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 shadow-sm ${
                                    Topic.includes(topic) 
                                    ? "bg-blue-600 text-white shadow-md scale-105" 
                                    : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50 hover:border-blue-400"}`} 
                            >{topic}</button>
                            ))}
                    </div>
                </div>

                <div className="flex justify-center gap-5 py-3">
                    <button onClick={hideForm} className='bg-red-500 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-red-700'>Cancel</button>
                    <button onClick={AddNewTask} className='bg-green-500 rounded-md px-2 py-1 text-white cursor-pointer hover:bg-green-700'>Save</button>
                </div>
            </div>
    </div>
  )
}

export default Form