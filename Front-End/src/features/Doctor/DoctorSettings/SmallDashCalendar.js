import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { FaPhoneSlash, FaHourglassHalf } from "react-icons/fa";

import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = momentLocalizer(moment);

function CustomCalendarComponent({ allEvents }) {
  return (
    <>
      <div className="calendar-component">
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          views={["month", "week", "day"]}
        />
      </div>
      <div className="mt-2 mx-1 d-flex flex-row align-items-center justify-content-center">
        <div className="m-auto px-3 pill d-flex flex-row grey-bg align-items-center justify-content-center">
          <FaPhoneSlash className="mx-1 p-1 fire-bg white-color pill-icon" />
          <div>3 Missed Calls</div>
        </div>
        <div className="m-auto px-3 pill d-flex flex-row grey-bg align-items-center justify-content-center">
          <FaHourglassHalf className="mx-1 p-1 water-bg white-color pill-icon" />
          <div>2 Appointments</div>
        </div>
      </div>
    </>
  );
}

export default CustomCalendarComponent;
