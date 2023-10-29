import { useState } from "react";
import {
  Offcanvas,
  Table,
  Image,
  Pagination,
  Button,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import DeleteAccountToast from "./DeleteAccountToast";

function CustomTable({ headers, data }) {
  const itemsPerPage = 5;
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [showOffcanvas, setShowOffcanvas] = useState(false); // State for Offcanvas
  const [selectedProfileData, setSelectedProfileData] = useState(null); // To store the profile data
  const navigate = useNavigate();

  // ... other handlers ...

  const handleDeleteClick = (profileData) => {
    setSelectedProfileData(profileData); // Store the profile data
    setShowOffcanvas(true); // Show the Offcanvas
  };

  const handleEditClick = (profileData) => {
    navigate("/auth/admin/edit");
  };

  const handleViewClick = (profileData) => {};
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

  const handleCheckboxChange = (index, isChecked) => {
    // Handle checkbox state changes
  };

  return data ? (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item, index) => (
              <tr key={index}>
                <td>
                  <Form.Check
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                  />
                </td>
                {headers.map((header, columnIndex) => (
                  <td key={columnIndex}>
                    {header === "username" ? (
                      <div>
                        <Image
                          src={getRandomImage()}
                          roundedCircle
                          width={40}
                          height={40}
                        />
                        {item["userId"][header]}
                      </div>
                    ) : item[header] ? (
                      item[header]
                    ) : (
                      item["userId"][header]
                    )}
                  </td>
                ))}
                <td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => handleEditClick(item)}
                      variant="outline-primary"
                      className="rounded-circle"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>

                    <Button
                      onClick={() => handleViewClick(item)}
                      variant="outline-primary"
                      className="rounded-circle"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(item)}
                      variant="outline-primary"
                      className="rounded-circle"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>{renderPaginationItems()}</Pagination>
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Confirm Delete</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedProfileData && (
            <DeleteAccountToast profileData={selectedProfileData} />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  ) : (
    <div>No Patients Registered!</div>
  );
}

export default CustomTable;
