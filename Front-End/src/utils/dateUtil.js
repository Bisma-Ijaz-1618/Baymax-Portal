// Function to convert start time to formatted date and time
export const formatStartTime = (startTime) => {
  const date = new Date(startTime);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  let period = "AM";
  if (hours >= 12) {
    period = "PM";
    if (hours !== 12) {
      hours -= 12;
    }
  }
  const formattedTime = `${hours === 0 ? 12 : hours}:${
    minutes < 10 ? "0" : ""
  }${minutes} ${period}`;

  return { date: formattedDate, time: formattedTime };
};

// Function to convert formatted date and time back to start time
export const parseFormattedStartTime = (formattedDate, formattedTime) => {
  const [day, month, year] = formattedDate.split(" ");
  const [time, period] = formattedTime.split(" ");

  let hours = parseInt(time.split(":")[0], 10);
  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  const startTime = new Date(
    `${year} ${month} ${day} ${hours}:${time.split(":")[1]}:00 UTC`
  );
  return startTime;
};

export const isStartTimeGreaterThanCurrentTime = (startTime) => {
  const currentTime = new Date();
  //start time comes after cuurent time
  return new Date(startTime) > currentTime;
};

export const isCurrentTimeInRange = (sTime) => {
  const startTime = new Date(sTime);

  console.log("we got this start time", startTime);
  if (startTime instanceof Date) {
    console.log("start time is an instance");
    // Get the current time
    const currentTime = new Date();
    // Calculate the end time as startTime + 1 hour
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 1);
    // Check if the current time falls within the range of startTime to endTime
    return currentTime >= startTime && currentTime < endTime;
  } else {
    // If startTime is not a Date object, return false or handle the case accordingly
    return false;
  }
};

// Example usage
const startTime = new Date("2024-04-27T18:24:38.747Z");
const formatted = formatStartTime(startTime);
console.log(formatted); // Output: { date: 'April 27, 2024', time: '6:24 PM' }

const parsedStartTime = parseFormattedStartTime(formatted.date, formatted.time);
console.log(parsedStartTime); // Output: 2024-04-27T18:24:00.000Z
// api.js

const Objects = {};

Objects.DateOptions = {
  weekday: "long",
  year: "long",
  month: "long",
};

Objects.TimeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export default Objects;
