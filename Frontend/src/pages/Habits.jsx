import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast, Toaster } from "react-hot-toast";

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

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const userData = useSelector(state => state.user.user);
  
  useEffect(() => {
    const userId = userData?.user["userId"];
    axios.get(`http://localhost:8000/api/v1/habits/all/${userId}`)
    .then((response)=> {
      setHabits(response.data.habits);

    })
    .catch((error)=>{
      console.error(error);
      setHabits(false);
    })
  }, [setHabits])

  const deleteHabit = (habitId) => {
    try {
      if(habitId.length > 0 ){
        axios.delete(`http://localhost:8000/api/v1/habits/delete/${habitId}`)
        .then((response)=> {
          const msg = (response.data.message)
          toast.success(msg)
        })
        .catch((error)=> {
          console.error(error)
        })
        .finally(()=> {
          setTimeout(()=> 
            window.location.reload()
          , 1500)
        })

      }
    } catch (error) {
      
    }
  }

  return (
    <div className='min-h-screen bg-black max-sm:px-10 max-md:px-12 px-20 py-3'>
      <Toaster />
      <h1 className='text-white max-sm:text-2xl max-md:text-3xl max-lg:text-4xl text-6xl uppercase font-bold text-center p-3 mb-6'>All Habits</h1>

      <div className='flex justify-between flex-wrap items-center'>

        {habits.length > 0 ? habits.map((habit) => (
      
          <Card key={habit._id} className="bg-gray-500 mb-8 w-[49%] max-sm:mb-4 max-md:mb-6 max-md:w-full max-sm:w-full max-lg:w-full border-0">
            <CardHeader>
              <div className='flex w-full justify-between px-2 items-start'>
                <div>
                  <CardTitle className="text-black text-lg max-sm:text-md font-bold">{habit.title}</CardTitle>
                  <CardDescription className="text-gray-900 text-lg max-sm:text-sm">{habit.description} | {habit.frequency}</CardDescription>
                </div>
                <img className='w-10 max-sm:w-8' src={icons[habit.icon]} alt="Habit icon" />
              </div>
            </CardHeader>
            <CardFooter className="flex flex-col max-sm:flex-row max-md:flex-row max-lg:flex-row gap-2">

              <Dialog>
                <DialogTrigger className="bg-[#ff9100] hover:bg-[#dd7e00] flex-1 w-full py-2 border-0 rounded-lg cursor-pointer">Edit</DialogTrigger>
                <DialogContent className="bg-gray-500 border-0">
                  <DialogHeader>
                    <DialogTitle>Edit habit:</DialogTitle>
                    </DialogHeader>
                  <HabitDialog btnText={"Edit"} title={habit.title} description={habit.description} frequency={habit.frequency} icon={habit.icon} habitId={habit._id}/>
                </DialogContent>
              </Dialog>

              <Button onClick={()=> deleteHabit(habit._id)} className="flex-1 w-full text-white bg-gray-800 hover:bg-gray-900 cursor-pointer">
                Delete
              </Button>
            </CardFooter>
          </Card>

        ))
        : 
        <h2 className='text-center w-full text-3xl text-white'>No habits to show :(</h2>
        }
      </div>

    </div>
  )
}