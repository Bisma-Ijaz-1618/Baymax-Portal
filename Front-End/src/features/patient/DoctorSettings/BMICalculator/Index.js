import React, { useState } from "react";
import { Card } from "react-bootstrap";
import "./index.css";

function App() {
  // state
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState("");
  const [message, setMessage] = useState("");

  let calcBmi = (event) => {
    //prevent submitting
    event.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Please enter a valid weight and height");
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));

      // Logic for message

      if (bmi < 25) {
        setMessage("You are underweight");
      } else if (bmi >= 25 && bmi < 30) {
        setMessage("You are a healthy weight");
      } else {
        setMessage("You are overweight");
      }
    }
  };

  //  show image based on bmi calculation
  let imgSrc;

  if (bmi < 1) {
    imgSrc = require("./assets/default.jpg");
  } else {
    if (bmi < 25) {
      imgSrc = require("./assets/underweight.png");
    } else if (bmi >= 25 && bmi < 30) {
      imgSrc = require("./assets/healthy.png");
    } else {
      imgSrc = require("./assets/overweight.png");
    }
  }

  let reload = () => {
    window.location.reload();
  };

  return (
    <Card className="h-100">
      <Card.Header className="white-bg py-3 ">
        <h5 className="m-0 p-0">BMI Calculator</h5>
      </Card.Header>
      <Card.Body className="d-flex flex-column justify-content-center">
        <form onSubmit={calcBmi}>
          <div className="d-flex flex-row align-items-center justify-content-start">
            <label className="m-0 flex-fill">Weight (lbs)</label>
            <input
              className="p-1 rounded water-border "
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="mt-2 d-flex flex-row align-items-center justify-content-start">
            <label className="flex-fill m-0">Height (in)</label>
            <input
              className="p-1  rounded water-border"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </div>
          <div className="d-flex flex-row align-items-center justify-content-center">
            <button
              className="rounded flex-fill water-bg white-color py-1 px-2 me-3"
              type="submit"
            >
              Submit
            </button>
            <button
              className=" flex-fill rounded water-color water-border white-bg py-1 px-2 "
              onClick={reload}
              type="submit"
            >
              Reload
            </button>
          </div>
        </form>
        <div className="left mt-3">
          <h5>Your BMI is: {bmi}</h5>
          <p>{message}</p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default App;
