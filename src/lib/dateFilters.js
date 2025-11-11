// src/lib/dateFilters.js

/** Normalize a date to local midnight (IST-safe) */
export const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

/** Get Monday 00:00 as the start of week (local timezone safe) */
export const startOfWeekMon = (d) => {
  const x = new Date(d);
  const day = x.getDay(); // 0=Sun..6=Sat
  // shift so Monday is start
  const diff = x.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(x.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
};

/** Same-day, same-week, same-month, same-year helpers */
export const sameDay = (a, b) =>
  startOfDay(a).getTime() === startOfDay(b).getTime();

export const sameWeek = (a, b) => {
  const aStart = startOfWeekMon(a);
  const bStart = startOfWeekMon(b);
  const aEnd = new Date(aStart);
  aEnd.setDate(aStart.getDate() + 7);
  return aStart <= bStart && bStart < aEnd;
};

export const sameMonth = (a, b) => {
  const A = new Date(a), B = new Date(b);
  return A.getFullYear() === B.getFullYear() && A.getMonth() === B.getMonth();
};

export const sameYear = (a, b) => {
  const A = new Date(a), B = new Date(b);
  return A.getFullYear() === B.getFullYear();
};

/**
 * Core filter — accurate for all timeframes
 * @param {"Today"|"This Week"|"This Month"|"This Year"|"All Time"} selection
 * @param {string|Date} updatedAt
 */
export function withinRange(selection, updatedAt) {
  if (!updatedAt) return selection === "All Time";
  const now = new Date();
  switch (selection) {
    case "Today":
      return sameDay(updatedAt, now);
    case "This Week":
      return sameWeek(updatedAt, now);
    case "This Month":
      return sameMonth(updatedAt, now);
    case "This Year":
      return sameYear(updatedAt, now);
    default:
      return true;
  }
}
