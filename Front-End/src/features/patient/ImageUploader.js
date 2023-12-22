import React, { useEffect, useState } from "react";
import { Carousel, Form, Container } from "react-bootstrap";

function ImageUploader({ uploadedUrls, setUploadedUrls }) {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [messageClass, setMessageClass] = useState("");

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };
  useEffect(() => {
    console.log("sttsuss", status);
    if (status === "error:") {
      setMessageClass("errMsg");
    } else if (status === "success:") {
      setMessageClass("successMsg");
    } else {
      setMessageClass("hide");
    }
  }, [status]);
  const renderCarouselItems = () => {
    return uploadedUrls.map((url, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block mx-auto"
          src={url}
          alt={`Image ${index + 1}`}
          style={{ maxWidth: "500px", maxHeight: "500px" }} // Customize width and height
        />
      </Carousel.Item>
    ));
  };

  const handleFileChange = async (event) => {
    console.log("in handle file change");
    const files = event.target.files;
    const formData = new FormData();

    let hasNonImageFile = false; // Flag to track non-image files

    for (let key in files) {
      console.log("in for loop");
      if (files.hasOwnProperty(key)) {
        if (files[key].type.startsWith("image/")) {
          formData.append(files[key].name, files[key]);
        } else {
          hasNonImageFile = true;
        }
      }
    }

    if (hasNonImageFile) {
      setStatus("error:");
      setMessage("Please upload only image files.");
      setUploadedUrls([]); // Clear uploadedUrls in case of error
      return; // Exit function if non-image files are found
    }

    try {
      const response = await fetch("http://localhost:3050/upload", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      setStatus(json?.status);
      console.log("status", json.status);
      setMessage(json?.message);
      console.log("message", json.message);
      if (json?.urls) {
        setUploadedUrls(json?.urls);
      }
      console.log("urls", json.urls);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <Form.Group controlId="exampleForm.ControlInput1">
      <Form.Label>Upload Images</Form.Label>
      <Form.Control
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <Form.Text>
        <p className={messageClass}>
          Status: {status}
          Message: {message}
        </p>
      </Form.Text>
      {console.log("uploading1")}
      {uploadedUrls.length > 0 && (
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          className="mx-auto"
        >
          {console.log("uploading2")}
          {renderCarouselItems()}
          {console.log("uploading3")}
        </Carousel>
      )}
    </Form.Group>
  );
}

export default ImageUploader;
