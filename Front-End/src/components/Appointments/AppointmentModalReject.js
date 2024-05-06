import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAppointmentApi from "../../api/appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
function Example({ id }) {
  const AppointmentApi = useAppointmentApi();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const handleClose = () => {
    setShow(false);
    queryClient.invalidateQueries(["doctorAppointments"], {
      exact: true,
    });
  };
  const AppointmentStatusRejectMutation = useMutation({
    mutationFn: (id) => AppointmentApi.changeStatusToRejected(id),
    onSuccess: (data) => {
      console.log(" Appointment Rejected: ", data);

      setMessage("Appointment has been Rejected");
      setShow(true);
    },
    onError: (error) => {
      setMessage(error.message);
      setShow(true);

      console.log("Failed to reject appointment: ", error);
    },
  });
  const handleRejectAppointment = () => {
    console.log("the appoitment detaisl for booking");
    AppointmentStatusRejectMutation.mutate(id);
  };

  return (
    <>
      <Button
        className="p-1 w-100"
        variant="outline-danger"
        onClick={handleRejectAppointment}
      >
        Reject{" "}
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>{message}</h5>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
