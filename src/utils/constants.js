const addHours = function (date = new Date(), hours = 1) {
  const a = date;
  a.setHours(a.getHours() + hours);
  return a;
};

// Format Date
const fd = (date = new Date()) => {
  const d = {
    year: "",
    month: "",
    day: ""
  };
  d.year = date.getFullYear();
  d.month = date.getMonth() + 1;
  d.day = date.getDate();
  if (+d.day <= 9) {
    d.day = `0${d.day}`;
  }
  if (+d.month <= 9) {
    d.month = `0${d.month}`;
  }
  return `${d.year}-${d.month}-${d.day}`;
};
let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const addOneDay = () => {
  // Create new Date instance
  var date = new Date();
  // Add a day
  return new Date(date.setDate(date.getDate() + 1));
};

const tomorrow = addOneDay();
const one_pm = todayStr + "T13:00:00";
const INITIAL_EVENTS = [
  {
    id: createEventId(),
    title: "All-day event",
    start: todayStr,
    start_date: todayStr,
    end_date: fd(tomorrow)
  },
  {
    id: createEventId(),
    title: "Timed event",
    start: todayStr + "T12:00:00",
    end: one_pm,
    start_date: todayStr,
    end_date: fd(new Date(one_pm))
  }
];

function createEventId() {
  return String(eventGuid++);
}

export { INITIAL_EVENTS, createEventId, addHours, fd };
