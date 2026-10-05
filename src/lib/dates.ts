const pad = (n: number) => String(n).padStart(2, "0");

export const SHORT_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";

// Local date as YYYY-MM-DD
export const toISODate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const parseISODate = (value: string) => {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
};

// Weeks start on Monday
export const startOfWeek = (d: Date) => {
  const result = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  result.setDate(result.getDate() - ((result.getDay() + 6) % 7));
  return result;
};

export const weekDays = (d: Date) => {
  const start = startOfWeek(d);
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    return day;
  });
};

export const isSameLocalDay = (iso: string, date: string) => toISODate(new Date(iso)) === date;

// HH:mm in local time, for <input type="time">
export const toTimeInput = (iso: string) => {
  const d = new Date(iso);
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export const combineDateTime = (date: string, time: string) => new Date(`${date}T${time}:00`).toISOString();

export const formatTime = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return new Date(2000, 0, 1, h, m).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

// "Friday 14, January"
export const formatLongDate = (value: string) => {
  const d = parseISODate(value);
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  return `${weekday} ${d.getDate()}, ${month}`;
};

// "05 Oct"
export const formatShortDate = (value: string) => {
  const d = parseISODate(value);
  return `${pad(d.getDate())} ${d.toLocaleDateString("en-US", { month: "short" })}`;
};

export const padCount = (n: number) => pad(n);
