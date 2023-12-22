import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  faEnvelope,
  faUsers,
  faFileMedical,
  faCalendar,
  faPrescription,
  faMedkit,
  faLaptop,
  faDiagnoses,
  faComments,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SectionFeatures = () => {
  return (
    <Container fluid className="section-features">
      <Row className=" justify-content-center align-items-center py-4">
        <Col className=" col-md-6 section-feature-heading">
          <h1 className="text-center">What We Do For You/System Features</h1>
        </Col>
      </Row>
      <Row className="text-left justify-content-center align-items-center">
        {/* Column 1 */}
        <Col
          md="3"
          className="justify-content-center align-items-center section-feature-feature text-center px-3"
        >
          <Row className="align-items-center">
            <Col>
              <FontAwesomeIcon
                className="p-3 section-features-icon"
                icon={faMedkit}
                size="3x"
              />
            </Col>
            <h3 className="feature-heading">Baymax Kit</h3>
          </Row>
          <h5 className="py-4">
            Necessary medical equipment for at-home monitoring (e.g., blood
            pressure monitor, thermometer, pulse oximeter).{" "}
          </h5>
        </Col>
        <Col
          md="3"
          className="justify-content-center align-items-center section-feature-feature text-center px-3"
        >
          <Row className="align-items-center">
            <Col>
              <FontAwesomeIcon
                className="p-3 section-features-icon"
                icon={faDiagnoses}
                size="3x"
              />
            </Col>
            <h3 className="feature-heading">Diagnostic Insights</h3>
          </Row>
          <h5 className="py-4">
            Algorithms for analyzing sensor data and generating diagnostic
            insights. Integration with medical databases for reference and
            comparison.{" "}
          </h5>
        </Col>
        <Col
          md="3"
          className="justify-content-center align-items-center section-feature-feature text-center px-3"
        >
          <Row className="align-items-center">
            <Col>
              <FontAwesomeIcon
                className="p-3 section-features-icon"
                icon={faLaptop}
                size="3x"
              />
            </Col>
            <h3 className="feature-heading">Baymax Portal</h3>
          </Row>
          <h5 className="py-4">
            The platform offers secure access, real-time data visualization, and
            communication tools (messaging, video consultations). It includes an
            alert system for critical data notifications.{" "}
          </h5>
        </Col>
      </Row>
      <Row className="text-left justify-content-center align-items-center ">
        {/* Column 1 */}
        <Col
          md="3"
          className="justify-content-center align-items-center section-feature-feature text-center px-3"
        >
          <Row className="align-items-center">
            <Col>
              <FontAwesomeIcon
                className="p-3 section-features-icon"
                icon={faComments}
                size="3x"
              />
            </Col>
            <h3 className="feature-heading">Communication Channels</h3>
          </Row>
          <h5 className="py-4">
            Communication tools include secure messaging, video consultations,
            and a notification system for appointments and updates.{" "}
          </h5>
        </Col>
        <Col
          md="3"
          className="justify-content-center align-items-center section-feature-feature text-center px-3"
        >
          <Row className="align-items-center">
            <Col>
              <FontAwesomeIcon
                className="p-3 section-features-icon"
                icon={faShield}
                size="3x"
              />
            </Col>
            <h3 className="feature-heading">Security</h3>
          </Row>
          <h5 className="py-4">
            Implementing stringent security measures, the system ensures safe
            and confidential storage of sensitive data. This includes
            encryption, access controls, and ongoing monitoring to maintain
            compliance with data protection standards.{" "}
          </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default SectionFeatures;
