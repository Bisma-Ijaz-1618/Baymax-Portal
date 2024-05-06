import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Button } from "react-bootstrap";

const LineGraph = () => {
  const [data, setData] = useState([{ time: 0, value: 0 }]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to generate random data
  const generateRandomData = () => {
    const newData = {
      time: data[data.length - 1].time + 3,
      value: Math.floor(Math.random() * 100),
    };
    setData((prevData) => [...prevData, newData]); // Append new data point
  };

  useEffect(() => {
    // Generate random data if isGenerating is true
    let interval;
    if (isGenerating) {
      interval = setInterval(generateRandomData, 3000);
    }

    // Cleanup interval
    return () => clearInterval(interval);
  }, [data, isGenerating]);

  // Handler to toggle data generation
  const toggleGeneration = () => {
    setIsGenerating((prevState) => !prevState);
  };

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
      <LineChart width={data.length * 60} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" type="number" domain={[0, "auto"]} />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      <Button
        style={{ position: "absolute", top: "10px", right: "10px" }}
        onClick={toggleGeneration}
        className="water-bg white-color"
      >
        {isGenerating ? "Stop" : "Start"}
      </Button>
    </div>
  );
};

export default LineGraph;
