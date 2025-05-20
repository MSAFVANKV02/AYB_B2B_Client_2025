import { format } from "date-fns";


export const formatOrderDate = (orderDate: string | Date | undefined) => {
    if (!orderDate) {
      return "Expecting date"; // Handle invalid dates appropriately
    }
    const date =
      typeof orderDate === "string" ? new Date(orderDate) : orderDate;
    return date.toLocaleString("en-US", {
      weekday: "long", // "Monday"
      year: "numeric", // "2024"
      month: "long", // "August"
      day: "numeric", // "13"
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };


 export const safeParseDate = (dateValue: string | Date | undefined | null): Date | null => {
    if (!dateValue) return null;
    const parsedDate = new Date(dateValue);
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  };
  
  export const safeFormatDate = (dateValue: string | Date | undefined | null): string => {
    const parsedDate = safeParseDate(dateValue);
    return parsedDate ? format(parsedDate, "PPP") : "Expecting Date";
  };
  