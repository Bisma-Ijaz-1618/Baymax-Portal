import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

// Function to generate random reviews data
const generateRandomReviews = () => {
  const patients = ["John Doe", "Jane Smith", "Michael John"];
  const reviews = [];

  for (let i = 1; i <= 10; i++) {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const stars = Math.floor(Math.random() * 5) + 1; // Random stars from 1 to 5
    const reviewText =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
    reviews.push({ patient, stars, reviewText });
  }
  return reviews;
};

const ReviewsPage = () => {
  const reviews = generateRandomReviews();

  return (
    <Container>
      <Row className="mt-4">
        <h1>Reviews</h1>
      </Row>
      <Row className="mt-4">
        {reviews.map((review, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-3 water-bg white-color ">
              <Card.Body>
                <Card.Title className="">
                  {" "}
                  <FontAwesomeIcon icon={faUser} className="account-icon" />
                  {review.patient}
                </Card.Title>
                <Card.Text>{review.reviewText}</Card.Text>
                <div>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={
                        i < review.stars ? "text-warning" : "text-secondary"
                      }
                    >
                      &#9733; {/* Unicode star character */}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ReviewsPage;
