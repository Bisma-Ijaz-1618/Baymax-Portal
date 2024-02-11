import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState, useEffect } from "react";
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
import useDoctorApi from "../../../../api/doctor"; // Adjust the path accordingly
import useAuth from "../../../../hooks/useAuthHook";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = momentLocalizer(moment);

function App() {
  const DoctorApi = useDoctorApi(); // Initialize the DoctorApi

  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState("tab1");
  const [newEvent, setNewEvent] = useState({
    title: "Available",
    start: "",
    end: "",
  });
  const [allEvents, setAllEvents] = useState([]);
  console.log();

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  useEffect(() => {
    DoctorApi.getEventList()
      .then((events) => {
        console.log("in get event ", events);
        events[0] != null
          ? setAllEvents(
              events.map((event) => ({
                ...event,
                title: "Available",
                start: new Date(event.start),
                end: new Date(event.end),
              }))
            )
          : setAllEvents([]);
      })
      .catch((error) => {
        console.error("Failed to fetch events:", error.message);
      });
  }, []);

  function handleAddEvent() {
    // Assuming you have access to the doctorId and eventData
    const eventData = {
      start: newEvent.start,
      end: newEvent.end,
    };

    console.log("I AM IN HANDLE ADD EVENT", eventData, newEvent);
    // Check for event clash
    for (let i = 0; i < allEvents.length; i++) {
      console.log("LOOP", allEvents);
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }

    // Add event using the Axios function
    console.log(eventData);
    DoctorApi.addEvent(eventData)
      .then((addedEvent) => {
        setAllEvents([
          ...allEvents,
          {
            ...addedEvent,
            title: "Available",
            start: new Date(addedEvent.start),
            end: new Date(addedEvent.end),
          },
        ]);
      })
      .catch((error) => {
        console.error("Failed to add event:", error.message);
      });
  }
  function handleRemoveEvent(event) {
    DoctorApi.deleteEvent(event)
      .then(() => {
        // Filter out the deleted event from allEvents
        const updatedEvents = allEvents.filter((e) => e !== event);
        setAllEvents(updatedEvents);
      })
      .catch((error) => {
        console.error("Failed to delete event:", error.message);
      });
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
                  {allEvents.length > 0 ? (
                    allEvents.map(
                      (event, index) => (
                        console.log("Event ISSS", event),
                        (
                          <Col className="px-3 py-1 col-md-6 calendar-list">
                            <Row className=" px-3 py-1 water-bg white-color align-items-center">
                              <Col className="col-md-10">
                                <Row>Available Slot</Row>
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
                        )
                      )
                    )
                  ) : (
                    <></>
                  )}
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
