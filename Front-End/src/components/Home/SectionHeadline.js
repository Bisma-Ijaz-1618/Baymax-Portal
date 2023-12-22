import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const Headline = () => {
  return (
    <Container fluid className="section1-container">
      <Row className="align-items-center section1-headline justify-content-center py-5">
        <Col className="col-md-4">
          <Row className="">
            <h3>Baymax Kit</h3>
            <h3> Healthcare's answer to evolving virtual care needs</h3>
            <h6 className="text-left headline-text">
              Baymax Kit is constructed using cutting-edge technology, designed
              to provide clinicians and patients the experience they desire and
              require. Streamline intricate workflows, allowing you to
              concentrate on what truly matters: delivering quality care.
            </h6>
          </Row>
          <Row>
            <Button className="headline-button"> Learn More</Button>
          </Row>
        </Col>
        <Col className="col-md-3 headline-image">
          <Image src="https://shreethemes.in/doctris/layouts/assets/images/svg/vaccine-development-amico.svg" />
        </Col>
      </Row>
      {/* <Row>
        <Image
          src="https://assets-global.website-files.com/61439762f5efe0d90dafdc9e/61439762f5efe04c28afdcc3_wave%20(1).svg"
          className="wave-image" // Add the rotate class
        />
        link: https://assets-global.website-files.com/61439762f5efe0d90dafdc9e/61439762f5efe06d62afdce7_609296a442ba851f27f247c9_Wave%20Ornament%20(2).svg
        link: https://assets-global.website-files.com/61439762f5efe0d90dafdc9e/61439762f5efe02822afdce5_60929947e4daea29f3c888c0_Ornament%20(1).svg
        
      </Row> */}
    </Container>
  );
};

export default Headline;
