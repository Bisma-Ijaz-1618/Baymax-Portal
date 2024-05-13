import { Form, Button } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";

const PatientProfileForm = ({ profileData, updateProfile }) => {
  const id = profileData._id;
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [originalFormData, setOriginalFormData] = useState({});
  const [formData, setFormData] = useState({
    weight: { value: profileData.weight.value || 0, unit: "kg" },
    age: profileData.age || 0,
    gender: profileData.gender || "None",
    height: profileData.height || 0,
    bloodGroup: profileData.bloodGroup || "None",
    phoneNumber: profileData.phoneNumber || 0,
    appointments: profileData.appointments || [],
    payments: profileData.payments || [],
  });

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Patient", { id: profileData._id }], {
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
      weight: {
        value: 0,
        unit: "None",
      },
      age: 0,
      height: 0,
      bloodGroup: "Null",
      phoneNumber: 0,
      gender: "",
    });
  };
  const handleWeightValueChange = (value) => {
    handleChange("weight", { ...formData.weight, value });
  };

  const handleWeightUnitChange = (unit) => {
    handleChange("weight", { ...formData.weight, unit });
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
        <Form.Group controlId="weight">
          <Form.Label>Weight</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="number"
              name="weight"
              value={formData.weight.value}
              onChange={(e) => handleWeightValueChange(e.target.value)}
              disabled={!editMode}
            />
            <Form.Select
              name="weightUnit"
              value={formData.weight.unit}
              onChange={(e) => handleWeightUnitChange(e.target.value)}
              disabled={!editMode}
            >
              <option value="kg">kg</option>
              {/* Add other unit options here */}
            </Form.Select>
          </div>
        </Form.Group>
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
        <Form.Group controlId="height">
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="text"
            name="height"
            value={formData.height}
            onChange={(e) => handleChange("height", e.target.value)}
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
        <Form.Group controlId="bloodGroup">
          <Form.Label>Blood Group</Form.Label>
          <Form.Control
            as="select"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={(e) => handleChange("bloodGroup", e.target.value)}
            disabled={!editMode}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </div>
  );
};

export default PatientProfileForm;
