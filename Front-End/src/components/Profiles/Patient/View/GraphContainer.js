import React, { useState } from "react";
import { Button, Container, Row, Col, Card, Stack } from "react-bootstrap";
import LineGraph from "./LineGraph";
import CombinedGraph from "./CombinedGraph";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ErrorComponent from "../../../General/Error";
import LoadingComponent from "../../../General/Loading";
const Dashboard = () => {
  const [isTimeLapse, setIsTimeLapse] = useState(false);
  const [isCombined, setIsCombined] = useState(false);
  const { recordId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const myRecordById = useQuery({
    queryKey: ["PatientRecords", recordId],
    queryFn: async () => {
      try {
        const response = await axiosPrivate.get(
          `Kit/PatientRecords/View/${recordId}`
        );
        console.log("response.data of record by Id", response.data);
        return response.data || [];
      } catch (err) {
        console.log("error in getting myrecords", err);
      }
    },
  });
  if (myRecordById.isError) {
    return <ErrorComponent />;
  }
  if (myRecordById.isLoading) {
    return <LoadingComponent />;
  }
  const toggleTimeLapse = () => {
    setIsTimeLapse((prevState) => !prevState);
  };
  const toggleCombined = () => {
    setIsCombined((prevState) => !prevState);
  };
  return (
    <Container fluid className="py-4 px-2">
      <Stack direction="horizontal" className="m-0 p-0 pe-1" gap={0}>
        <div className="p-2">
          {" "}
          <h2>View Record : </h2>
        </div>
        <div className="p-2">
          <h4 className="m-0 p-0 font-size-small text-muted">
            {" " + myRecordById.data[0]._id}
          </h4>
        </div>
        <div className=" p-2 mx-2 ms-auto">
          <Button
            className="p-0 m-0 water-bg px-2"
            onClick={() => toggleTimeLapse()}
          >
            {isTimeLapse ? "View Static" : "View Time Lapse"}
          </Button>
        </div>
        <div>
          <Button
            className="p-0 m-0 water-bg px-2"
            onClick={() => toggleCombined()}
          >
            {isCombined ? "View Individual" : "View Combined"}
          </Button>
        </div>
      </Stack>
      {isCombined ? (
        <>
          <Row className=" w-100 h-50 justify-content-center align-items-center">
            <CombinedGraph
              HRvalues={myRecordById.data[0].HR.values}
              BRvalues={myRecordById.data[0].BR.values}
              SPO2values={myRecordById.data[0].SPO2.values}
              Temperaturevalues={myRecordById.data[0].Temperature.values}
              isTimeLapse={isTimeLapse}
            />
          </Row>
        </>
      ) : (
        <>
          <Row className=" w-100 h-50 justify-content-center align-items-center">
            <Col lg={5} className=" flex-fill p-2">
              <Card>
                <Card.Header className=" white-color fire-bg text-center">
                  Heart Rate
                </Card.Header>
                <Card.Body>
                  <LineGraph
                    values={myRecordById.data[0].HR.values}
                    yMax={150}
                    yLabel={"Beats Per Minute (BPM)"}
                    isTimeLapse={isTimeLapse}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5} className=" flex-fill p-2">
              <Card>
                <Card.Header className=" white-color lightblue-bg text-center">
                  SpO2
                </Card.Header>
                <Card.Body>
                  <LineGraph
                    values={myRecordById.data[0].SPO2.values}
                    yMax={110}
                    yLabel={"Percentage (%)"}
                    isTimeLapse={isTimeLapse}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className=" w-100 h-50 justify-content-center align-items-center">
            <Col lg={5} className=" flex-fill p-2">
              <Card>
                <Card.Header className=" white-color green-bg text-center">
                  Temperature
                </Card.Header>
                <Card.Body>
                  <LineGraph
                    values={myRecordById.data[0].Temperature.values}
                    yMax={45}
                    yLabel={"Celcius (C)"}
                    isTimeLapse={isTimeLapse}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={5} className=" flex-fill p-2" s>
              <Card>
                <Card.Header className=" white-color purple-bg text-center">
                  Breathing Rate
                </Card.Header>
                <Card.Body>
                  <LineGraph
                    values={myRecordById.data[0].BR.values}
                    yMax={30}
                    yLabel={"Breaths Per Minute (BPM)"}
                    isTimeLapse={isTimeLapse}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
