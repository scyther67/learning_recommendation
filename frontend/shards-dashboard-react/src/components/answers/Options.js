import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "shards-react";
import "../../assets/color.css";

const cardStyles = {
  width: "100%",
  minHeight: "9vh",
  marginTop: "3vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
};

function Options(props) {
  const [isAnswered, setIA] = useState(props.isAnswered);
  const [classNames, setCN] = useState(["", "", "", ""]);
  const [WA, setWA] = useState([]);

  const checkAnswer = e => {
    let { isAnswered, questionNumber } = props;

    let updatedClassNames = classNames;
    if (!isAnswered) {
      let elem = e.currentTarget;

      let { correct } = props;
      let all_answers = [];
      let answer = Number(elem.dataset.id);
      all_answers.push(answer);
      let key1 = "tp";
      let key2 = "user_response";

      if (answer === correct) {
        updatedClassNames[answer - 1] = "right";
        alert("Bingo!");
        props.setTimestamp({
          [key1]: Date.now(),
          [key2]: answer,
          question_id: props.QId,
          incorrect_attempts: WA
        });
        setWA([]);
        props.showButton();
      } else {
        updatedClassNames[answer - 1] = "wrong";
        alert("Sorry!");
        let arr = WA;
        arr.push(answer);
        setWA(arr);
      }

      setCN(updatedClassNames);
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
              data-id="0"
              outline
              className="right"
            >
              <pre>{props.answers[0]}</pre>
            </Button>
          </Col>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="1"
              outline
              className={classNames[1]}
            >
              <pre>{props.answers[1]}</pre>
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="2"
              outline
              className={classNames[2]}
            >
              <pre> {props.answers[2]}</pre>
            </Button>
          </Col>
          <Col>
            <Button
              style={cardStyles}
              onClick={checkAnswer}
              data-id="3"
              outline
              className={classNames[3]}
            >
              <pre>{props.answers[3]}</pre>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Options;
