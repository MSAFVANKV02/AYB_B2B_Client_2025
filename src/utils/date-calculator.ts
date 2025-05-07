// import { formatDistanceToNowStrict } from "date-fns";

// export function getRelativeTime(date: string | Date): string {
//   return formatDistanceToNowStrict(new Date(date), { addSuffix: true });
// }
import { differenceInDays, differenceInMonths, differenceInYears } from "date-fns";

export function getSimpleRelativeTime(date: string | Date): string {
  const now = new Date();
  const target = new Date(date);

  const years = differenceInYears(now, target);
  if (years >= 1) return `${years} yr${years > 1 ? "s" : ""}`;

  const months = differenceInMonths(now, target);
  if (months >= 1) return `${months} month${months > 1 ? "s" : ""}`;

  const days = differenceInDays(now, target);
  if (days >= 7) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""}`;
  }

  return `${days || 1} day${days !== 1 ? "s" : ""}`;
}
