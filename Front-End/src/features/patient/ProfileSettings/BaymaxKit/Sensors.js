import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    spo2: [],
    heartRate: [],
    respirationRate: [],
    bloodPressure: [],
  });

  const handleConnect = (sensor) => {
    const newData = generateRandomData();
    setSensorData({ ...sensorData, [sensor]: newData });
  };

  const generateRandomData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({ time: i, value: Math.floor(Math.random() * 100) });
    }
    return data;
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          <h2>Sensor Dashboard</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>SPO2 Sensor</h4>
          <Button variant="success" onClick={() => handleConnect("spo2")}>
            Connect
          </Button>
          {sensorData.spo2.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={sensorData.spo2}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="SPO2"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Col>
        <Col>
          <h4>Heart Rate Sensor</h4>
          <Button variant="success" onClick={() => handleConnect("heartRate")}>
            Connect
          </Button>
          {sensorData.heartRate.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={sensorData.heartRate}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Heart Rate"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h4>Respiration Rate Sensor</h4>
          <Button
            variant="success"
            onClick={() => handleConnect("respirationRate")}
          >
            Connect
          </Button>
          {sensorData.respirationRate.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={sensorData.respirationRate}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Respiration Rate"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Col>
        <Col>
          <h4>Blood Pressure Sensor</h4>
          <Button
            variant="success"
            onClick={() => handleConnect("bloodPressure")}
          >
            Connect
          </Button>
          {sensorData.bloodPressure.length > 0 && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={sensorData.bloodPressure}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Blood Pressure"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SensorDashboard;
