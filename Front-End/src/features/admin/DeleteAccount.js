import { useState } from "react";
import { Row, Col, Button, Offcanvas } from "react-bootstrap";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import useUserApi from "../../api/user";

function DeleteAccount({
  profileData,
  invalidQuery,
  setCallDelete,
  setProfileData,
}) {
  const queryClient = useQueryClient();
  const { deleteUser } = useUserApi();

  const [errMsg, setErrMsg] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const [inputClass, setInputClass] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const deleteAccountMutation = useMutation(deleteUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(invalidQuery, { exact: true }); // Invalidate the patients query
      setProfileData(null);
      setCallDelete(false);
    },
    onError: () => {
      setErrMsg(
        `There was an error while deleting ${invalidQuery} Account. Please try again!`
      );
    },
  });
  const onClose = () => {
    setProfileData(null);
    setCallDelete(false);
    setShow(false);
  };

  useEffect(() => {
    if (inputValue !== profileData.userId.username && inputValue !== "") {
      setInputClass("errMsg");
      setDisableButton(true);
    } else if (inputValue === "") {
      setInputClass("hide");
      setDisableButton(true);
    } else {
      console.log("should be tru now");
      setInputClass("hide");
      setDisableButton(false);
    }
  }, [inputValue]);

  useEffect(() => {
    if (profileData === null) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [profileData]);

  return (
    <Offcanvas
      show={show}
      backdrop={true}
      placement="top"
      className="deleteCanvas"
      onHide={onClose}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Delete Account </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Row>
          <Col lg={"auto"}>
            <img
              src={"https://randomuser.me/api/portraits/men/1.jpg"}
              alt="Profile"
              className="rounded-circle mb-2"
              style={{ width: "60px", height: "60px" }}
            />
          </Col>
          <Col>
            <p>Email : {profileData?.userId?.email || "email"}</p>
            <p>Username : {profileData?.userId?.username || "username"}</p>
          </Col>
        </Row>
        <p>Please type the users username to confirm deletion.</p>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`form-control`}
        />
        <p className={inputClass}>Does not match!</p>
        <p className="errMsg">{errMsg}</p>
        <div className="mt-3 d-flex justify-content-center">
          <Button
            onClick={() =>
              deleteAccountMutation.mutate({ id: profileData.userId._id })
            }
            variant="danger"
            disabled={disableButton}
          >
            Delete Account
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default DeleteAccount;
