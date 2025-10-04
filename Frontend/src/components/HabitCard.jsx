import React, { useState } from 'react'
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


export default function HabitCard({icon, freq, title, done, bg}) {
    const [value, setvalue] = useState(true)
  return (
    <div className={`flex gap-12 px-8 py-6 w-[45%]  justify-between rounded-2xl items-center ${bg ? bg : "bg-red-200"} mb-10 `}>
          <div>
            <div className='flex items-center gap-4'>
              <img className='w-8' src={ icons[icon] }/>
              <p className={`text-2xl font-bold uppercase ${value ? "line-through" : ""}`}>{title || "Reading"}</p>
            </div>
              <p className='font-thin text-lg'>Read 10 pages per day | {freq}</p>
          </div>
            <Checkbox id="checkbox" checked={value} onClick={()=> setvalue(!value)} className="w-10 h-10 rounded-2xl" />
        </div>
  )
}
