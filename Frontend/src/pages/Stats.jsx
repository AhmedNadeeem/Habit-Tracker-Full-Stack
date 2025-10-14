import React, { useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import HabitStats from '../components/HabitStats';

export default function Stats() {
  const [allHabit, setAllHabits] = React.useState([]);

  const userData = useSelector((state) => state.user.user);
  const userId = userData.user.userId;

  useEffect(()=>{
    axios.get(`http://localhost:8000/api/v1/habits/all/${userId}`)
    .then((response)=> {
      setAllHabits(response.data.habits);
    })
    .catch((error)=>{
      console.error(error);
      setAllHabits(false);
    })

  }, [setAllHabits])

  return (
    <div className='min-h-screen flex flex-col w-full items-center bg-black px-10 py-6'>

        <h1 className='text-white text-6xl mb-8 uppercase font-bold max-md:text-5xl max-md:mb-6 max-sm:text-4xl max-sm:mb-6'>Stats</h1>
        {/* { allHabit && <HabitStats habitData={allHabit[0]} /> } */}
        {allHabit && allHabit.map(habit => (
          <HabitStats habitData={habit} />
        ))}

    </div>
  )
}
