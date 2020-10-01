import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "shards-react";
import "../../assets/color.css";

const cardStyles = {
  width: "100%",
  minHeight: "8vh",
  marginTop: "3vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
};

function Options(props) {
  const [isAnswered, setIA] = useState(props.isAnswered);
  const [classNames, setCN] = useState(["", "", "", ""]);

  const checkAnswer = e => {
    let { isAnswered, questionNumber } = props;

    let updatedClassNames = classNames;
    if (!isAnswered) {
      let elem = e.currentTarget;

      let { correct } = props;
      let answer = Number(elem.dataset.id);
      let key1 = "tp";
      let key2 = "user_reponse";
      props.setTimestamp({
        [key1]: Date.now(),
        [key2]: answer,
        question_id: props.QId
      });

      if (answer === correct) {
        updatedClassNames[answer - 1] = "right";
        alert("Bingo!");
      } else {
        updatedClassNames[answer - 1] = "wrong";
        alert("Sorry!");
      }
      setCN(updatedClassNames);

      props.showButton();
    }
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="1"
              outline
              className="right"
            >
              {props.answers[0]}
            </Button>
          </Col>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="2"
              outline
              className={classNames[1]}
            >
              {props.answers[1]}
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="3"
              outline
              className={classNames[2]}
            >
              {props.answers[2]}
            </Button>
          </Col>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="4"
              outline
              className={classNames[3]}
            >
              {props.answers[3]}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Options;
