import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import useDoctorApi from "../../../../api/Patient/doctorController";
import { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

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
import { formatStartTime } from "../../../../utils/dateUtil";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
function Basic() {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const GetProfileById = useQuery({
    queryKey: ["Doctors", id],
    queryFn: async () => {
      try {
        console.log("in get profile");
        const response = await axiosPrivate.get(`Doctors/${id}`);
        console.log("data of get profile", response.data);
        return response.data || [];
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error; // Rethrow the error to be handled by react-query
      }
    },
    onSuccess: (data) => {
      console.log("here is the dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);
    },
  });
  const getProfilePictureById = useQuery({
    queryKey: ["profilePicture", id],
    queryFn: async () => {
      try {
        console.log("in get pic");
        const response = await axiosPrivate.get(
          `Doctors/getProfilePicture/${id}`,
          {
            responseType: "arraybuffer",
          }
        );
        const imageData = arrayBufferToBase64(response.data);
        const url = `data:image/jpeg;base64,${imageData}`;
        return url;
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        throw error; // Rethrow the error to be handled by react-query
      }
    },
    onSuccess: (data) => {
      console.log("here is the data of getpic", data);
    },
  });
  return (
    <>
      {!GetProfileById.isError && !GetProfileById.isLoading && (
        <Row className="mt-3 profile-section white-bg water-border rounded">
          <Row className="py-2 profile-heading-row">
            <Col xs={8}>
              <h4 className="profile-heading-text water-color">
                {GetProfileById.data.userId.username}
              </h4>
            </Col>
          </Row>
          <Col className="white-bg borderd rounded">
            <Row className="my-3 d-flex flex-row justify-content-center align-items-center">
              <Col className="position-relative" xs="auto">
                <Image
                  className="profileImage"
                  src={getProfilePictureById.data}
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
                      {GetProfileById.data.userId.username}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaEnvelope className="mx-2" />
                    <h6 className="mb-0">{GetProfileById.data.userId.email}</h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaMapMarkerAlt className="mx-2" />
                    <h6 className="mb-0">
                      {GetProfileById.data.address.city +
                        GetProfileById.data.address.address}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaPhone className="mx-2" />
                    <h6 className="mb-0">
                      {GetProfileById.data.contactNumber}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaFemale className="mx-2" />
                    <h6 className="mb-0">{GetProfileById.data.gender}</h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaRegIdBadge className="mx-2" />
                    <h6 className="mb-0">
                      Licence : {GetProfileById.data.licenseNumber}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaUserTimes className="mx-2" />
                    <h6 className="mb-0">Age : {GetProfileById.data.age}</h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaIdCard className="mx-2" />
                    <h6 className="mb-0">
                      CNIC : {GetProfileById.data.cnicNumber}
                    </h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaIdCard className="mx-2" />
                    Experience : {GetProfileById.data.yearsOfExperience}
                    <h6 className="mb-0"></h6>
                  </div>
                  <div className="pill-profile water-border water-color  mb-1 me-1 white-bg p-2  d-flex flex-row align-items-center justify-content-around">
                    <FaCalendarAlt className="mx-2" />
                    <h6 className="mb-0">
                      Date of Birth :{}
                      {formatStartTime(GetProfileById.data.DOB).date}
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
