import React from 'react';
import {Link} from "react-router-dom";

export default function DayCard({ cardDestination, cardBg, cardTextColor, date, day }) {
  return (
    <div className={`${cardBg} w-20 h-25 rounded-lg`}>
        <Link to={cardDestination} className={`flex flex-col justify-center items-center h-25`}>
            <p className={`text-2xl font-bold ${cardTextColor}`}>{date}</p>
            <p className={`text-lg`}>{day}</p>
        </Link>
    </div>
  )
}
