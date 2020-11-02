import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, func } from "shards-react";
import Options from "../components/answers/Options";
// import data from "../data/questions";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
  let history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user_token")) {
      history.push("/sign-in");
    }
  }, []);
  const [data, setData] = useState([]);
  const [nr, setNr] = useState(0);
  const [total, setTotal] = useState(5);
  const [showButton, setShowButton] = useState(false);
  const [questionAnswered, setQA] = useState(false);
  const [question, setQuestion] = useState("");
  const [answers, setAnswer] = useState([]);
  const [correct, setCorrect] = useState("");
  const [timestamps, setTS] = useState([]);
  const [responses, setRP] = useState([]);
  const [QId, setQid] = useState(0);
  const [student_response_id, setSRId] = useState("");

  useEffect(() => {
    //request first question
    async function fetchData() {
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        const res = await axios.post(
          "http://localhost:5000/api/question/reqQuestion",
          { question_no: 0 },
          config
        );
        console.log(res.data);
        //add question to data array
        let newData = data;
        setSRId(res.data.student_response_id);
        newData.push(res.data.random_question);
        console.log(newData);
        setData(newData);
      } catch (error) {
        console.log(error);
      }
      pushData(nr);
    }
    fetchData();
  }, []);

  const handleShowButton = () => {
    setShowButton(true);
    setQA(true);
  };

  const nextQuestion = async e => {
    if (nr != total) {
      //axios request to get next question
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        //editing timestamps
        let modified_tp = timestamps[nr - 1];
        if (nr - 1 == 0) {
          let start_time = localStorage.getItem("start_time");
          modified_tp["start_time"] = Number(start_time);
          modified_tp["end_time"] = modified_tp["tp"];
        } else {
          modified_tp["start_time"] = timestamps[nr - 1]["tp"];
          modified_tp["end_time"] = modified_tp["tp"];
        }
        delete modified_tp.tp;
        const res = await axios.post(
          "http://localhost:5000/api/question/reqQuestion",
          {
            question_no: nr,
            question_response: {
              ...modified_tp,
              student_response: responses[nr - 1]
            },
            student_response_id: student_response_id
          },
          config
        );
        console.log(res.data);
        //add question to data array
        let newData = data;
        newData.push(res.data.random_question);
        setData(newData);
      } catch (error) {
        console.log(error);
      }
      pushData(nr);
      setShowButton(false);
      setQA(false);
    } else {
      //if all questions are answered
      // let modified_tp = timestamps;
      // let start_time = await localStorage.getItem("start_time");
      // modified_tp[0]["start_time"] = Number(start_time);
      // modified_tp[0]["end_time"] = modified_tp[0]["tp"];
      // for (let i = 1; i < timestamps.length; i++) {
      //   modified_tp[i]["start_time"] = modified_tp[i - 1]["tp"];
      //   modified_tp[i]["end_time"] = modified_tp[i]["tp"];
      // }
      // for (let i = 1; i < timestamps.length; i++) {
      //   delete modified_tp[i].tp;
      // }
      // delete modified_tp[0].tp;
      // try {
      //   const config = {
      //     headers: {
      //       Authorization: localStorage.getItem("user_token")
      //     }
      //   };
      //   console.log(config);
      //   const res = await axios.post(
      //     "http://localhost:5000/api/reqQuestion",
      //     { timestamps: modified_tp },
      //     config
      //   );
      //   console.log(res.status);
      //   localStorage.removeItem("start_time");
      // } catch (error) {
      //   console.log(error);
      // }
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
    console.log(data[nr]);
    setQuestion(data[nr].description);
    setAnswer([
      data[nr].alternatives[0].text,
      data[nr].alternatives[1].text,
      data[nr].alternatives[2].text,
      data[nr].alternatives[3].text
    ]);
    setQid(data[nr]._id);
    setCorrect(data[nr].correct);
    setNr(nr + 1);
    console.log(question);
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
