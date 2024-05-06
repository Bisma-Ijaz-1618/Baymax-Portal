import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWeight,
  faRulerVertical,
  faCalculator,
} from "@fortawesome/free-solid-svg-icons";

const PatientDashboard = ({ weight, height }) => {
  // Calculate BMI
  const calculateBMI = () => {
    const bmi = weight / (height / 100) ** 2;
    return isNaN(bmi) ? "-" : bmi.toFixed(2);
  };

  // Get BMI category
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 25) return "Normal weight";
    if (bmi >= 25 && bmi < 30) return "Overweight";
    return "Obese";
  };

  // Render BMI icon based on category
  const renderBMIIcon = (bmi) => {
    if (bmi < 18.5)
      return (
        <FontAwesomeIcon icon={faCalculator} style={{ color: "#1E90FF" }} />
      );
    if (bmi >= 18.5 && bmi < 25)
      return (
        <FontAwesomeIcon icon={faCalculator} style={{ color: "#32CD32" }} />
      );
    if (bmi >= 25 && bmi < 30)
      return (
        <FontAwesomeIcon icon={faCalculator} style={{ color: "#FFA500" }} />
      );
    return <FontAwesomeIcon icon={faCalculator} style={{ color: "#FF4500" }} />;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-item">
        <FontAwesomeIcon icon={faWeight} className="dashboard-icon" />
        <div className="dashboard-text">
          <div className="dashboard-value">{weight}</div>
          <div className="dashboard-label">Weight (kg)</div>
        </div>
      </div>
      <div className="dashboard-item">
        <FontAwesomeIcon icon={faRulerVertical} className="dashboard-icon" />
        <div className="dashboard-text">
          <div className="dashboard-value">{height}</div>
          <div className="dashboard-label">Height (cm)</div>
        </div>
      </div>
      <div className="dashboard-item">
        {renderBMIIcon(calculateBMI())}
        <div className="dashboard-text">
          <div className="dashboard-value">{calculateBMI()}</div>
          <div className="dashboard-label">BMI</div>
        </div>
        <div className="dashboard-category">
          {getBMICategory(calculateBMI())}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
