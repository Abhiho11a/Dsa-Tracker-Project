import React, { useEffect, useState } from 'react'

const Footer = () => {
  
  const [data,setData] = useState(JSON.parse(localStorage.getItem('dataObj')) || [])

  const [stats, setStats] = useState({
    total: 0,
    easy: 0,
    medium: 0,
    hard: 0,
    days: 0,
    avgPerDay: 0,
  });

  useEffect(() => {
    const total = data.length;
    const easy = data.filter(it => it.difficulty === "Easy").length;
    const medium = data.filter(it => it.difficulty === "Medium").length;
    const hard = data.filter(it => it.difficulty === "Hard").length;
    const uniqueDates = [...new Set(data.map(it => it.date))];
    const days = uniqueDates.length;
    const avgPerDay = days > 0 ? Math.floor(total / days) : 0;

    setStats({ total, easy, medium, hard, days, avgPerDay });
  }, [data]);

  
  // Sync footer whenever localStorage changes (same tab + other tabs)
  useEffect(() => {
    const syncData = () => {
      setData(JSON.parse(localStorage.getItem("dataObj")) || []);
  };

  // Listen to storage changes (other tabs)
  window.addEventListener("storage", syncData);

  // Patch localStorage.setItem (same tab)
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, [key, value]);
    if(key === "dataObj") {
      syncData();
    }
  };

  return () => {
    window.removeEventListener("storage", syncData);
    localStorage.setItem = originalSetItem;
  };
  }, []);

  return (
    <footer className="flex justify-between bg-gray-100 border-t mt-6 py-4 px-6 lg:px-10 gap-5 w-full text-sm text-gray-700 fixed bottom-0">
        <div className="font-bold text-md lg:text-xl">Total Questions:{stats.total}</div>
        <div className='flex font-semibold text-md lg:text-lg gap-1 justify-center'>
            <span className="text-green-600">Easy:{stats.easy}</span> {} &nbsp;|&nbsp;
            <span className="text-yellow-600">Medium:{stats.medium}</span> {} &nbsp;|&nbsp;
            <span className="text-red-600">Hard:{stats.hard}</span> {}
        </div>
    </footer>
  )
}

export default Footer