import { useState } from "react";
import { Table, Image, Pagination, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";

function UsersTable({ headers, data, userRole, deleteProfileFunction }) {
  const itemsPerPage = 5;
  const totalPages = data ? Math.ceil(data.length / itemsPerPage) : 0;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProfileData, setSelectedProfileData] = useState(null);
  const navigate = useNavigate();
  const [callDelete, setCallDelete] = useState(false);

  const handleDeleteClick = (profileData) => {
    setSelectedProfileData(profileData);
    setCallDelete(true);
  };

  const handleEditClick = (profileData) => {
    setSelectedProfileData(profileData);
    const profileId = profileData._id;
    navigate(`/auth/admin/edit${userRole}Profile`, {
      state: { profileId },
    });
    setSelectedProfileData(null);
  };

  const handleViewClick = (profileData, setSelectedProfileData) => {};
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
                <td style={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleEditClick(item)}
                    variant="outline-primary"
                    className="rounded-circle"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    onClick={() =>
                      handleViewClick(item, setSelectedProfileData)
                    }
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
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>{renderPaginationItems()}</Pagination>
      {callDelete ? (
        <DeleteAccount
          profileData={selectedProfileData}
          setProfileData={setSelectedProfileData}
          deleteProfileFunction={deleteProfileFunction}
          invalidQuery={`${userRole}s`}
          setCallDelete={setCallDelete}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
    <div>No ${userRole}s Registered!</div>
  );
}

export default UsersTable;
