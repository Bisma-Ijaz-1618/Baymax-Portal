import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import useAppointmentApi from "../../../../api/appointment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useDoctorApi from "../../../../api/doctor";
function Example({ appointmentDetails }) {
  const { date, startTime, status } = appointmentDetails;
  const { allDoctorsQuery } = useDoctorApi();
  const AppointmentApi = useAppointmentApi();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const handleClose = () => {
    queryClient.refetchQueries(["doctors"]);
    setShow(false);
  };

  const createAppointmentMutation = useMutation({
    mutationFn: () => AppointmentApi.createAppointment(appointmentDetails),
    onSuccess: (data) => {
      console.log("Appointment booked successfully: ", data);
      setMessage("Your appointment has been booked");
      allDoctorsQuery.refetch();
      setShow(true);
    },
    onError: (error, data) => {
      setMessage(error.message);
      setShow(true);
    },
  });
  const handleCreateAppointment = () => {
    console.log("the appoitment detaisl for booking", appointmentDetails);
    createAppointmentMutation.mutate(appointmentDetails);
  };

  return (
    <>
      <Button
        className="px-2 py-0 w-100 m-0 water-bg"
        onClick={handleCreateAppointment}
      >
        Book Now{" "}
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
