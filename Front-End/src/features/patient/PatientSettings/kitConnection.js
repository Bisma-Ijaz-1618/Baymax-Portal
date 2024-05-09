import React, { useEffect, useState } from "react";
import { Modal, Container, Card, Row, Col, Button } from "react-bootstrap";
import useAuth from "../../../hooks/useAuthHook";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingComponent from "../../../components/General/Loading";
import { formatStartTime } from "../../../utils/dateUtil";
import RecordBars from "./RecordBars";
const Connection = () => {
  const { auth } = useAuth();
  console.log(auth);
  const axiosPrivate = useAxiosPrivate();
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState(auth?.userId);
  const [connection, setConnection] = useState(false);
  const [kit, setKit] = useState({});
  const kitQuery = useQuery({
    queryKey: ["kit", auth?.userId],
    queryFn: async () => {
      try {
        console.log("um", `/Kit/${userId}`);
        const response = await axiosPrivate.get(`/Kit/${userId}`);
        return response.data || {};
      } catch (err) {
        console.log("err connecting kit", err);
      }
    },
    onSuccess: (data) => {
      setKit(data);
    },
    enabled: userId ? true : false,
  });

  useEffect(() => {
    if (auth.userId) {
      setUserId(auth.userId);
    }
    return () => {
      setKit({});
    };
  }, []);
  const viewKitDetails = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const Connected = () => {
    console.log("in connected and got kit", kitQuery.data);
  };
  if (!userId) {
    return <LoadingComponent />;
  }
  return (
    <Container fluid>
      <Row className="h-100">
        <Card className="my-4 h-100">
          <Card.Header className=" white-bg d-flex flex-row align-items-center justify-content-start">
            <h3 className="p-0 m-0">Kit Connection </h3>
            <h6 className="m-0 mx-4 text-muted">
              {kit._id
                ? "Your Kit is alredy registers"
                : "Your kit requires connection!"}
            </h6>
          </Card.Header>
          <Card.Body>
            <h5 className="">Kit Registeration Details</h5>
            <div className="w-auto p-1 d-flex flex-row ">
              <div className="br-50 w-auto px-2 mx-2  water-bg white-color ">
                1
              </div>
              <div className="">
                Turn on your kit and open the
                <strong className="water-color"> Credentials page</strong>
              </div>
            </div>
            <div className="w-auto p-1 d-flex flex-row ">
              <div className="br-50 w-auto px-2 mx-2  water-bg white-color ">
                2
              </div>
              <div className="">
                Add this Id to your Kit :
                <strong className="water-color">{" " + userId}</strong>
              </div>
            </div>
            <div className="w-auto p-1 d-flex flex-row ">
              <div className="br-50 w-auto px-2 mx-2 my-auto water-bg white-color ">
                3
              </div>
              <div className="">
                Save your Credentials on the kit and
                <strong className="water-color">
                  <Button
                    onClick={() => {
                      Connected();
                    }}
                    className="p-0 m-0 mx-2 px-2 water-color white-bg water-border"
                  >
                    {"Register"}
                  </Button>
                </strong>
              </div>
            </div>
            <div className="w-auto p-1 d-flex flex-row ">
              <div className="my-auto br-50 w-auto px-2 mx-2  water-bg white-color ">
                4
              </div>
              <div className="">
                View your Kit Details
                <Button
                  onClick={() => {
                    viewKitDetails();
                  }}
                  className="p-0 m-0 mx-2 px-2 water-color white-bg water-border"
                >
                  {"View"}
                </Button>
              </div>
            </div>
            {show && (
              <>
                {kit._id ? (
                  <>
                    <h5 className="mt-3">Kit Details</h5>
                    <div className=" w-auto px-3 d-flex flex-column ">
                      <div>
                        {" "}
                        User Id :{" "}
                        <strong className="water-color">{kit.userId}</strong>
                      </div>
                      <div>
                        {" "}
                        Kit Id :{" "}
                        <strong className="water-color">{kit._id}</strong>
                      </div>
                      <div>
                        {" "}
                        Registeration Date :{" "}
                        <strong className="water-color">
                          {formatStartTime(kit.registerationDate).date}
                        </strong>
                      </div>
                      {/* <div>
                        {" "}
                        Record Count :{" "}
                        <strong className="water-color">
                          {kit.Records.length}
                        </strong>
                      </div> */}
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="mt-3 fire-color">
                      Your kit is not connected
                    </h5>
                  </>
                )}
              </>
            )}
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default Connection;
