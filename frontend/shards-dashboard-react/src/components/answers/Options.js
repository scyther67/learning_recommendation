import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import "../../assets/prism.css";
import theme from "../../assets/theme";
import Prism from "prismjs";
import axios from "axios";
import "prismjs/components/prism-sql";

const cardStyles = {
  width: "100%",
  height: "10vh",
  marginTop: "3vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  padding: "5px"
  // color: "white",
};

const synStyle = {
  width: "95%"
};

function Options(props) {
  // const [isAnswered, setIA] = useState(props.isAnswered);
  const [classNames, setCN] = useState(["", "", "", ""]);
  const [WA, setWA] = useState([]);
  var { btn1, btn2, btn3, btn4 } = props;
  const subtopics_list = [
    "SELECT",
    "UPDATE",
    "GROUP BY",
    "CREATE",
    "INSERT",
    "DELETE",
    "JOINS",
    "PREDICATE",
    "SET OPERATORS",
    "AGGREGATION"
  ];

  useEffect(() => {
    Prism.highlightAll();
  });

  const checkAnswer = async e => {
    var {
      isAnswered,
      questionNumber,
      setBtn1,
      setBtn2,
      setBtn3,
      setBtn4
    } = props;

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
        props.setIndex(props.subtopic_index + 1);
        updatedClassNames[answer] = "right";
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

        let arr = WA;
        arr.push(answer);
        setWA(arr);
        //  API request for recommendation content would be placed here
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        try {
          if (props.NR - 1 == 0) {
            const res = await axios.post(
              "http://localhost:5000/api/suggestions",
              {
                // subtopic: subtopics_list[props.subtopic_index],
                subtopic: "N/A",
                question_start_timestamp: localStorage.getItem("start_time")
              },
              config
            );
            console.log("DATA RETURN ", res.data);
            if (res.data.showMessage) {
              props.setShowMessage(res.data.showMessage);
            } else {
              props.setWeblist(res.data.suggestions);
            }
          } else {
            const res = await axios.post(
              "http://localhost:5000/api/suggestions",
              {
                // subtopic: subtopics_list[props.subtopic_index],
                subtopic: "N/A",
                question_start_timestamp:
                  props.timestamps[props.NR - 2]["end_time"]
              },
              config
            );
            console.log("DATA RETURN ", res.data);
            if (res.data.showMessage) {
              props.setShowMessage(res.data.showMessage);
            } else {
              props.setWeblist(res.data.suggestions);
            }
          }
        } catch (error) {
          console.log("ERROR", error);
        }

        props.setUpdate(props.updateContent + 1);
        props.changeHelp(true);
      }
      props.setTimestamp({
        [key1]: Date.now(),
        [key2]: answer,
        question_id: props.QId,
        incorrect_attempts: WA
      });
      setWA([]);

      props.showButton();
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
              >
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[0]}</code>
                </pre>
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
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[1]}</code>
                </pre>
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
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[2]}</code>
                </pre>
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
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[3]}</code>
                </pre>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Options;
