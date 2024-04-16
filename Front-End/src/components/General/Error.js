import React from "react";

const ErrorComponent = ({ message }) => {
  return (
    <div className="text-center text-danger">
      <p>Error loading data: {message}</p>
    </div>
  );
};

export default ErrorComponent;
