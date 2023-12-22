import { Form, Button, Alert } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const DoctorProfileForm = ({ profileData, updateProfile }) => {
  const id = profileData._id;
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});
  const [formData, setFormData] = useState({
    age: profileData.age || 0,
    gender: profileData.gender || "None",
    department: profileData.department || "None",
    workLocation: profileData.workLocation || "",
    phoneNumber: profileData.phoneNumber || "",
  });

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Doctor", { id: profileData._id }], {
        exact: true,
      });
    },
    onError: (error) => {
      setErrMsg(
        `There was an error while updating Profile. Please try again! ${error.message}`
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
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleClearAll = () => {
    setFormData({
      age: 0,
      gender: "None",
      department: "None",
      workLocation: "",
      phoneNumber: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.id = profileData._id;
    updateProfileMutation.mutate({ formData, id });
    // Perform save action with formData
    console.log("Form submitted with data:", formData);
    setOriginalFormData(formData); // Update the original data
    setEditMode(false);
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <h1>Profile</h1>
        <p className={updateProfileMutation.isError ? "errMsg" : "hide"}>
          {errMsg}
        </p>

        {editMode ? (
          <>
            <Button type="submit">Save</Button>{" "}
            <Button onClick={handleCancel}>Cancel</Button>{" "}
            <Button onClick={handleClearAll}>Clear All</Button>
          </>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}

        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={(e) => handleChange("age", e.target.value)}
            disabled={!editMode}
          />
        </Form.Group>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            disabled={!editMode}
          />
        </Form.Group>
        <Form.Group controlId="workLocation">
          <Form.Label>Work Location</Form.Label>
          <Form.Control
            type="text"
            name="workLocation"
            value={formData.workLocation}
            onChange={(e) => handleChange("workLocation", e.target.value)}
            disabled={!editMode}
          />
        </Form.Group>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={formData.gender}
            onChange={(e) => handleChange("gender", e.target.value)}
            disabled={!editMode}
          >
            <option value="">Select</option>
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="O">0</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="department">
          <Form.Label>Department</Form.Label>
          <Form.Control
            as="select"
            name="department"
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            disabled={!editMode}
          >
            <option value="">Select</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gastroenterology">Gastroenterology</option>
            <option value="Ophthalmology">Ophthalmology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Obstetrics and Gynecology">
              Obstetrics and Gynecology
            </option>
            <option value="Radiology">Radiology</option>
            <option value="Emergency Medicine">Emergency Medicine</option>
            <option value="Surgery">Surgery</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Oncology">Oncology</option>
            <option value="Urology">Urology</option>
            <option value="ENT (Ear, Nose, and Throat)">
              ENT (Ear, Nose, and Throat)
            </option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default DoctorProfileForm;
