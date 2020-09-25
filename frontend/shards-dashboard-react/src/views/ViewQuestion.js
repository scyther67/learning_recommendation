import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "shards-react";
import Options from "../components/answers/Options";
import data from "../data/questions";

const cardStyles = {
  background: "white",
  borderRadius: "15px",
  width: "100%",
  minHeight: "50vh",
  marginTop: "5vh",
  marginBottom: "1vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "justify",
  paddingLeft: "3vw",
  paddingRight: "3vw"
};

const cardStyles2 = {
  width: "20vw",
  minHeight: "8vh",
  marginTop: "3vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
};

const ViewQuestion = () => {
  const [nr, setNr] = useState(0);
  const [total, setTotal] = useState(data.length);
  const [showButton, setShowButton] = useState(false);
  const [questionAnswered, setQA] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswer] = useState([]);
  const [correct, setCorrect] = useState("");
  const [timestamps, setTS] = useState([]);

  useEffect(() => {
    pushData(nr);
  }, []);

  const handleShowButton = () => {
    setShowButton(true);
    setQA(true);
  };

  const nextQuestion = e => {
    if (nr != total) {
      setNr(nr + 1);
      pushData(nr);
      setShowButton(false);
      setQA(false);
    } else {
      console.log("Final List ", timestamps);
    }
  };

  const setTimestamp = ts => {
    let newtp = timestamps;
    newtp.push(ts);
    setTS(newtp);
    console.log(newtp);
  };

  const pushData = nr => {
    setQuestion(data[nr].question);
    setAnswer([
      data[nr].answers[0],
      data[nr].answers[1],
      data[nr].answers[2],
      data[nr].answers[3]
    ]);
    setCorrect(data[nr].correct);
    setNr(nr + 1);
  };

  return (
    <Container>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <div style={cardStyles}>
            <h4>
              Question {nr}/{total}
            </h4>
            <h2>{question}</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <Options
            answers={answers}
            correct={correct}
            showButton={handleShowButton}
            isAnswered={questionAnswered}
            setTimestamp={setTimestamp}
            questionNumber={nr}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          {showButton ? (
            <Button style={cardStyles2} onClick={nextQuestion} id={"fin-btn"}>
              {nr === total ? "Finish Quiz" : "Next Question"}
            </Button>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewQuestion;
