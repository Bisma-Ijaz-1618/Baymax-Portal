import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuthHook";
import ROLES_LIST from "../../Config/userRoles";
import { useNavigate } from "react-router-dom";
const AddUser = ({ userRole }) => {
  console.log("role passed?", userRole);
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const controller = new AbortController();
  let isMounted = true;

  const addNewUser = async (data) => {
    try {
      const path = `/${userRole}s/new${userRole}`;
      const response = await axiosPrivate.post(path, data, {
        signal: controller.signal,
      });
      console.log("after addpatient req::response>", response);
      return response.data;
    } catch (error) {
      throw new Error(`Couldn't add account for ${userRole}`);
    }
  };

  const mutation = useMutation(addNewUser, {
    onSuccess: (data) => {
      setSuccess(true);
      queryClient.invalidateQueries(`${userRole}`, { exact: true }); // Invalidate the patients query
      setProfileId(data.profileId);
    },
    onError: () => {
      setErrMsg(
        `There was an error while adding new ${userRole}. Please try again!`
      );
      setSuccess(false);
      setProfileId(null);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      username: formData.get("username"),
      password: formData.get("password"),
      roles: {
        [userRole]: ROLES_LIST[userRole],
      },
      firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
    };
    mutation.mutate(data);
    event.target.reset();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };
  const handleEditProfileClick = (profileId) => {
    navigate(`/auth/admin/edit${userRole}Profile`, {
      state: { profileId },
    });
    setProfileId(null);
  };
  const USER_REGEX = /^[A-Za-z0-9]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,}){0,1}$/;

  return (
    <Container>
      {success ? (
        <section className="success">
          <h1 className="auto">New User Created!</h1>
          {profileId !== null ? (
            <Button onClick={() => handleEditProfileClick(profileId)}>
              Add {userRole} Profile
            </Button>
          ) : (
            <></>
          )}
          <Button
            onClick={() => {
              setSuccess(false);
              setErrMsg("");
            }}
          >
            Add New {userRole}
          </Button>
        </section>
      ) : (
        <>
          <h2>Register New {userRole}</h2>
          <Form onSubmit={handleSubmit}>
            <p
              className={errMsg === "" ? "hide" : "errMsg"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                pattern={EMAIL_REGEX.source}
                required
              />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                pattern={USER_REGEX.source}
                required
              />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                pattern={PWD_REGEX.source}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default AddUser;
