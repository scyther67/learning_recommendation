import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../assets/theme";

const cardStyles = {
  width: "100%",
  minHeight: "9vh",
  marginTop: "3vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  color: "white"
};

function Options(props) {
  const [isAnswered, setIA] = useState(props.isAnswered);
  const [classNames, setCN] = useState(["", "", "", ""]);
  const [WA, setWA] = useState([]);
  const [btn1, setBtn1] = useState("default");
  const [btn2, setBtn2] = useState("default");
  const [btn3, setBtn3] = useState("default");
  const [btn4, setBtn4] = useState("default");

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
        if (answer == 0) {
          setBtn1("primary");
        } else if (answer == 1) {
          setBtn2("primary");
        } else if (answer == 2) {
          setBtn3("primary");
        } else if (answer == 3) {
          setBtn4("primary");
        }
        updatedClassNames[answer] = "right";
        // alert("Bingo!");
        props.setTimestamp({
          [key1]: Date.now(),
          [key2]: answer,
          question_id: props.QId,
          incorrect_attempts: WA
        });
        setWA([]);
        props.changeHelp(false);
        props.showButton();
      } else {
        if (answer == 0) {
          setBtn1("secondary");
        } else if (answer == 1) {
          setBtn2("secondary");
        } else if (answer == 2) {
          setBtn3("secondary");
        } else if (answer == 3) {
          setBtn4("secondary");
        }
        updatedClassNames[answer] = "wrong";
        // alert("Sorry!");
        let arr = WA;
        arr.push(answer);
        setWA(arr);
        if (arr.length >= 2) {
          props.changeHelp(true);
        }
      }

      setCN(updatedClassNames);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container>
          <Row>
            <Col>
              <Button
                style={cardStyles}
                onClick={checkAnswer}
                data-id="0"
                outline
                variant="contained"
                color={btn1}
                // className="right"
              >
                <pre>{props.answers[0]}</pre>
              </Button>
            </Col>
            <Col>
              <Button
                style={cardStyles}
                onClick={checkAnswer}
                data-id="1"
                variant="contained"
                color={btn2}
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
                variant="contained"
                color={btn3}
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
                variant="contained"
                color={btn4}
                className={classNames[3]}
              >
                <pre>{props.answers[3]}</pre>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Options;
