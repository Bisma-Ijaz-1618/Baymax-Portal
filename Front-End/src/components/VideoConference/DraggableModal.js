import React from "react";
import { Modal } from "react-bootstrap";
import Draggable from "react-draggable";

export const DraggableModal = ({ show }) => {
  return (
    <Draggable handle=".modal-chat">
      <Modal className="modal-chat" show={show}>
        <div>
          <Modal.Header className="modal-header" closeButton>
            <Modal.Title>Draggable Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>Body</Modal.Body>
        </div>
      </Modal>
    </Draggable>
  );
};
