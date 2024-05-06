import React from "react";
import { ListGroup } from "react-bootstrap";

function UserList() {
  return (
    <div>
      <h2>User List</h2>
      <ListGroup>
        {/* Render list of users here */}
        <ListGroup.Item>User 1</ListGroup.Item>
        <ListGroup.Item>User 2</ListGroup.Item>
        <ListGroup.Item>User 3</ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default UserList;
