import React from "react";
import { Container, Row, Col, Button } from "shards-react";

const cardStyles = {
  width: "100%",
  minHeight: "8vh",
  marginTop: "3vh"
};

function Options(props) {
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Button style={cardStyles} outline>
              {props.answers[0]}
            </Button>
          </Col>
          <Col>
            <Button style={cardStyles} outline>
              {props.answers[1]}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button style={cardStyles} outline>
              {props.answers[2]}
            </Button>
          </Col>
          <Col>
            <Button style={cardStyles} outline>
              {props.answers[3]}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button style={cardStyles} outline>
              Next
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Options;
