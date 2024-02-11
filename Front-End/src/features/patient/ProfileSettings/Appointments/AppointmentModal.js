import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAppointmentApi from "../../../../api/appointment";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
function Example({ appointmentDetails }) {
  const { date, startTime, status } = appointmentDetails;
  const AppointmentApi = useAppointmentApi();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const handleClose = () => {
    queryClient.refetchQueries(["doctors"]);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createAppointmentMutation = useMutation({
    mutationFn: () => AppointmentApi.createAppointment(appointmentDetails),
    onSuccess: (data) => {
      console.log("Appointment created successfully: ", data);
      queryClient.invalidateQueries(["doctors"], ["slots"], {
        exact: true,
      });
      setShow(true);
    },
    onError: (error, data) => {
      setMessage(data.message);
      setShow(true);
      console.log("Failed to credgfchjbate appointment: ", data);
    },
  });
  const handleCreateAppointment = () => {
    createAppointmentMutation.mutate(appointmentDetails);
  };

  return (
    <>
      <Button variant="primary" onClick={handleCreateAppointment}>
        Book Appointment{" "}
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
            <h3>{message}</h3>
            <p>Date: {new Date(date).toDateString()}</p>
            <p>Start Time: {startTime} : 00</p>
            <p>End Time: {startTime + 1} : 00</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Your appointment has been {status}</Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
