import React, { useState } from 'react'
import DayCard from '../components/DayCard'
import { Progress } from "@/components/ui/progress"
import HabitCard from '../components/HabitCard';

const colors = [
  "bg-yellow-200", "bg-purple-300", "bg-cyan-200", "bg-fuchsia-200", "bg-lime-300"
]

function Dashboard() {
  const [progress, setProgress] = useState(25);
  
  return (
    <div className='text-4xl bg-black min-h-screen flex flex-col items-center py-8 px-6'>

      <div className='flex gap-14'>
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={2} day={"Mon"} />
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={3} day={"Mon"} />
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={4} day={"Mon"} />
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={5} day={"Mon"} />
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={6} day={"Mon"} />
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={7} day={"Mon"} />
        <DayCard cardBg={"bg-[#ff9100]"} cardTextColor={"text-black"} cardDestination={"/"} date={8} day={"Mon"} />
      </div>

      <div className='bg-gray-900 min-w-full flex justify-between px-15 py-10 mt-10 rounded-2xl'>
        <div>
          <h2 className='font-bold text-white text-5xl'>Total habits - 5</h2>
          <Progress value={progress} className="w-2xl flex-1 mt-4 h-6" />
        </div>
        <div>
          <h2 className='font-bold text-white text-5xl'>{progress}/100%</h2>
          <p className='uppercase text-white font-thin tracking-wider'>Completed</p>
        </div>
      </div>

      <div className='mt-10 px-20 w-[90%]      mx-auto flex justify-between items-center flex-wrap'>

        <HabitCard freq={"weekly"} bg={"bg-green-300"} title={"Reading"} icon={"idea"} done={false} />
        <HabitCard freq={"daily"} bg={"bg-yellow-200"} icon={"work"} title={"Project building"} done={true} />
    
      </div>
    </div>
  )
}

export default Dashboard
