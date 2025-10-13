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
    <div className="flex max-w-full max-sm:gap-4 gap-10">
      {weekDates.map((date) =>
        date == dateProp ? (
          <div
            className={`bg-[#ff9100] max-sm:w-11 max-sm:h-18 w-20 h-25 flex flex-col justify-center items-center rounded-lg`}
          >
            <p className={`max-sm:text-lg text-2xl font-bold text-black`}>
              {date.split(" ")[2]}
            </p>
            <p className={`max-sm:text-sm text-lg`}>{date.split(" ")[0]}</p>
          </div>
        ) : (
          <div
            className={`bg-gray-900 max-sm:w-11 max-sm:h-18 w-20 h-25 flex flex-col justify-center items-center rounded-lg`}
          >
            <p className={`max-sm:text-lg text-2xl font-bold text-gray-400`}>
              {date.split(" ")[2]}
            </p>
            <p className={`max-sm:text-sm text-lg text-gray-400`}>{date.split(" ")[0]}</p>
          </div>
        )
      )}
    </div>
  );
}
