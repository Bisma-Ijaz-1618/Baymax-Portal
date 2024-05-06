import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaUser, FaFileMedical, FaMoneyBill } from "react-icons/fa";
import { BsCalendar, BsChatDots } from "react-icons/bs";
import IconStatsCard from "../../../components/DashBoardComponents/IconStatsCard";
export default function WeeklyReport() {
  return (
    <>
      <Row className="">
        <h4>Weekly Report</h4>
        <IconStatsCard
          name="Patients"
          number={24}
          iconColor="lightblue-bg"
          icon={FaUser}
        />
        <IconStatsCard
          name="Appointments"
          number={35}
          iconColor="green-bg"
          icon={BsCalendar}
        />
        <IconStatsCard
          name="Messages"
          number={12}
          iconColor="fire-bg"
          icon={BsChatDots}
        />
        <IconStatsCard
          name="Reports"
          number={3}
          iconColor="water-bg"
          icon={FaFileMedical}
        />
        {/* <IconStatsCard
          name="Income"
          number={1234}
          iconColor="purple-bg"
          icon={FaMoneyBill}
        /> */}
        {/* <IconStatsCard
        name="Invoices"
        number={6}
        iconColor="yellow-bg"
        icon={FaFileInvoice}
      /> */}
      </Row>
    </>
  );
}
