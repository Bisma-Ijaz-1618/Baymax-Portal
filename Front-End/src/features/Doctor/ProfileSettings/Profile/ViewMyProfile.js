import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import useDoctorProfileApi from "../../../../api/doctorProfile";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
function MyComponent() {
  const { GetProfile, uploadProfilePicture, getProfilePicture } =
    useDoctorProfileApi();

  const [image, setImage] = useState(null);
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      await uploadProfilePicture.mutateAsync(formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Upload Profile Image</h2>
          <Form>
            <Form.Group controlId="imageUpload">
              <Form.Label>Choose Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleImageUpload}>
              Upload
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          {GetProfile.isLoading && <p>Loading...</p>}
          {GetProfile.isError && <p>Error: {GetProfile.error.message}</p>}
          {GetProfile.isSuccess && (
            <div>
              <img
                src={getProfilePicture.data}
                alt="Profile"
                style={{ maxWidth: "100%" }}
              />
              <p>
                <strong>Username:</strong> {GetProfile.data.data.username}
              </p>
              <p>
                <strong>Email:</strong> {GetProfile.data.data.email}
              </p>
              <p>
                <strong>Roles:</strong>
              </p>
              <ul>
                {Object.entries(GetProfile.data.data.roles).map(
                  ([role, roleId]) => (
                    <li key={roleId}>
                      {role}: {roleId}
                    </li>
                  )
                )}
              </ul>
              <p>
                <strong>Created At:</strong> {GetProfile.data.data.createdAt}
              </p>
              <p>
                <strong>Updated At:</strong> {GetProfile.data.data.updatedAt}
              </p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MyComponent;
