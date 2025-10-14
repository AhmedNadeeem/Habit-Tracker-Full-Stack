import React, { useEffect } from "react";
import IdeaIcon from "../assets/idea.png";
import WorkIcon from "../assets/work.png";
import StudyIcon from "../assets/study.png";
import ArtIcon from "../assets/art.png";
import EntertIcon from "../assets/entertainment.png";
import FinanceIcon from "../assets/finance.png";
import HealthIcon from "../assets/health.png";
import HomeIcon from "../assets/home.png";
import MeditationIcon from "../assets/meditation.png";
import SocialIcon from "../assets/social.png";
import SportsIcon from "../assets/sports.png";
import GT from "../assets/right-arrow.png"
import ST from "../assets/left-arrow.png"
import axios from "axios";
import { useSelector } from "react-redux";

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
  sports: SportsIcon,
};

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

    setWeekDates(tempWeekDates);
  };

  const nextWeekDates = () => {
    let tempDate = new Date(startDate);
    tempDate.setDate(startDate.getDate() + 7);
    setStartDate(tempDate);
  };

  const prevWeekDates = () => {
    let tempDate = new Date(startDate);
    tempDate.setDate(startDate.getDate() - 7);
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

    axios
      .post("http://localhost:8000/api/v1/habits/progress/week", payload)
      .then((response) => {
        const weeklyStats = response.data.weeklyStat;
        setWeekProgress(weeklyStats);
      })
      .catch((error) => {
        console.error(error);
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
    <div className="bg-gray-600 w-full p-6 mb-10 min-w-[80%] max-sm:px-2 max-sm:p-0 max-sm:mb-4 
    max-md:px-4 max-md:p-1 max-md:mb-4
    max-lg:px-6 max-lg:p-2 max-lg:mb-6
    px-10 rounded-2xl flex flex-col justify-between">

      <div className="flex justify-center items-end max-sm:gap-4 max-sm:px-1 max-sm:py-4 max-md:gap-6 max-md:px-2 max-md:pu-4 gap-10 w-full p-4">
        <img src={icons[habit?.icon || ""]} className="w-10 max-sm:w-6 max-md:w-8" />
        <h2 className="text-black text-4xl max-sm:text-lg font-bold uppercase max-md:text-xl max-lg:text-3xl">
          {habit?.title || ""}
        </h2>
        <p className="text-black text-2xl max-sm:text-sm max-md:text-base max-lg:text-xl">
          {habit?.description || ""} | {habit?.frequency || ""}
        </p>
      </div>

      <div className="px-6 flex justify-between items-center mt-6 max-sm:mt-0 max-sm:px-1 mb-2 max-md:mt-0 max-md:px-2 max-lg:mt-2">
        <button
          onClick={prevWeekDates}
          className="cursor-pointer bg-[#ff9100] max-sm:p-1 rounded-4xl hover:bg-[#dd7e00] p-2"
        >
          <img src={ST} className="max-sm:w-2 w-4" />
        </button>

        <div className="flex flex-1 px-15 justify-between max-sm:px-1 max-md:px-4">
          {weekProgress &&
            weekProgress?.map((date) => (
              <div
                className={`${
                  date.status ? "bg-[#ff9100]" : "bg-gray-400"
                } w-20 h-25 flex flex-col justify-center items-center rounded-lg max-sm:w-8 max-sm:h-14 max-md:w-12 max-md:h-18 max-lg:w-14 max-lg:h-20`}
              >
                <p className="text-2xl font-bold text-black max-sm:text-sm max-md:text-lg max-lg:text-xl">
                  {new Date(date.date).getDate()}
                </p>
                <p className="text-lg max-sm:text-xs max-sm:font-thin max-md:text-sm max-lg:text-base">
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
          className={`flex justify-center items-center cursor-pointer max-sm:p-1 p-2 rounded-4xl ${
            disableBtn
              ? "bg-[#ba6a00]"
              : "bg-[#ff9100] hover:bg-[#dd7e00] cursor-pointer"
          }`}
        >
          <img src={GT} className="max-sm:w-2 w-4" />
        </button>
      </div>
    </div>
  );
}
