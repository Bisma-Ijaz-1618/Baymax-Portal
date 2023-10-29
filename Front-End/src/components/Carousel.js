import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import logo from "../img/background2.jpg";

// ... Existing imports and DarkVariantExample component

function Carousel_Main_Page() {
  return (
    <Container fluid className="carousel-container">
      <Carousel data-bs-theme="light">
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <Image fluid roundedCircle src={logo} className="carousel-img" />
            <Carousel.Caption className="carousel-caption">
              <div className="carousel-caption-text">
                <h5>First slide label</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam quis malesuada ex. Fusce at dui enim. In nec feugiat
                  enim. Integer non lacinia erat. Orci varius natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus.
                  Integer eget ultrices eros. Nam quis tellus ex. Pellentesque
                  in pretium neque. Fusce ut iaculis leo. Praesent enim eros,
                  malesuada non ultricies hendrerit, consequat non arcu. Vivamus
                  lacinia scelerisque elit. Aliquam velit neque, egestas sed
                  metus at, laoreet ultricies elit. Nam fermentum massa urna, eu
                  sodales mi placerat quis. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia curae; Duis
                  sed nulla nisi.{" "}
                </p>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <Image fluid roundedCircle src={logo} className="carousel-img" />
            <Carousel.Caption className="carousel-caption">
              <div className="carousel-caption-text">
                <h5>Second slide label</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam quis malesuada ex. Fusce at dui enim. In nec feugiat
                  enim. Integer non lacinia erat. Orci varius natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus.
                  Integer eget ultrices eros. Nam quis tellus ex. Pellentesque
                  in pretium neque. Fusce ut iaculis leo. Praesent enim eros,
                  malesuada non ultricies hendrerit, consequat non arcu. Vivamus
                  lacinia scelerisque elit. Aliquam velit neque, egestas sed
                  metus at, laoreet ultricies elit. Nam fermentum massa urna, eu
                  sodales mi placerat quis. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia curae; Duis
                  sed nulla nisi.{" "}
                </p>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>{" "}
        <Carousel.Item>
          <div className="d-flex align-items-center">
            <Image fluid roundedCircle src={logo} className="carousel-img" />
            <Carousel.Caption className="carousel-caption">
              <div className="carousel-caption-text">
                <h5>Third slide label</h5>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam quis malesuada ex. Fusce at dui enim. In nec feugiat
                  enim. Integer non lacinia erat. Orci varius natoque penatibus
                  et magnis dis parturient montes, nascetur ridiculus mus.
                  Integer eget ultrices eros. Nam quis tellus ex. Pellentesque
                  in pretium neque. Fusce ut iaculis leo. Praesent enim eros,
                  malesuada non ultricies hendrerit, consequat non arcu. Vivamus
                  lacinia scelerisque elit. Aliquam velit neque, egestas sed
                  metus at, laoreet ultricies elit. Nam fermentum massa urna, eu
                  sodales mi placerat quis. Vestibulum ante ipsum primis in
                  faucibus orci luctus et ultrices posuere cubilia curae; Duis
                  sed nulla nisi.{" "}
                </p>
              </div>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
        {/* ... Third slide and other slides */}
      </Carousel>
    </Container>
  );
}

export default Carousel_Main_Page;
