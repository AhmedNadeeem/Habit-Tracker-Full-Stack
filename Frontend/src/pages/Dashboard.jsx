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
  const [completedTasks, setCompletedTasks] = useState(0);
  const [progress, setProgress] = useState(0)
  const [habits, setHabits] = useState("");
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

      console.log("Habits data: ", habitsData)
      setCompletedTasks(habitsData.completed)

      console.log("Habits length: ", typeof(habitsData.habits))
      console.log("Completed habits: ", typeof(habitsData.completed))
      const prog = (habitsData.completed / habitsData.habits) * 100;
      console.log("Progress: ", prog)

      setProgress(prog); 
  }, [setHabits, setCompletedTasks, setProgress]);

  return (
    <div className="text-4xl bg-black min-h-screen flex flex-col items-center py-8 px-6">
      <div>
        <DayCard dateProp={todayDate} />
      </div>

      <div className="bg-gray-900 min-w-full flex justify-between px-15 py-10 mt-10 rounded-2xl">
        <div>
          <h2 className="font-bold text-white text-5xl">
            Total Habits - {habits.length}
          </h2>
          <Progress value={progress} className="w-2xl flex-1 mt-4 h-6" />
        </div>
        <div>
          <h2 className="font-bold text-white text-5xl">
            {progress}/100%
          </h2>
          <p className="uppercase text-white font-thin tracking-wider">
            Completed
          </p>
        </div>
      </div>

      <div className="mt-10 px-20 w-[90%]      mx-auto flex justify-between items-center flex-wrap">
        {habits &&
          habits.map((habit, index) => (
            <HabitCard
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