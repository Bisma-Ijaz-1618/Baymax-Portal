import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  FaHeartbeat,
  AiOutlineFile,
  FaFileMedical,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa";
import { BsCalendar, BsChatDots } from "react-icons/bs";
import IconStatsCard from "../../../components/DashBoardComponents/IconStatsCard";
export default function WeeklyReport() {
  return (
    <>
      <Row className="">
        <h4>Weekly Report</h4>
        <IconStatsCard
          name="Doctors"
          number={3}
          iconColor="water-bg"
          icon={FaUser}
        />
        <IconStatsCard
          name="Messages"
          number={12}
          iconColor="green-bg"
          icon={BsChatDots}
        />
        <IconStatsCard
          name="Blood Group"
          number={"O-"}
          iconColor="fire-bg"
          icon={BsChatDots}
        />
        <IconStatsCard
          name="Reports"
          number={3}
          iconColor="purple-bg"
          icon={FaFileMedical}
        />
      </Row>
    </>
  );
}
