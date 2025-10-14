import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DayCard({ dateProp }) {
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    if (!dateProp) return;

    const baseDate = new Date(dateProp);
    const temp = [];

    for (let i = -2; i <= 4; i++) {
      const date = new Date(baseDate);
      date.setDate(baseDate.getDate() + i);

      const formatted = date.toDateString();
      temp.push(formatted);
    }

    setWeekDates(temp);

  }, [dateProp]);

  return (
    <div className="flex flex-1 w-full justify-between max-sm:px-0 max-md:px-6 max-lg:px-8 px-30">
      {weekDates.map((date) =>
        date == dateProp ? (
          <div
            className={`bg-[#ff9100] max-sm:w-10 max-sm:h-16 max-md:w-16 max-md:h-22 w-20 h-25 flex flex-col justify-center items-center rounded-lg`}
          >
            <p className={`max-sm:text-lg max-md:text-xl text-2xl font-bold text-black`}>
              {date.split(" ")[2]}
            </p>
            <p className={`max-sm:text-xs max-md:text-sm text-lg`}>{date.split(" ")[0]}</p>
          </div>
        ) : (
          <div
            className={`bg-gray-900 max-sm:w-10 max-sm:h-16 max-md:w-16 max-md:h-22 w-20 h-25 flex flex-col justify-center items-center rounded-lg`}
          >
            <p className={`max-sm:text-lg max-md:text-xl text-2xl font-bold text-gray-400`}>
              {date.split(" ")[2]}
            </p>
            <p className={`max-sm:text-xs max-md:text-sm text-lg text-gray-400`}>{date.split(" ")[0]}</p>
          </div>
        )
      )}
    </div>
  );
}
