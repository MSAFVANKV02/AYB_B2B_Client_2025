import React from "react";
import { addDays as addDaysFn } from "date-fns";

interface FormattedDateProps {
  date?: string | number | Date; // The date to format
  showTime?: boolean;           // Show time (default: true)
  showSeconds?: boolean;        // Show seconds (default: true)
  use12Hour?: boolean;  
  className?:string    
  addDays?: number;    // Use 12-hour format (default: true)
}

const MyClock: React.FC<FormattedDateProps> = ({
  date,
  showTime = true,
  showSeconds = true,
  use12Hour = true,
  className = "",
  addDays = 0,
}) => {
  if (!date) {
    return <span className="text-xs">N/A</span>;
  }

  let targetDate = new Date(date);
  if (addDays) {
    targetDate = addDaysFn(targetDate, addDays);
  }


  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  if (showTime) {
    options.hour = "2-digit";
    options.minute = "2-digit";
    if (showSeconds) {
      options.second = "2-digit";
    }
    options.hour12 = use12Hour;
  }

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    targetDate
  );

  return <span className={className}>{formattedDate}</span>;
};

export default MyClock;
