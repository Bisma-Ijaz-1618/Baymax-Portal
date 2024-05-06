import { useState } from "react";
import { Tabs, Tab, Container, Row, Col, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import AppointmentList from "../../doctor/DoctorSettings/AppointmentListDoctor";
import BasicUserSettings from "../../../components/BasicUserSettings";
import AccountCard from "../../../components/AccountCards/DoctorAccountCard";
import AddDoctorProfile from "./AddDoctorProfile";
import useUserApi from "../../../api/user";
import useDoctorApi from "../../../api/doctor";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
function DoctorProfile() {
  return <></>;
  // let pfId = "";
  const navigate = useNavigate();

  const { updateUser } = useUserApi();
  const { getDoctorProfile, updateDoctor } = useDoctorApi();
  const [profileId, setProfileId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state.profileId) {
      // Navigate to a different route or show an error message
      navigate("/auth/admin/viewAllDoctors");
    } else {
      const { profileId } = location.state;
      setProfileId(profileId);
    }
  }, []);

  const SingleProfileQuery = useQuery({
    queryKey: ["Doctor", { id: profileId }],
    queryFn: () => getDoctorProfile({ id: profileId }),
    enabled: profileId !== null,
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
                      <AppointmentList />
                    </Row>
                  </Tab>
                  <Tab eventKey="ProfileSettings" title="ProfileSettings">
                    <Row>
                      <BasicUserSettings
                        userInfo={userInfo}
                        updateUser={updateUser}
                      />
                      <AddDoctorProfile
                        profileData={profileData}
                        updateProfile={updateDoctor}
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

export default DoctorProfile;
