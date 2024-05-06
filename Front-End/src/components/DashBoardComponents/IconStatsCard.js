import React from "react";
import { Card } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import IconComponent from "./IconComponent";
function DashboardCard({ name, number, iconColor, icon }) {
  return (
    <Card text="dark" className="my-3 mx-2 text-center dash-icon-card">
      <IconComponent iconColor={iconColor} Icon={icon} />
      <Card.Header className="dash-icon-card"></Card.Header>
      <Card.Body className="dash-icon-card-body">
        <Card.Title>
          <h5>{name}</h5>
          <h4>{number}</h4>
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;
