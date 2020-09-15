import React from "react";
import { Container, Row, Col } from "shards-react";

const QuizStart = () => {
  return (
    <Container>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <div
            style={{
              background: "white",
              borderRadius: "7px",
              width: "100%",
              minHeight: "50vh",
              marginTop: "8vh"
            }}
          ></div>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizStart;
