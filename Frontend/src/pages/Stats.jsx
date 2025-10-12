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
      console.log(response.data.habits);
      setAllHabits(response.data.habits);
    })
    .catch((error)=>{
      console.error(error);
      setAllHabits(false);
    })
    .finally(()=> {
      console.log("Finished")
    })
    
    
  }, [setAllHabits])

  
  console.log(allHabit[0])

 

  return (
    <div className='min-h-screen flex flex-col items-center bg-black p-10'>

        {/* { allHabit && <HabitStats habitData={allHabit[0]} /> } */}
        {allHabit && allHabit.map(habit => (
          <HabitStats habitData={habit} />
        ))}

    </div>
  )
}
