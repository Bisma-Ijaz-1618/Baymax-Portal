import React, { useState } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";

function ColorPickerExample({ colors, setColors, newColor, setNewColor }) {
  const handleColorChange = (event) => {
    setNewColor(event.target.value);
  };

  const handleAddColor = () => {
    if (newColor) {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };

  const handleRemoveColor = (index) => {
    const updatedColors = [...colors];
    updatedColors.splice(index, 1);
    setColors(updatedColors);
  };

  return (
    <>
      <Form.Group>
        <Form.Label htmlFor="exampleColorInput">Color picker</Form.Label>
        <Form.Control
          type="color"
          id="exampleColorInput"
          value={newColor}
          onChange={handleColorChange}
          title="Choose your color"
        />
        <Button onClick={handleAddColor} variant="primary" className="mt-2">
          Add Color
        </Button>
      </Form.Group>
      <div className="mt-3">
        <ListGroup>
          {colors.map((color, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex align-items-center justify-content-between"
              style={{ backgroundColor: color }}
            >
              {color}
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveColor(index)}
              >
                X
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
}

export default ColorPickerExample;
