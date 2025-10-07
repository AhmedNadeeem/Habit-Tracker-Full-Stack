import React from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const colors = [
  "bg-yellow-200", "bg-purple-300", "bg-cyan-200", "bg-fuchsia-200", "bg-lime-300"
]

function Habits() {
  return (
    <div className='min-h-screen bg-black px-20 py-3'>
      <h1 className='text-white text-6xl uppercase font-bold text-center p-3 mb-6'>All Habits</h1>

      <Card className="bg-gray-600 w-[50%] max-w-md border-0">
        <CardHeader>
          <div className='flex w-full justify-between px-2 items-start'>
            <div>
              <CardTitle className="text-black text-lg font-bold mt-1">Habit name</CardTitle>
              <CardDescription className="text-gray-900 text-lg">Habit description | Frequency</CardDescription>
            </div>
            <img className='w-10' src={icons["idea"]} alt="Habit icon" />
          </div>
        </CardHeader>
        <CardFooter className="flex flex-col gap-2">

          <Dialog>
            <DialogTrigger className="bg-[#ff9100] hover:bg-[#dd7e00] w-full py-2 border-0 rounded-lg cursor-pointer">Edit</DialogTrigger>
            <DialogContent className="bg-gray-500 border-0">
              <DialogHeader>
                <DialogTitle>Edit habit:</DialogTitle>
                </DialogHeader>
              <HabitDialog btnText={"Edit"} title={"Title"} description={"Description"} frequency={"Frequency"} icon={"Icon"} />
            </DialogContent>
          </Dialog>

          <Button className="w-full bg-red-600 hover:bg-red-700 cursor-pointer">Delete</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Habits