import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Table,
  Image,
  Pagination,
  Button,
  Form,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import findValue from "../../../utils/findKeyOfObj";
import usePatientControllerApi from "../../../api/Doctor/patientController";
import ErrorComponent from "../../../components/General/Error";
import LoadingComponent from "../../../components/General/Loading";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function UsersTable({ headers, noOfItems }) {
  const [patientData, setPatientData] = useState(null);
  const { getMyPatients } = usePatientControllerApi();
  useEffect(() => {
    const func = async () => {
      await getMyPatients.refetch();
    };
    func();
    return () => {};
  }, []);
  const itemsPerPage = noOfItems;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfileData, setSelectedProfileData] = useState(null);
  const navigate = useNavigate();
  const totalPages = patientData
    ? Math.ceil(patientData.length / itemsPerPage)
    : 0;
  const CategoryList = ["Urgent", "Today", "All"];
  const [selectedCategory, setSelectedCategory] = useState(CategoryList[0]);
  if (getMyPatients.isError) {
    return <ErrorComponent message={""} />;
  }

  const handleViewClick = (profileData, setSelectedProfileData) => {
    setSelectedProfileData(profileData);
    const profileId = profileData._id;
    navigate(`/auth/doctor/viewPatientProfile/${profileId}`);
    setSelectedProfileData(null);
  };
  const getRandomImage = () => {
    const images = [
      "https://randomuser.me/api/portraits/men/1.jpg",
      "https://randomuser.me/api/portraits/women/2.jpg",
      // Add more image URLs
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Card>
      <Card.Header className="d-flex flex-row white-bg justify-content-between align-items-center">
        <h5 className=" black-color p-0 m-0">Patients</h5>
        <div className="d-flex flex-row justify-content-end align-items-center">
          <Form.Group className="mx-3" controlId="categorySelect">
            <Form.Control
              as="select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {CategoryList.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Pagination className="p-0 m-0">{renderPaginationItems()}</Pagination>
        </div>
      </Card.Header>
      <Card.Body className="p-0 m-0">
        <Table bordered hover responsive>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th className="px-2" key={index}>
                  {capitalizeFirstLetter(header)}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getMyPatients.isLoading ? (
              <LoadingComponent />
            ) : (
              getMyPatients.data
                ?.slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((item, index) => (
                  <tr key={index}>
                    {headers.map((header, columnIndex) => (
                      <td key={columnIndex} className="align-middle">
                        {header === "username" ? (
                          <Row
                            sm="auto"
                            className="align-self-center p-1 m-auto d-flex flex-row align-items-center justify-content-start"
                          >
                            <Col sm="auto" className="p-0 ">
                              <Image
                                src={getRandomImage()}
                                roundedCircle
                                width={40}
                                height={40}
                                className=""
                              />
                            </Col>
                            <Col>{findValue(item, header)}</Col>
                          </Row>
                        ) : (
                          <Row
                            sm="auto"
                            className="align-self-center h-100 p-1 m-auto mt-auto d-flex flex-row align-items-center justify-content-start"
                          >
                            <Col sm="auto" className="p-0">
                              {findValue(item, header)}
                            </Col>
                          </Row>
                        )}
                      </td>
                    ))}
                    <td className="align-middle p-0 m-0">
                      <div className="d-flex flex-row justify-content-center">
                        <Button
                          onClick={() =>
                            handleViewClick(item, setSelectedProfileData)
                          }
                          variant="outline-primary"
                          className="m-auto rounded-circle"
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
            )}
            {currentPage === totalPages ? (
              <tr>
                <td colSpan={headers?.length || 1} align="center">
                  {"<< "}No More Items To Show{" >>"}
                </td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default UsersTable;
