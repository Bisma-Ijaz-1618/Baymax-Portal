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

const LineGraph = ({ values, yMax, yLabel, isTimeLapse }) => {
  const [data, setData] = useState([{ time: 0, value: 0 }]);
  const [finished, setFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const displayNextValue = () => {
    if (values.length === data.length) {
      setFinished(false);
    } else {
      const newData = {
        time: data[data.length - 1].time + 3,
        value: values[data.length - 1],
      };
      setData((prevData) => [...prevData, newData]); // Append new data point
    }
  };

  useEffect(() => {
    let interval;
    if (isGenerating) {
      interval = setInterval(displayNextValue, 3000);
    }
    return () => clearInterval(interval);
  }, [data, isGenerating]);

  useEffect(() => {
    if (!isTimeLapse) {
      const newDataArray = [];
      for (let i = 0; i < values.length; i++) {
        const newData = {
          time: 3 * i + 3, // Increment time accordingly
          value: values[i], // Set the value property to the corresponding value from the values array
        };
        newDataArray.push(newData);
      }
      setData([...newDataArray]);
    } else {
      setData([{ time: 0, value: 0 }]);
    }
  }, [isTimeLapse]);

  const toggleGeneration = () => {
    setIsGenerating((prevState) => !prevState);
  };

  return (
    <div style={{ position: "relative", width: "100%", overflowX: "auto" }}>
      <LineChart width={data.length * 60 + 400} height={200} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, "auto"]}
          label={"time/s"}
        />

        <YAxis domain={[0, yMax]} />
        <Legend align="left" verticalAlign="top" className="mx-0" height={36} />

        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name={yLabel}
        />
      </LineChart>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        {isTimeLapse ? (
          <Button
            onClick={toggleGeneration}
            className="water-bg white-color px-2 py-0"
            disabled={finished}
          >
            {isGenerating ? "Stop" : "Start"}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LineGraph;
