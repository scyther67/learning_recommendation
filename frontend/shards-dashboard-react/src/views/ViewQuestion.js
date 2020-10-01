import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "shards-react";
import Options from "../components/answers/Options";
import data from "../data/questions";
import axios from "axios";

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
  const [responses, setRP] = useState([]);
  const [QId, setQid] = useState(0);

  useEffect(() => {
    pushData(nr);
  }, []);

  const handleShowButton = () => {
    setShowButton(true);
    setQA(true);
  };

  const nextQuestion = async e => {
    if (nr != total) {
      setNr(nr + 1);
      pushData(nr);
      setShowButton(false);
      setQA(false);
    } else {
      let modified_tp = timestamps;
      let start_time = await localStorage.getItem("start_time");
      modified_tp[0]["start_time"] = Number(start_time);
      modified_tp[0]["end_time"] = modified_tp[0]["tp"];
      for (let i = 1; i < timestamps.length; i++) {
        modified_tp[i]["start_time"] = modified_tp[i - 1]["tp"];
        modified_tp[i]["end_time"] = modified_tp[i]["tp"];
      }
      for (let i = 1; i < timestamps.length; i++) {
        delete modified_tp[i].tp;
      }
      delete modified_tp[0].tp;
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        console.log(config);
        const res = await axios.post(
          "http://localhost:5000/api/student-response",
          { timestamps: modified_tp },
          config
        );
        console.log(res.status);
        localStorage.removeItem("start_time");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setResponse = rp => {
    let newrp = responses;
    newrp.push(rp);
    setRP(newrp);
    console.log(newrp);
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
    setQid(data[nr].qid);
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
            setRP={setResponse}
            QId={QId}
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
