import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingComponent = () => {
  return (
    <div className="text-center">
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      <p>Loading data...</p>
    </div>
  );
};

export default LoadingComponent;
