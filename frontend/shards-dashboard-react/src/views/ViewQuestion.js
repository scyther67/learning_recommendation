import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import Options from "../components/answers/Options";
import data from "../data/questions";

const cardStyles = {
  background: "white",
  borderRadius: "15px",
  width: "100%",
  minHeight: "50vh",
  marginTop: "5vh",
  marginBottom: "1vh",
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

  useEffect(() => {
    setQuestion(data[nr].question);
    setAnswer([
      data[nr].answers[0],
      data[nr].answers[1],
      data[nr].answers[2],
      data[nr].answers[3]
    ]);
    setCorrect(data[nr].correct);
    setNr(nr + 1);
  }, []);

  const handleShowButton = () => {
    setShowButton(true);
    setQA(true);
  };

  return (
    <Container>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <div style={cardStyles}>
            <h2></h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <Options answers={answers} />
        </Col>
      </Row>
    </Container>
  );
};

export default ViewQuestion;
