// api.js

const Objects = {};

Objects.DateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
};

Objects.TimeOptions = {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export default Objects;
