import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import ImageUploader from "./ImageUploader";

function BasicUserSettings({ userInfo, updateUser }) {
  const id = userInfo._id;
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});
  const [formData, setFormData] = useState({
    firstname: userInfo.firstname || "",
    lastname: userInfo.lastname || "",
    email: userInfo.email || "",
    username: userInfo.username,
    backgroundPicture:
      "https://shreethemes.in/doctris/layouts/assets/images/bg/bg-profile.jpg",
  });
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("Users", { exact: true });
    },
    onError: (error) => {
      console.log("onerr", id);
      setErrMsg(
        `There was an error while updating User. Please try again! ${error.message}`
      );
    },
  });

  useEffect(() => {
    setOriginalFormData(formData); // Store the initial data
  }, []); // Watch for changes in formData

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(originalFormData); // Revert to original data
    setEditMode(false);
  };

  const handleClearAll = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
    });
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id = userInfo._id;
    updateUserMutation.mutate({ formData, id });
    // Perform save action with formData
    console.log("Form submitted with data:", formData);
    setOriginalFormData(formData); // Update the original data
    setEditMode(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>General Info</h1>
      <p className={updateUserMutation.isError ? "errMsg" : "hide"}>{errMsg}</p>
      {editMode ? (
        <>
          <Button type="submit">Save</Button>{" "}
          <Button onClick={handleCancel}>Cancel</Button>{" "}
          <Button onClick={handleClearAll}>Clear All</Button>
        </>
      ) : (
        <Button onClick={handleEdit}>Edit</Button>
      )}
      <Form.Group controlId="firstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.firstname}
          onChange={(e) => handleChange("firstname", e.target.value)}
          disabled={!editMode}
        />
      </Form.Group>
      <Form.Group controlId="lastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          type="text"
          value={formData.lastname}
          onChange={(e) => handleChange("lastname", e.target.value)}
          disabled={!editMode}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          disabled={!editMode}
        />
      </Form.Group>
      <Form.Group controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={formData.username}
          onChange={(e) => handleChange("username", e.target.value)}
          disabled={!editMode}
        />
      </Form.Group>
    </Form>
  );
}

export default BasicUserSettings;
