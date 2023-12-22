import React from "react";
import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import { Form, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import ColorPicker from "./ColorPicker";
const AddItem = () => {
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
  };

  return (
    <Container>
      <h2>Add Item</h2>
      <Form onSubmit={handleSubmit}>
        <ImageUploader
          uploadedUrls={uploadedUrls}
          setUploadedUrls={setUploadedUrls}
        />
        <ColorPicker
          colors={colors}
          setColors={setColors}
          newColor={newColor}
          setNewColor={setNewColor}
        />
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Text Input</Form.Label>
          <Form.Control type="text" placeholder="Enter text" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Select Input</Form.Label>
          <Form.Control as="select">
            <option>Option 1</option>
            <option>Option 2</option>
            <option>Option 3</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Textarea Input</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlCheckbox1">
          <Form.Check type="checkbox" label="Checkbox Input" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlRadio1">
          <Form.Label>Radio Inputs</Form.Label>
          <div>
            <Form.Check type="radio" label="Option 1" name="radioGroup" />
            <Form.Check type="radio" label="Option 2" name="radioGroup" />
            <Form.Check type="radio" label="Option 3" name="radioGroup" />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddItem;
