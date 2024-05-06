import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import useDoctorProfileApi from "../../../api/Doctor/myProfileDoctor";
import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import {
  FaUser,
  FaMapMarkerAlt,
  FaIdCard,
  FaTransgender,
  FaCalendarAlt,
  FaPhone,
  FaEnvelope,
  FaUserMd,
  FaEdit,
  FaUpload,
  FaSave,
  FaGenderless,
  FaFemale,
  FaServicestack,
  FaSortNumericUpAlt,
  FaRegIdBadge,
  FaAccusoft,
  FaUserTimes,
} from "react-icons/fa";
import { formatStartTime } from "../../../utils/dateUtil";
function Basic() {
  const { GetProfile, uploadProfilePicture, getProfilePicture } =
    useDoctorProfileApi();

  const [profile, setProfile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("image", image);
      await uploadProfilePicture.mutateAsync(formData);
      await getProfilePicture.refetch();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  return (
    <>
      {true && (
        <Row className="mt-3 profile-section white-bg water-border rounded">
          <Row className="py-2 profile-heading-row">
            <Col xs={8}>
              <h4 className="profile-heading-text water-color">
                Personal Information
              </h4>
            </Col>
            <Col
              xs={4}
              className="mx-0 px-0 d-flex justify-content-end align-items-center"
            >
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <Button
                className="mx-2 profile-section-btn water-color"
                onClick={handleUploadClick}
              >
                <FaUpload />
              </Button>
              <Button className="mx-2 profile-section-btn water-color">
                <FaEdit />
              </Button>
              <Button className="mx-2 profile-section-btn water-color">
                <FaSave />
              </Button>
            </Col>
          </Row>
          <Col className="white-bg borderd rounded">
            <Row className="my-3 d-flex flex-row justify-content-center align-items-center">
              <Col className="position-relative" xs="auto">
                <Image
                  className="profileImage"
                  src={getProfilePicture.data}
                  rounded
                />
              </Col>
              <Col className="d-flex flex-column align-items-start justify-content-center">
                <h4 className="my-2 timeline-title ">About</h4>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  ut lectus nec sapien pretium tristique. Integer ac efficitur
                  odio. Phasellus nec posuere sapien. Sed id est vitae enim
                  vulputate sodales. Proin nec elit non justo congue luctus.
                  Vivamus vehicula augue id mauris maximus, a tincidunt justo
                  feugiat. Nunc eget magna sit amet odio pretium tincidunt.
                  Vivamus non tristique quam.
                </p>
                <div className="d-flex flex-wrap justify-content-start">
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaUser className="mx-2" />
                    <h6 className="mb-0">
                      {"GetProfile.data.data.userId.username"}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaEnvelope className="mx-2" />
                    <h6 className="mb-0">
                      {"GetProfile.data.data.userId.email"}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaMapMarkerAlt className="mx-2" />
                    <h6 className="mb-0">{"GetProfile.data.data.address"}</h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaPhone className="mx-2" />
                    <h6 className="mb-0">
                      {"GetProfile.data.data.contactNumber"}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaRegIdBadge className="mx-2" />
                    <h6 className="mb-0">
                      Licence : {"GetProfile.data.data.licenseNumber"}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaUserTimes className="mx-2" />
                    <h6 className="mb-0">Age : {"GetProfile.data.data.age"}</h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaIdCard className="mx-2" />
                    <h6 className="mb-0">
                      CNIC : {"GetProfile.data.data.cnicNumber"}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaFemale className="mx-2" />
                    <h6 className="mb-0">{"GetProfile.data.data.gender"}</h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaPhone className="mx-2" />
                    Experience : {"GetProfile.data.data.yearsOfExperience"}
                    <h6 className="mb-0"></h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaCalendarAlt className="mx-2" />
                    <h6 className="mb-0">
                      Date of Birth :{" "}
                      {"formatStartTime(GetProfile.data.data.DOB).date"}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaPhone className="mx-2" />
                    <h6 className="mb-0">
                      Experience : {"GetProfile.data.data.yearsOfExperience"}
                    </h6>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Basic;
