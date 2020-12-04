import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, func } from "shards-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Options from "../components/answers/Options";
import QuestionLoader from "../components/QuestionLoader";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "../assets/prism.css";
const Prism = require("prismjs");

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#add8e6",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 400,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid black"
  }
}))(Tooltip);

const textStyles = makeStyles(theme => ({
  text: {
    maxWidth: 400
  }
}));

const cardStyles = {
  background: "#2b2b2b",
  borderRadius: "15px",
  width: "100%",
  minHeight: "40vh",
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
  // const quesCode = question;
  // const html = Prism.highlight(quesCode, Prism.languages.sql, "sql");
  const classes = textStyles();
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
  const [btn1, setBtn1] = useState("default");
  const [btn2, setBtn2] = useState("default");
  const [btn3, setBtn3] = useState("default");
  const [btn4, setBtn4] = useState("default");

  useEffect(() => {
    //request first question
    console.log(props);
    Prism.highlightAll();
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
      setBtn1("default");
      setBtn2("default");
      setBtn3("default");
      setBtn4("default");
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
              <h4 style={{ color: "white" }}>
                Question {nr}/{total}
              </h4>
              <pre
                style={{
                  fontSize: "20px",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  whiteSpace: "pre-wrap"
                  // border: "2px solid red"
                }}
              >
                <code className="language-sql">{question}</code>
              </pre>
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
              setBtn1={setBtn1}
              setBtn2={setBtn2}
              setBtn3={setBtn3}
              setBtn4={setBtn4}
              btn1={btn1}
              btn2={btn2}
              btn3={btn3}
              btn4={btn4}
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

      {showHelp ? (
        <HtmlTooltip
          interactive
          leaveDelay={500}
          placement="bottom-start"
          classes={{ tooltip: classes.text }}
          arrow
          title={
            <React.Fragment>
              <Typography variant="h6" color="inherit">
                Need Help ?
              </Typography>
              <br />
              <Typography>
                We have curated a list of web resources that you might want to
                read before attempting this question again.
              </Typography>
              <hr></hr>
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
            </React.Fragment>
          }
        >
          <HelpOutlineIcon style={cornerBtn}></HelpOutlineIcon>
        </HtmlTooltip>
      ) : null}
    </React.Fragment>
  );
};

export default ViewQuestion;
