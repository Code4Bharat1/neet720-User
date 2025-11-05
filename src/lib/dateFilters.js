// src/lib/dateFilters.js
export const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const startOfWeekMon = (d) => {
  const x = new Date(d);
  const day = x.getDay(); // Sun=0..Sat=6
  const diff = x.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  const s = new Date(x.setDate(diff));
  s.setHours(0, 0, 0, 0);
  return s;
};

export const sameDay   = (a, b) => startOfDay(a).getTime() === startOfDay(b).getTime();
export const sameWeek  = (a, b) => startOfWeekMon(a).getTime() === startOfWeekMon(b).getTime();
export const sameMonth = (a, b) => {
  const A = new Date(a), B = new Date(b);
  return A.getFullYear() === B.getFullYear() && A.getMonth() === B.getMonth();
};
export const sameYear  = (a, b) => new Date(a).getFullYear() === new Date(b).getFullYear();

export function withinRange(selection, updatedAt) {
  if (!updatedAt) return selection === "All Time";
  const now = new Date();
  switch (selection) {
    case "Today":     return sameDay(updatedAt, now);
    case "This Week": return sameWeek(updatedAt, now);
    case "This Month":return sameMonth(updatedAt, now);
    case "This Year": return sameYear(updatedAt, now);
    default:          return true;
  }
}
