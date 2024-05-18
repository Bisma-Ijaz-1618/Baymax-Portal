import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  Container,
  Row,
  Col,
  Form,
  Table,
  Stack,
  ProgressBar,
} from "react-bootstrap";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { formatStartTime } from "../../../../utils/dateUtil";
import { FaEye } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
const RecordList = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const myRecordList = useQuery({
    queryKey: ["PatientRecords", id],
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get(`Kit/PatientRecords/All/${id}`);
        console.log("response.data", response.data);
        return response.data || [];
      } catch (err) {
        console.log("error in getting myrecords", err);
      }
    },
  });

  const handleReset = (e) => {
    setSelectedDate("");
    e.preventDefault();
    console.log("in reset");
  };

  const recordsGivenDate = useQuery({
    queryKey: ["MyRecords", selectedDate],
    enabled: myRecordList.isSuccess,
    queryFn: async () => {
      try {
        if (selectedDate) {
          console.log("no date only username");
          const selectedRecords = myRecordList.data.filter((record) => {
            // Extract the date part from record.startTime
            const recordStartDate = new Date(record.startTime);
            const recordDate = recordStartDate.toISOString().split("T")[0]; // Extract YYYY-MM-DD format

            // Extract the date part from selectedDate
            const selectedDateObj = new Date(selectedDate);
            const selectedDateStr = selectedDateObj.toISOString().split("T")[0]; // Extract YYYY-MM-DD format

            // Compare the dates
            return recordDate === selectedDateStr;
          });
          return selectedRecords;
        } else {
          console.log("none");
          return myRecordList.data || [];
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    onSuccess: (data) => {
      console.log("QUERY DATA", data);
    },
    onError: (err) => {
      console.log("QUERY Error", err);
    },
  });

  if (myRecordList.isLoading) {
    return <div>Loading...</div>;
  }

  if (myRecordList.isError) {
    return <div>Error: {"There was an error fetching data"}</div>;
  }
  const getVariant = (status) => {
    switch (status) {
      case "normal":
      case "none":
        return "success";
      case "risky":
        return "warning";
      case "critical":
        return "danger";
      default:
        return "success"; // Default variant if status is not recognized
    }
  };
  const handleViewClick = (recordId) => {
    navigate(`/auth/doctor/viewRecord/${recordId}`);
  };
  const fillTable = () => {
    return (
      <Table className="p-0 m-0" bordered hover>
        <thead className="text-center">
          <tr>
            <th>Sr</th>
            <th>Date</th>
            <th>Time</th>
            <th>Readings</th>
            <th>Heart Rate</th>
            <th>Temperature</th>
            <th>SPO2</th>
            <th>Breathing Rate</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {recordsGivenDate.data &&
            recordsGivenDate?.data?.map((record, index) => {
              return (
                <tr key={index}>
                  <td classNmae="text-center align-middle">{index || "N/A"}</td>
                  <td classNmae="text-center">
                    {record.startTime ? (
                      <>{formatStartTime(record.startTime).date}</>
                    ) : (
                      "N/a"
                    )}
                  </td>
                  <td classNmae="text-center">
                    {record.startTime ? (
                      <>
                        {" "}
                        <>
                          {formatStartTime(record.startTime).time} -{" "}
                          {formatStartTime(record.endTime).time}
                        </>
                      </>
                    ) : (
                      "N/a"
                    )}
                  </td>

                  <td classNmae="text-center">{record.HR.values.length}</td>
                  <td classNmae="text-center vertical-align">
                    <div className="h-100 m-auto d-flex felx-row align-items-center justify-content-center">
                      <div>
                        <ProgressBar
                          now={100}
                          variant={getVariant(record.HR.status)}
                          className="mini-circle me-2"
                        />
                      </div>
                      <div>{record.HR.abnormality}</div>
                    </div>
                  </td>
                  <td classNmae="text-center">
                    <div className="d-flex felx-row align-items-center justify-content-center">
                      <div>
                        <ProgressBar
                          now={100}
                          variant={getVariant(record.Temperature.status)}
                          className="mini-circle me-2"
                        />
                      </div>
                      <div>{record.Temperature.abnormality}</div>
                    </div>
                  </td>
                  <td classNmae="text-center">
                    <div className="d-flex felx-row align-items-center justify-content-center">
                      <div>
                        <ProgressBar
                          now={100}
                          variant={getVariant(record.SPO2.status)}
                          className="mini-circle me-2"
                        />
                      </div>
                      <div>{record.SPO2.abnormality}</div>
                    </div>
                  </td>
                  <td classNmae="text-center">
                    <div className="d-flex felx-row align-items-center justify-content-center">
                      <div>
                        <ProgressBar
                          now={100}
                          variant={getVariant(record.BR.status)}
                          className="mini-circle me-2"
                        />
                      </div>
                      <div>{record.BR.abnormality}</div>
                    </div>
                  </td>
                  <td classNmae="text-center">
                    <Button
                      onClick={() => {
                        handleViewClick(record._id);
                      }}
                      className="water-color profile-section-btn"
                    >
                      <FaEye />
                    </Button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td colSpan={9} align="center">
              {"<< "}No More Items To Show{" >>"}
            </td>
          </tr>
        </tbody>
      </Table>
    );
  };
  return (
    <Container>
      <Row className="my-3 d-flex flex-row justify content-stretch">
        <Col md={12}>
          <Card className=" h-100 white-bg m-0 p-0">
            <Card.Header className="white-bg px-0 d-flex justify-content-between align-items-center ">
              <Row className="w-100 p-0 m-0">
                <Stack direction="horizontal" gap={3}>
                  <div className="p-0 m-0">
                    <h2 className="m-0 p-0">Available Records</h2>
                  </div>

                  <div className="p-0 m-0 ms-auto">
                    <Form.Group controlId="dateFilter" className="m-0">
                      <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        max={new Date().toISOString().split("T")[0]}
                      />
                    </Form.Group>
                  </div>
                  <div className="p-0 m-0">
                    <Button
                      className="water-bg py-1 px-2 my-0"
                      type="submit"
                      onClick={handleReset}
                    >
                      Reset
                    </Button>
                  </div>
                </Stack>
              </Row>
            </Card.Header>
            <Card.Body className="p-0 m-0">
              {" "}
              <Row className="p-2 d-flex flex-row justify-content-center align-items-center">
                <Col md="auto">Key: </Col>

                <Col md={2} className="mx-2  rounded green-bg h-80">
                  {" "}
                  Normal
                </Col>
                <Col md={2} className="mx-2  rounded yellow-bg h-80">
                  {" "}
                  Risky
                </Col>
                <Col md={2} className="mx-2  rounded fire-bg h-80">
                  {" "}
                  Critical
                </Col>
              </Row>
              {fillTable()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordList;
