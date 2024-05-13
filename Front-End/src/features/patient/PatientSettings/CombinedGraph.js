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

const LineGraph = ({
  HRvalues,
  BRvalues,
  SPO2values,
  Temperaturevalues,
  isTimeLapse,
}) => {
  const [data, setData] = useState([
    { time: 0, BR: 0, HR: 0, SPO2: 0, Temperature: 0 },
  ]);
  const [finished, setFinished] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const displayNextValue = () => {
    if (HRvalues.length === data.length) {
      setFinished(false);
    } else {
      const newData = {
        time: data[data.length - 1].time + 3,
        BR: BRvalues[data.length - 1],
        HR: HRvalues[data.length - 1],
        SPO2: SPO2values[data.length - 1],
        Temperature: Temperaturevalues[data.length - 1],
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
      for (let i = 0; i < HRvalues.length; i++) {
        const newData = {
          time: 3 * i + 3,
          BR: BRvalues[i],
          HR: HRvalues[i],
          SPO2: SPO2values[i],
          Temperature: Temperaturevalues[i],
        };
        newDataArray.push(newData);
      }
      setData([...newDataArray]);
    } else {
      setData([{ time: 0, BR: 0, HR: 0, SPO2: 0, Temperature: 0 }]);
    }
  }, [isTimeLapse]);

  const toggleGeneration = () => {
    setIsGenerating((prevState) => !prevState);
  };

  return (
    <div
      className="border ms-5 me-3"
      style={{ position: "relative", overflowX: "auto" }}
    >
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
      <LineChart width={data.length * 60 + 1050} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          type="number"
          domain={[0, "auto"]}
          label={"time/s"}
        />
        <YAxis domain={[0, 150]} />
        <Tooltip />
        <Legend align="left" verticalAlign="top" className="mx-0" height={36} />

        <Line
          type="monotone"
          dataKey="HR" // Change dataKey for the first line
          stroke="#8884d8" // Change stroke color for the first line
          activeDot={{ r: 8 }}
          name="Beats Per Minute (BPM)"
        />
        <Line
          type="monotone"
          dataKey="BR" // Change dataKey for the second line
          stroke="#82ca9d" // Change stroke color for the second line
          activeDot={{ r: 8 }}
          name="Breaths Per Minute (BPM)"
        />
        <Line
          type="monotone"
          dataKey="SPO2" // Change dataKey for the third line
          stroke="#ffc658" // Change stroke color for the third line
          activeDot={{ r: 8 }}
          name="SP02(%)"
        />
        <Line
          type="monotone"
          dataKey="Temperature" // Change dataKey for the fourth line
          stroke="#ff7f0e" // Change stroke color for the fourth line
          activeDot={{ r: 8 }}
          name="Beats Per Minute (C)"
        />
      </LineChart>
    </div>
  );
};

export default LineGraph;
