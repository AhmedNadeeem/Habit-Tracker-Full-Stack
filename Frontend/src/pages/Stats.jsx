import React from 'react'
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
import HabitDialog from '../components/HabitDialog';

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

const dates = [
  {date: 8, day: "Mon", status: false},
  {date: 9, day: "Tue", status: true},
  {date: 10, day: "Wed", status: true},
  {date: 11, day: "Thu", status: true},
  {date: 12, day: "Fri", status: false},
  {date: 13, day: "Sat", status: true},
  {date: 14, day: "Sun", status: false},
]

export default function Stats() {
  const [date,setDate] = React.useState(Date.now())
  return (
    <div className='min-h-screen flex flex-col bg-black p-10'>
        <div className='bg-gray-600 p-6 px-10 rounded-2xl flex flex-col justify-between'>
          <div className='flex justify-center  items-end gap-10 w-full p-4'>
            <img src={icons["idea"]} className='w-10' />
            <h2 className='text-black text-4xl font-bold uppercase'>Habit name</h2>
            <p className='text-black text-2xl'>Habit description | Frequency</p>
            <p className='text-black text-2xl'>Streak</p>
          </div>

        <div className='px-6 flex justify-between items-center mt-6'>
            <button className='cursor-pointer bg-[#ff9100] h-10 w-10 rounded-4xl hover:bg-[#dd7e00] text-black text-2xl font-bold'>
              {"<"}
            </button>
            <div className='flex gap-16'>
              {dates.map(date => (

                <div className={`${date.status ? "bg-[#ff9100]" : "bg-gray-400"} w-20 h-25 flex flex-col justify-center items-center rounded-lg`}>
                  <p className='text-2xl font-bold text-black'>{date.date}</p>
                  <p className='text-lg'>{date.day}</p>
                </div>
))}
            </div>
            <button className='cursor-pointer bg-[#ff9100] h-10 w-10 rounded-4xl hover:bg-[#dd7e00] text-black text-2xl font-bold'>
              {">"}
            </button>
        </div>
        </div>

    </div>
  )
}
