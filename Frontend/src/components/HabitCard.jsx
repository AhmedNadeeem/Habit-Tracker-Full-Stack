import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import IdeaIcon from "../assets/idea.png"
import WorkIcon from "../assets/work.png"
import StudyIcon from "../assets/study.png"
import ArtIcon from "../assets/art.png"
import EntertIcon from "../assets/entertainment.png"
import FinanceIcon from "../assets/finance.png"
import HealthIcon from "../assets/health.png"
import HomeIcon from "../assets/home.png"
import MeditationIcon from "../assets/meditation.png"
import SocialIcon from "../assets/social.png"
import SportsIcon from "../assets/sports.png"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { completeHabit } from "../store/slices/habits.slice"

const icons = {
  idea: IdeaIcon,
  work: WorkIcon,
  study: StudyIcon,
  art: ArtIcon,
  entertainment: EntertIcon,
  finance: FinanceIcon,
  health: HealthIcon,
  home: HomeIcon,
  meditation: MeditationIcon,
  social: SocialIcon,
  sports: SportsIcon
}


export default function HabitCard({icon, userId, id, freq, description, title, bg}) {
    const [status, setStatus] = useState(false);
    const dispatch = useDispatch()

    useEffect(()=> {
      const payload = {
        habitId: id,
        userId: userId,
      };

      try {
      axios.post("http://localhost:8000/api/v1/habits/today/stat", payload)
      .then((response)=>{
        const resCode = (response.status)
        if(resCode == 200) {
          setStatus(true);
        }
      })
      .catch((error)=>{
        console.error(error)
      })
      .finally(()=>{})
      } catch (error) {
        console.error(error) 
      }
    }, [setStatus])
    
    const completeHabitBtn = () => {
      try {
        const payload = {
          date: new Date().toISOString(),
          status: true,
          userId: userId
        }
        axios.post(`http://localhost:8000/api/v1/habits/mark/${id}`, payload)
        .then((response)=>{
          setStatus(!status);
          dispatch(completeHabit())
          window.location.reload();
        })
        .catch((error)=>{
          console.error(error)
        })
        .finally(()=>{})
      } catch (error) {
        console.error(error) 
      }
    }

  return (
    <div key={id} className={`flex w-[49%] max-sm:w-lg max-sm:mb-5 max-md:mb-5 max-md:w-xl max-sm:px-4 justify-between px-8 py-6  ${status ? "opacity-50" : ""} justify-between rounded-2xl items-center ${bg ? bg : "bg-red-200"} mb-10 `}>
          <div className='flex-1'>
            <div className='flex items-center gap-4 max-sm:gap-2'>
              <img className='w-8 max-sm:w-6 max-lg:w-6' src={ icons[icon] }/>
              <p className={`text-2xl max-lg:text-xl max-sm:text-lg font-bold uppercase ${status ? "line-through" : ""}`}>{title || "Reading"}</p>
            </div>
              <p className={`font-thin text-lg max-sm:text-xs max-lg:text-sm ${status ? "line-through" : ""}`}>{description} | {freq}</p>
          </div>
            <Checkbox id="checkbox" disabled={status} checked={status} onClick={completeHabitBtn} className="max-sm:w-8 max-sm:h-8 w-10 h-10 rounded-2xl" />
        </div>
  )
}
