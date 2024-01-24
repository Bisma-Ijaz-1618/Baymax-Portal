import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  momentLocalizer,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = momentLocalizer(moment);

const events = [
  {
    title: "Big Meeting",
    allDay: false,
    start: moment("2024-01-24T10:00:00").toDate(),
    end: moment("2024-01-24T11:00:00").toDate(),
  },
  {
    title: "Vacation",
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23),
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [newEvent, setNewEvent] = useState({
    title: "Available",
    start: "",
    end: "",
  });
  const [allEvents, setAllEvents] = useState(events);

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      /*
           console.log(d1 <= d2);
           console.log(d2 <= d3);
           console.log(d1 <= d4);
           console.log(d4 <= d3);
             */
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    }
    setAllEvents([...allEvents, newEvent]);
  }
  function handleRemoveEvent(eventToRemove) {
    const updatedEvents = allEvents.filter((event) => event !== eventToRemove);
    setAllEvents(updatedEvents);
  }
  return (
    <Container className="">
      <h1>Schedule</h1>

      <Row>
        <Col>
          <Tabs
            id="controlled-tabs"
            activeKey={activeTab}
            onSelect={handleTabSelect}
          >
            <Tab eventKey="tab1" title="View Schedule">
              <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                className="calendar"
              />
            </Tab>
            <Tab eventKey="tab2" title="Edit Available Slots">
              <Container>
                <h2>Add New Slot</h2>
                <Row className="text-center justify-content-center">
                  <Col className="col-md-3 align-items-center">
                    <DatePicker
                      placeholderText="Start Date and Time"
                      style={{ marginRight: "10px" }}
                      selected={newEvent.start}
                      onChange={(start) => setNewEvent({ ...newEvent, start })}
                      showTimeSelect
                      dateFormat="Pp" // This format will include both date and time
                    />
                  </Col>
                  <Col className="col-md-3">
                    <DatePicker
                      placeholderText="End Date and Time"
                      style={{ marginRight: "10px" }}
                      selected={newEvent.end}
                      onChange={(end) => setNewEvent({ ...newEvent, end })}
                      showTimeSelect
                      dateFormat="Pp" // This format will include both date and time
                    />
                  </Col>
                  <Col className="col-md-3 text-center">
                    <Button
                      className="calendar-button mx-auto"
                      onClick={handleAddEvent}
                    >
                      Add Event
                    </Button>
                  </Col>
                </Row>
              </Container>{" "}
              <Container>
                <h2>Available Slots</h2>
                <Row>
                  {allEvents.map((event, index) => (
                    <Col className="px-3 py-1 col-md-6 calendar-list">
                      <Row className=" px-3 py-1 water-bg white-color align-items-center">
                        <Col className="col-md-10">
                          <Row>{event.title}</Row>
                          <Row>{format(event.start, "PP")} </Row>
                          <Row className="">
                            {format(event.start, "p")} to{" "}
                            {format(event.end, "p")}
                          </Row>
                        </Col>
                        <Col className="text-end col-md-2 ">
                          <Button
                            variant="link"
                            className="calendar-trashcan"
                            onClick={() => handleRemoveEvent(event)}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="white-color"
                            />
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  ))}
                </Row>
              </Container>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
