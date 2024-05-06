import format from "date-fns/format";
import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Container, Tabs, Tab, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useDoctorAppointmentsApi from "../../../../api/Doctor/doctorAppointments"; // Adjust the path accordingly
import { useQuery } from "@tanstack/react-query";
const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = momentLocalizer(moment);

function App() {
  const DoctorAppointmentsApi = useDoctorAppointmentsApi();
  const [activeTab, setActiveTab] = useState("tab1");
  const [newEvent, setNewEvent] = useState({
    title: "Available",
    start: "",
    end: "",
  });
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  function handleForm() {
    // Convert selected date and time to ISO strings
    const start = new Date(`${selectedDate}T${selectedTime}`).toISOString();

    // Calculate end time by adding an hour to the start time
    const end = new Date(start);
    end.setHours(end.getHours() + 1);
    const endISOString = end.toISOString();

    // Create event data object
    const eventData = {
      start,
      end: endISOString,
    };

    // Check for event clash
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(endISOString);
      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        return;
      }
    }

    // Add event using the Axios function
    DoctorAppointmentsApi.addEvent(eventData)
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

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };
  //get event
  useEffect(() => {
    DoctorAppointmentsApi.getEventList()
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

  function handleRemoveEvent(event) {
    DoctorAppointmentsApi.deleteEvent(event)
      .then(() => {
        // Filter out the deleted event from allEvents
        const updatedEvents = allEvents.filter((e) => e !== event);
        setAllEvents(updatedEvents);
      })
      .catch((error) => {
        console.error("Failed to delete event:", error.message);
      });
  }
  const allAppointmentList = DoctorAppointmentsApi.allDoctorAppointmentsQuery
    .isFetching
    ? []
    : DoctorAppointmentsApi.allDoctorAppointmentsQuery.data;

  return (
    <Container className="">
      <h2 className="mt-2">Your Schedule</h2>
      <Row className="p-0 my-0 d-flex flex-column justify-content-start align-items-start">
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
                style={{ width: "100%", height: "500px" }} // Adjust width and height as needed
              />
            </Tab>
            <Tab eventKey="tab2" title="Edit Available Slots">
              <h3 className="my-2 mx-0">Add New Slot</h3>
              <Container>
                <Row className="d-flex flex-row justify-content-start align-items-center">
                  <Col md="auto" className="p-0 mx-1">
                    <Form.Group controlId="dateFilter">
                      <Form.Control
                        type="date"
                        name="date"
                        onChange={(e) => setSelectedDate(e.target.value)}
                        value={selectedDate}
                      />
                    </Form.Group>
                  </Col>
                  <Col md="auto" className="p-0 mx-1">
                    <Form.Group controlId="timeFilter">
                      <Form.Control
                        as="select"
                        name="time"
                        onChange={(e) => setSelectedTime(e.target.value)}
                        value={selectedTime}
                      >
                        {[...Array(24).keys()].map((hour) => (
                          <option
                            key={hour}
                            value={`${hour < 10 ? "0" : ""}${hour}:00`}
                          >
                            {`${hour < 10 ? "0" : ""}${hour}:00`}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col md="auto" className="mx-1 p-0">
                    <Button className="water-bg m-0" onClick={handleForm}>
                      Add Event
                    </Button>
                  </Col>
                </Row>
              </Container>{" "}
              <Container>
                <h3 className="py-2 m-0">Available Slots</h3>
                <Row>
                  {allEvents.length > 0 ? (
                    allEvents.map(
                      (event, index) => (
                        console.log("Event ISSS", event),
                        (
                          <Col className="px-3 py-1 col-md-6 calendar-list">
                            <Row className=" px-3 py-1 border rounded white-bg black-color align-items-center">
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
                                    className="water-color"
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
