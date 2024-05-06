import React from "react";
import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentList from "../../doctor/DoctorSettings/AppointmentListDoctor";
import PaymentList from "../../../components/PaymentList";
import BasicUserSettings from "../../../components/BasicUserSettings";
import AccountCard from "../../../components/AccountCards/PatientAccountCard";
import AddPatientProfile from "./AddPatientProfile";
import useUserApi from "../../../api/user";
import usePatientApi from "../../../api/patient";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function PatientProfile() {
  const userRole = "";
  const { updateUser } = useUserApi();
  const { getPatientProfile, updatePatient } = usePatientApi();
  const location = useLocation();
  const [profileId, setProfileId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.profileId) {
      // Navigate to a different route or show an error message
      navigate("/auth/admin/viewAllPatients");
    } else {
      const { profileId } = location.state;
      setProfileId(profileId);
    }
  }, []);
  const SingleProfileQuery = useQuery({
    queryKey: ["Patient", { id: profileId }],
    queryFn: () => getPatientProfile({ id: profileId }),
  });

  if (SingleProfileQuery.status === "loading") return <h1>Loading...</h1>;
  if (SingleProfileQuery.status === "error") {
    return <h1>{JSON.stringify(SingleProfileQuery.error)}</h1>;
  }
  const profileData = SingleProfileQuery.data;
  const userInfo = profileData.userId;

  return (
    <>
      <Container>
        <Row bg="white">
          <Col lg={4}>
            <AccountCard profileData={profileData} />
          </Col>
          <Col lg={8}>
            <Row>
              <Col lg={12}>
                <Tabs defaultActiveKey="Profile" id="dashboard-tabs">
                  <Tab eventKey="Profile" title="Profile">
                    <Row>
                      <Col>Introduction</Col>
                    </Row>
                    <Row>
                      <Col lg={6}>
                        <AppointmentList />
                      </Col>
                      <Col lg={6}>
                        <PaymentList />
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="ProfileSettings" title="ProfileSettings">
                    <Row>
                      <BasicUserSettings
                        userInfo={userInfo}
                        updateUser={updateUser}
                      />
                      <AddPatientProfile
                        profileData={profileData}
                        updateProfile={updatePatient}
                      />
                    </Row>
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PatientProfile;
