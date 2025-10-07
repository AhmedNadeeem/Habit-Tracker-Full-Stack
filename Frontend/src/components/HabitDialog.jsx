import React, { useEffect } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import axios from "axios"
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


export default function HabitDialog({btnText, title, description, frequency, icon}) {
  const userDetails = useSelector(state => state.user.user);
  const userId = userDetails["user"]["userId"] || "";
  const navigate = useNavigate();
    const [habit, setHabit] = React.useState({
        title: "",
        description: "",
        frequency: "",
        icon: "",
    });
    const [loading, setLoading] = React.useState(false);

    useEffect(()=> {
      setHabit(
        { 
          userId: userId,
          title: title,
          description: description,
          frequency: frequency,
          icon: icon
        }
      )
    }, [])

    const addNewHabit = () => {
      try {
        if(habit.title.length > 0 && habit.description.length > 0 && habit.frequency.length > 0 && habit.icon.length > 0){
          axios.post("http://localhost:8000/api/v1/habits/create", habit, {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            const msg = response.data.message;
            console.log(msg);
            toast.success(msg)

          })
          .catch((error)=> {
            const errorMsg = (error.response?.data?.message)
            console.error(errorMsg);
            toast.error(errorMsg);
          })
          .finally(()=> {
            setHabit({
              userId: userId,
              title: "",
              description: "",
              frequency: "",
              icon: "",
            })
          })
        }
      } catch (error) {
        
      }
    }

    const editHabit = () => {}

  return (
    <div className="bg-gray-900 p-4 py-6 rounded-lg mt-1">
      <Toaster/>
      {loading && (
        <h1 className="text-white font-bold text-center mb-4">Processing...</h1>
      )}

      <div className="mt-3 mb-3">
        <Label className="mb-1.5 text-white" htmlFor="title">
          Title:
        </Label>
        <Input
          type="text"
          id="title"
          className="selection:bg-[#ff9100] selection:text-black"
          value={habit.title}
          onChange={(e) => setHabit({ ...habit, title: e.target.value })}
          name="email"
        />
      </div>

      <div>
        <Label className="mb-1.5 text-white" htmlFor="description">
          Description:
        </Label>
        <Input
          className="selection:bg-[#ff9100] selection:text-black"
          type="text"
          id="description"
          value={habit.description}
          onChange={(e) => setHabit({ ...habit, description: e.target.value })}
          name="password"
        />
      </div>

     <div className="flex gap-6 mt-4">
        <Select value={habit.frequency} onValueChange={(value)=> {
          setHabit({...habit, frequency: value})
        }}>
          
            <SelectTrigger className="text-white">
                <SelectValue  placeholder="Habit Frequency"/>
            </SelectTrigger>
            <SelectContent className="bg-gray-900 ml-8">
                <SelectGroup className="bg-gray-900">
                    <SelectLabel>Frequency</SelectLabel>
                    <SelectItem className="text-white" value="daily">Daily</SelectItem>
                    <SelectItem className="text-white" value="weekly">Weekly</SelectItem>
                    <SelectItem className="text-white" value="monthly">Monthly</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>

        <Select value={habit.icon} onValueChange={(value)=> {
          setHabit({...habit, icon: value})
        }}>
            <SelectTrigger className="text-white">
                <SelectValue placeholder="Habit Icon"/>
            </SelectTrigger>
            <SelectContent className="bg-gray-900 ml-8">
                <SelectGroup className="bg-gray-900">
                    <SelectLabel>Habit Icon</SelectLabel>
                    <SelectItem className="text-white" value="idea">
                        Idea <img className='w-6 p-1 bg-white rounded' src={IdeaIcon} />
                    </SelectItem>
                    <SelectItem className="text-white" value="work">
                        Work <img className='w-6 p-1 bg-white rounded' src={WorkIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="study">
                        Study <img className='w-6 p-1 bg-white rounded' src={StudyIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="art">
                        Art <img className='w-6 p-1 bg-white rounded' src={ArtIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="entertainment">
                        Entertainment <img className='w-6 p-1 bg-white rounded' src={EntertIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="finance">
                        Finance <img className='w-6 p-1 bg-white rounded' src={FinanceIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="health">
                        Health <img className='w-6 p-1 bg-white rounded' src={HealthIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="home">
                        Home <img className='w-6 p-1 bg-white rounded' src={HomeIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="meditation">
                        Meditation <img className='w-6 p-1 bg-white rounded' src={MeditationIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="social">
                        Social <img className='w-6 p-1 bg-white rounded' src={SocialIcon}/>
                    </SelectItem>
                    <SelectItem className="text-white" value="sports">
                        <p>Sports</p> <img className='w-6 p-1 bg-white rounded' src={SportsIcon}/>
                    </SelectItem>
                    
                </SelectGroup>
            </SelectContent>
        </Select>
      </div>


        
      <Button onClick={addNewHabit}  className="mt-4 w-full">
        {btnText}
      </Button>
    </div>
  );
};