import React, { useEffect, useState } from "react";
import DayCard from "../components/DayCard";
import { Progress } from "@/components/ui/progress";
import HabitCard from "../components/HabitCard";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setHabitsLength } from "../store/slices/habits.slice"

const colors = [
  "bg-yellow-200",
  "bg-purple-300",
  "bg-cyan-200",
  "bg-indigo-300",
  "bg-fuchsia-200",
  "bg-lime-300",
  "bg-yellow-200",
  "bg-purple-300",
  "bg-cyan-200",
  "bg-fuchsia-200",
  "bg-lime-300",
  "bg-yellow-200",
  "bg-purple-300",
  "bg-cyan-200",
  "bg-fuchsia-200",
  "bg-lime-300",
];

export default function Dashboard() {
  const [progress, setProgress] = useState(0)
  const [habits, setHabits] = useState("");
  const [completedHabits, setCompletedHabits] = useState("");
  const [todayDate, setTodayDate] = useState("");
  const userData = useSelector((state) => state.user.user);
  const userId = userData.user.userId;
  const dispatch = useDispatch();

  const habitsData = JSON.parse(localStorage.getItem("habitsData"));

  useEffect(() => {
    let date = new Date();
    date = date.toString().split(" ").slice(0, 4).join(" ");
    setTodayDate(date);

    axios
      .get(`http://localhost:8000/api/v1/habits/all/${userId}`)
      .then((response) => {
        console.log(response.data.habits);
        const res = response.data.habits;

        const filteredHabits = res.filter((habit) => {
          const createdDate = new Date(habit.createdAt);
          const currentDate = new Date();

          if (habit.frequency == "daily") {
            return true;
          } 
          else if (habit.frequency == "weekly") {
            let nextWeek = new Date(createdDate);

            while (nextWeek <= currentDate) {
              if (nextWeek.toDateString() == currentDate.toDateString()) {
                return true;
              } 
              nextWeek.setDate(nextWeek.getDate() + 7);
            }

            return false;
          } 
          else if (habit.frequency == "monthly") {
            let nextMonth = new Date(createdDate);

            while (nextMonth <= currentDate) {
              if (nextMonth.toDateString() === currentDate.toDateString()) {
                return true;
              }
              nextMonth.setMonth(createdDate.getMonth() + 1);
            }

            return false;
          }
        });

        dispatch(setHabitsLength(filteredHabits?.length))
        setHabits(filteredHabits);
      })
      .catch((error) => {
        console.error(error);
        setHabits(false);
      })
      .finally(() => {
        console.log("finished");
      });

      axios.post("http://localhost:8000/api/v1/habits/progress/today", { userId })
      .then((response)=>{
        const compHabs = (response.data.completedHabits)
        console.log(response.data.completedHabits)
        setCompletedHabits(compHabs || 0)
      })
      .catch((error)=>{
        console.log(error)
      })
      .finally(()=>{})

      console.log("Habits data: ", habitsData)
  }, [setHabits, setCompletedHabits, setTodayDate]);

  useEffect(()=>{
    
      const habsLen = habits.length;
      const comHabsLen = completedHabits
      const prog = (comHabsLen / habsLen) * 100;
      console.log("Progress: ", prog)

      setProgress(prog); 
  }, [setProgress, habits, completedHabits])

  return (
    <div className="text-4xl bg-black min-h-screen flex flex-col items-center py-8 px-6">
      <div>
        <DayCard dateProp={todayDate} />
      </div>

      <div className="bg-gray-900 w-full max-sm:px-3 max-sm:py-8 max-sm:mt-8 flex justify-between px-15 py-10 mt-10 rounded-2xl">
        <div>
          <h2 className="max-sm:text-2xl font-bold text-white text-5xl">
            Completed Habits - {completedHabits}/{habits.length}
          </h2>
          <Progress value={progress} className="w-[80%] flex-1 mt-4 h-6" />
        </div>
        <div>
          <h2 className="max-sm:text-2xl font-bold text-white text-5xl">
            {progress}/100%
          </h2>
          <p className="max-sm:text-2xl uppercase text-white font-thin tracking-wider">
            Completed
          </p>
        </div>
      </div>

      <div className="mt-10 px-20 w-[90%]      mx-auto flex justify-between items-center flex-wrap">
        {habits &&
          habits.map((habit, index) => (
            <HabitCard
              createdDate={habit.createdAt}
              userId={habit.userId}
              id={habit._id}
              freq={habit.frequency}
              description={habit.description}
              bg={colors[index]}
              title={habit.title}
              icon={habit.icon}
              done={false}
            />
          ))}
      </div>
    </div>
  );
};