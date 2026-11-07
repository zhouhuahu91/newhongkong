import getCurrentDate from "@/functions/getCurrentDate";

const MONTHS = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december",
];
const WEEKDAYS = ["zo", "ma", "di", "wo", "do", "vr", "za"];

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const addDays = (d, n) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);

// ISO week number (weeks start on Monday, week 1 contains the first Thursday).
const getWeekNumber = (d) => {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - yearStart) / 86400000 + 1) / 7);
};

// Returns every day between start (inclusive) and end (exclusive).
const listDays = (start, end) => {
  const days = [];
  for (let d = start; d < end; d = addDays(d, 1)) {
    days.push({
      date: getCurrentDate(d),
      weekday: WEEKDAYS[d.getDay()],
      dayOfMonth: d.getDate(),
      timestamp: d.getTime(),
    });
  }
  return days;
};

// Returns the boundaries of a period ("day" | "week" | "month") around a date,
// plus the period we compare against:
// day -> same weekday last week, week -> previous week, month -> previous month.
const getPeriodRange = (view, date) => {
  const base = startOfDay(date);
  let start, end, prevStart, prevEnd, label, compareLabel;

  if (view === "day") {
    start = base;
    end = addDays(base, 1);
    prevStart = addDays(base, -7);
    prevEnd = addDays(base, -6);
    label = `${WEEKDAYS[base.getDay()]} ${base.getDate()} ${
      MONTHS[base.getMonth()]
    } ${base.getFullYear()}`;
    compareLabel = `vs vorige ${WEEKDAYS[base.getDay()]}`;
  } else if (view === "week") {
    // Monday is the first day of the week.
    start = addDays(base, -((base.getDay() + 6) % 7));
    end = addDays(start, 7);
    prevStart = addDays(start, -7);
    prevEnd = start;
    const last = addDays(end, -1);
    const sameMonth = start.getMonth() === last.getMonth();
    label = `Week ${getWeekNumber(start)} · ${start.getDate()}${
      sameMonth ? "" : ` ${MONTHS[start.getMonth()].slice(0, 3)}`
    }–${last.getDate()} ${MONTHS[last.getMonth()].slice(0, 3)} ${last.getFullYear()}`;
    compareLabel = "vs vorige week";
  } else {
    start = new Date(base.getFullYear(), base.getMonth(), 1);
    end = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    prevStart = new Date(base.getFullYear(), base.getMonth() - 1, 1);
    prevEnd = start;
    label = `${MONTHS[start.getMonth()]} ${start.getFullYear()}`;
    compareLabel = "vs vorige maand";
  }

  return {
    start: start.getTime(),
    end: end.getTime(),
    prevStart: prevStart.getTime(),
    prevEnd: prevEnd.getTime(),
    label,
    compareLabel,
    days: listDays(start, end),
  };
};

// Moves the anchor date one period forward (step = 1) or back (step = -1).
export const shiftDate = (view, date, step) => {
  if (view === "day") return addDays(date, step);
  if (view === "week") return addDays(date, step * 7);
  return new Date(date.getFullYear(), date.getMonth() + step, 1);
};

export default getPeriodRange;
