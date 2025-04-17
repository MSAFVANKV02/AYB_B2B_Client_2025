import React from "react";

interface FormattedDateProps {
  date?: string | number | Date; // The date to format
  showTime?: boolean;           // Show time (default: true)
  showSeconds?: boolean;        // Show seconds (default: true)
  use12Hour?: boolean;          // Use 12-hour format (default: true)
}

const MyClock: React.FC<FormattedDateProps> = ({
  date,
  showTime = true,
  showSeconds = true,
  use12Hour = true,
}) => {
  if (!date) {
    return <span>N/A</span>;
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
    new Date(date)
  );

  return <span>{formattedDate}</span>;
};

export default MyClock;
