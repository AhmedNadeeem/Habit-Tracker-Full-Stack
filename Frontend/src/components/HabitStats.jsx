import React, { useEffect } from "react";
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
import { useSelector } from 'react-redux'

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

export default function HabitStats({ habitData }) {
  const curDate = new Date();
  const [habit, setHabit] = React.useState("");
  const [weekDates, setWeekDates] = React.useState([]);
  const [weekProgress, setWeekProgress] = React.useState([]);
  const [startDate, setStartDate] = React.useState(curDate);
  const [disableBtn, setDisableBtn] = React.useState(true);

  const userData = useSelector((state) => state.user.user);
  const userId = userData.user.userId;

  const getWeekDates = (inputDate) => {
    const baseDate = new Date(inputDate);
    const tempWeekDates = [];

    for (let i = -6; i <= 0; i++) {
      const tempDate = new Date(baseDate);
      tempDate.setDate(baseDate.getDate() + i);
      tempWeekDates.push(tempDate);
    }

    // console.log(tempWeekDates);
    setWeekDates(tempWeekDates);
  };

  const nextWeekDates = () => {
    let tempDate = new Date(startDate);
    tempDate.setDate(startDate.getDate() + 7);
    // console.log(tempDate);
    setStartDate(tempDate);
  };

  const prevWeekDates = () => {
    let tempDate = new Date(startDate);
    tempDate.setDate(startDate.getDate() - 7);
    // console.log(tempDate);
    setStartDate(tempDate);
  };

  useEffect(() => {
    getWeekDates(startDate);
    setHabit(habitData);
  }, [setWeekDates, startDate, habitData, setStartDate]);

  useEffect(() => {
    const payload = {
      userId: userId,
      weekDates: weekDates,
      habitId: habit?._id,
    };

    // console.log(payload)

    axios.post("http://localhost:8000/api/v1/habits/progress/week", payload)
    .then((response)=>{
      console.log(response.data.weeklyStat);
      const weeklyStats = response.data.weeklyStat;
      setWeekProgress(weeklyStats);
    })
    .catch((error)=>{
      console.error(error);
    })
    .finally(()=>{
      console.log("Hit the route")
    })
  }, [weekDates]);

  useEffect(() => {
    if (weekDates && weekDates[6]?.toDateString() == curDate.toDateString()) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [weekDates, setWeekDates]);

  return (
    <div className="bg-gray-600 p-6 mb-10 min-w-[80%] px-10 rounded-2xl flex flex-col justify-between">
      <div className="flex justify-center  items-end gap-10 w-full p-4">
        <img src={icons[habit?.icon || ""]} className="w-10" />
        <h2 className="text-black text-4xl font-bold uppercase">
          {habit?.title || ""}
        </h2>
        <p className="text-black text-2xl">
          {habit?.description || ""} | {habit?.frequency || ""}
        </p>
      </div>

      <div className="px-6 flex justify-between items-center mt-6">
        <button
          onClick={prevWeekDates}
          className="cursor-pointer bg-[#ff9100] h-10 w-10 rounded-4xl hover:bg-[#dd7e00] text-black text-2xl font-bold"
        >
          {"<"}
        </button>

        <div className="flex flex-1 px-6 justify-between">
          {weekProgress &&
            weekProgress?.map((date) => (
              <div
                className={`${
                  date.status ? "bg-[#ff9100]" : "bg-gray-400"
                } w-20 h-25 flex flex-col justify-center items-center rounded-lg`}
              >
                <p className="text-2xl font-bold text-black">
                  {new Date(date.date).getDate()}
                </p>
                <p className="text-lg">
                  {new Date(date.date).getDay() == 0
                    ? "Sun"
                    : new Date(date.date).getDay() == 1
                    ? "Mon"
                    : new Date(date.date).getDay() == 2
                    ? "Tue"
                    : new Date(date.date).getDay() == 3
                    ? "Wed"
                    : new Date(date.date).getDay() == 4
                    ? "Thu"
                    : new Date(date.date).getDay() == 5
                    ? "Fri"
                    : "Sat"}
                </p>
              </div>
            ))}
        </div>
        <button
          disabled={disableBtn}
          onClick={nextWeekDates}
          className={`  h-10 w-10 rounded-4xl  text-black text-2xl font-bold ${
            disableBtn
              ? "bg-[#ba6a00]"
              : "bg-[#ff9100] hover:bg-[#dd7e00] cursor-pointer"
          }`}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
