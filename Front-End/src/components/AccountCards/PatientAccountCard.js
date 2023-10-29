import { Card, ProgressBar, ListGroup } from "react-bootstrap";
import {
  faUser,
  faPhone,
  faTint,
  faWeight,
  faArrowsAltV,
  faTransgender,
  faEnvelope,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AccountCard = ({ profileData }) => {
  return (
    <Card>
      <div
        className="horizontal-image"
        style={{
          backgroundImage:
            profileData.backgroundImage ||
            `url("https://shreethemes.in/doctris/layouts/assets/images/bg/bg-profile.jpg")`,
        }}
      >
        {/* Circular image on top */}
        <img
          src={
            profileData.profilePicture ||
            "https://randomuser.me/api/portraits/women/1.jpg"
          }
          className="circular-image"
          alt=""
        />
      </div>

      <Card.Body className="text-center mt-n5 position-relative pb-4 border-bottom">
        <Card.Title as="h5" className="mt-5 mb-1">
          {profileData.userId.firstname} {profileData.userId.lastname}
        </Card.Title>
        <Card.Text className="text-muted mb-0"></Card.Text>
      </Card.Body>
      <ListGroup variant="dark">
        <ListGroup.Item className="mb-4">
          <h6 className="mb-0">Complete your profile</h6>
          <ProgressBar variant="primary" now={89} label="89%" />
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon icon={faUser} className="align-text-bottom me-2" />
          <h6 className="mb-0">Username</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.userId.username || " None"}
          </p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="align-text-bottom me-2"
          />
          <h6 className="mb-0">Email</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.userId.email || " None"}
          </p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon icon={faPhone} className="align-text-bottom me-2" />
          <h6 className="mb-0">Phone No.</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.phoneNumber || " None"}
          </p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon icon={faTint} className="align-text-bottom me-2" />
          <h6 className="mb-0">Blood Group</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.bloodGroup || " None"}
          </p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faTransgender}
            className="align-text-bottom me-2"
          />
          <h6 className="mb-0">Gender</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.gender || " None"}
          </p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faIdBadge}
            className="align-text-bottom me-2"
          />
          <h6 className="mb-0">Age</h6>
          <p className="text-muted mb-0 ms-2">{profileData.age || " None"}</p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon icon={faWeight} className="align-text-bottom me-2" />
          <h6 className="mb-0">Weight</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.weight.value || " None"}
          </p>
        </ListGroup.Item>
        <ListGroup.Item className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={faArrowsAltV}
            className="align-text-bottom me-2"
          />
          <h6 className="mb-0">Height</h6>
          <p className="text-muted mb-0 ms-2">
            {profileData.height || " None"}
          </p>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default AccountCard;
