import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, func } from "shards-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Options from "../components/answers/Options";
import QuestionLoader from "../components/QuestionLoader";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const cornerBtn = {
  position: "absolute",
  right: "45px",
  top: "15vh",
  fontSize: "45px",
  color: "#008080"
};

const ViewQuestion = props => {
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
  const [showLoader, setLoader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showHelp, setHelp] = React.useState(false);

  useEffect(() => {
    //request first question
    // props.setLoading(true);
    console.log(props);
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleShowButton = () => {
    setShowButton(true);
    setQA(true);
  };

  const nextQuestion = async e => {
    if (nr != total) {
      //axios request to get next question
      setLoader(true);
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
        console.log(modified_tp);
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
        // console.log(res.data);
        //add question to data array
        let newData = data;
        newData.push(res.data.random_question);
        setData(newData);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
      pushData(nr);
      setShowButton(false);
      setQA(false);
    } else {
      //if all questions are answered
      setLoader(true);
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
        console.log(modified_tp);
        const res = await axios.post(
          "http://localhost:5000/api/question/reqQuestion",
          {
            question_response: {
              ...modified_tp,
              student_response: responses[nr - 1]
            },
            student_response_id: student_response_id
          },
          config
        );
        setLoader(false);
        history.push("/dashboard");
        // console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const changeHelp = val => {
    setHelp(val);
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
    // console.log(data[nr]);
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
    // console.log(question);
  };

  return (
    <React.Fragment>
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
              changeHelp={changeHelp}
            />
          </Col>
        </Row>
        <Row>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            {showButton ? (
              <React.Fragment>
                <Button
                  style={cardStyles2}
                  onClick={nextQuestion}
                  id={"fin-btn"}
                >
                  {nr === total ? "Finish Quiz" : "Next Question"}
                </Button>
                {showLoader == true ? (
                  <div style={{ marginTop: "40px", marginLeft: "20px" }}>
                    <CircularProgress />
                  </div>
                ) : null}
              </React.Fragment>
            ) : null}
          </Col>
        </Row>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Oops! Need Help ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            We have curated a list of web resources that you might want to read
            before attempting this question again.
            <ul>
              <li>
                <a
                  target="_blank"
                  href="https://www.studytonight.com/dbms/select-query.php"
                >
                  https://www.studytonight.com/dbms/select-query.php
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.tutorialspoint.com/sql/sql-select-query.htm"
                >
                  https://www.tutorialspoint.com/sql/sql-select-query.htm
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.geeksforgeeks.org/sql-select-query/"
                >
                  https://www.geeksforgeeks.org/sql-select-query/
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://www.w3schools.com/sql/sql_select.asp"
                >
                  https://www.w3schools.com/sql/sql_select.asp
                </a>
              </li>
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {showHelp ? (
        <HelpOutlineIcon
          onClick={handleClickOpen}
          style={cornerBtn}
        ></HelpOutlineIcon>
      ) : null}
    </React.Fragment>
  );
};

export default ViewQuestion;
