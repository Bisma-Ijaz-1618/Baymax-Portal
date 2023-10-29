import React, { useState } from "react";
import { Table, Image, Pagination, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";

function CustomTable({ data }) {
  const itemsPerPage = 5; // Number of items per page
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Department</th>
            <th>Date</th>
            <th>Time</th>
            <th>Doctor</th>
            <th>Fees</th>
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
                <td>
                  <Image
                    src={getRandomImage()}
                    roundedCircle
                    width={40}
                    height={40}
                  />
                  {item.name}
                </td>
                <td>{item.age}</td>
                <td>{item.gender}</td>
                <td>{item.department}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.doctor}</td>
                <td>{item.fees}</td>
                <td>
                  <Button variant="outline-primary" className="mr-2">
                    <FontAwesomeIcon icon={faEye} />
                  </Button>
                  <Button variant="outline-danger">
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Pagination>{renderPaginationItems()}</Pagination>
    </div>
  );
}

export default CustomTable;
