import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, func } from "shards-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Options from "../components/answers/Options";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import RecommendationContent from "../components/RecommendationContent";
import FlukeMessageComponent from "../components/FlukeMessageComponent";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import "../assets/prism.css";

const Prism = require("prismjs");

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#2b2b2b",
    color: "white",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid black",
    borderRadius: "5px",
    padding: "20px"
  }
}))(Tooltip);

const textStyles = makeStyles(theme => ({
  text: {
    maxWidth: 400
  }
}));

const cardStyles = {
  background: "#2b2b2b",
  borderRadius: "5px",
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

const FlukeIcon = {
  position: "absolute",
  left: "40px",
  top: "5vh",
  fontSize: "45px",
  color: "orange"
};

const ViewQuestion = props => {
  const classes = textStyles();
  let history = useHistory();
  const [data, setData] = useState([]);
  const [nr, setNr] = useState(0);
  const [total, setTotal] = useState(10);
  const [showButton, setShowButton] = useState(false);
  const [questionAnswered, setQA] = useState(false);
  const [question, setQuestion] = useState({});
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
  const [updateContent, setUpdate] = useState(0);
  const [subtopic_index, setIndex] = useState(0);
  const [showFlukeMessage, setFlukeMsg] = useState(false);
  const [violationLevelArray, setVLA] = useState([]);
  const [showMessage, setShowMessage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [goBack, setGoBack] = useState(null);
  const [selectedDomains, setSelectedDomains] = useState(null);
  const [predeccesorList, setPredeccesorList] = useState([]);

  const [subtopic_arr, setSubArr] = useState([
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9
  ]);
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
    if (!localStorage.getItem("user_token")) {
      history.push("/sign-in");
    }
    //request first question
    // console.log("Here", props);
    Prism.highlightAll();
    async function fetchData() {
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        var subtopic_number = subtopic_index;
        if (localStorage.getItem("subtopic_index")) {
          subtopic_number = localStorage.getItem("subtopic_index");
          setIndex(subtopic_number);
        }
        console.log("Subtopic Number", subtopic_arr[0]);
        const res = await axios.post(
          "http://localhost:5000/api/question/reqQuestion",
          { question_no: subtopic_arr[0], subtopic_number: subtopic_arr[0] },
          config
        );
        // console.log(res.data);
        //add question to data array
        let newData = data;
        setSRId(res.data.student_response_id);
        newData.push(res.data.random_question);
        // console.log(newData);
        setData(newData);
        var copy = subtopic_arr;
        if (localStorage.getItem("subtopic_index")) {
          for (let index = 0; index < subtopic_arr.length; ) {
            if (copy[index] != localStorage.getItem("subtopic_index")) {
              copy.shift();
            } else {
              break;
            }
          }
          console.log("Sub Array", copy);
          setSubArr(copy);
        }
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

      changeHelp(false);

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
          console.log("NR", nr);
          modified_tp["start_time"] = timestamps[nr - 2]["end_time"];
          modified_tp["end_time"] = timestamps[nr - 1]["tp"];
        }
        delete modified_tp.tp;
        console.log("Next Question on", subtopics_list[subtopic_arr[0]]);
        console.log("Q", data[nr - 1]);
        const res = await axios.post(
          "http://localhost:5000/api/question/reqQuestion",
          {
            question_no: subtopic_arr[0],
            subtopic_number: subtopic_arr[0],
            question_response: {
              ...modified_tp,
              student_response: responses[nr - 1],
              question_id: data[nr - 1]._id
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
          modified_tp["start_time"] = timestamps[nr - 2]["tp"];
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
        //Saving Last Subtopic asked
        localStorage.setItem("subtopic_index", subtopic_index);
        setLoader(false);
        history.push("/");
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
    // console.log(newrp);
  };

  const setTimestamp = ts => {
    let newtp = timestamps;
    newtp.push(ts);
    setTS(newtp);
    console.log(newtp);
  };

  const pushData = nr => {
    // console.log(data[nr]);
    setQuestion(data[nr]);
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
              <h4 style={{ color: "white", marginTop: "2vh" }}>
                Question {nr}/{total}
              </h4>
              <Typography variant="h6" style={{ color: "white" }}>
                {question.question_header}
              </Typography>
              <pre
                style={{
                  fontSize: "20px",
                  maxWidth: "100%"
                  // overflowWrap: "break-word",
                  // whiteSpace: "pre-wrap"
                }}
              >
                <code className="language-sql">{question.question_query}</code>
              </pre>
              <Typography variant="h6" style={{ color: "white" }}>
                {question.question_footer}
              </Typography>
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
              timestamps={timestamps}
              NR={nr}
              subtopic_index={subtopic_index}
              setIndex={setIndex}
              setShowMessage={setShowMessage}
              setGoBack={setGoBack}
              setSuggestions={setSuggestions}
              setSelectedDomains={setSelectedDomains}
              setPredeccesorList={setPredeccesorList}
              subtopic_arr={subtopic_arr}
              setSubArr={setSubArr}
              setFlukeMsg={setFlukeMsg}
              showFlukeMessage={showFlukeMessage}
              violationLevelArray={violationLevelArray}
              setVLA={setVLA}
              subtopics_list={subtopics_list}
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
                  <div
                    style={{
                      marginTop: "40px",
                      marginLeft: "20px"
                    }}
                  >
                    <CircularProgress />
                  </div>
                ) : null}
              </React.Fragment>
            ) : null}
          </Col>
        </Row>
      </Container>
      {question.questionImageUrl ? (
        <Button
          onClick={handleClickOpen}
          style={{
            position: "absolute",
            borderRadius: "5px",
            left: "5vw",
            top: "20vh",
            backgroundColor: "#2b2b2b",
            fontSize: "14px",
            height: "5vh"
          }}
        >
          View Question Image
        </Button>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100vw" }}
      >
        <DialogTitle id="alert-dialog-title">{"Table View"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Table/Schema for the Question
          </DialogContentText>
          <img
            style={{
              width: "550px"
            }}
            src={question.questionImageUrl}
            alt="No Image for this"
          />
        </DialogContent>
      </Dialog>

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
              <RecommendationContent
                showMessage={showMessage}
                goBack={goBack}
                selectedDomains={selectedDomains}
                suggestions={suggestions}
                predeccesorList={predeccesorList}
              />
            </React.Fragment>
          }
        >
          <HelpOutlineIcon style={cornerBtn}>Hint</HelpOutlineIcon>
        </HtmlTooltip>
      ) : null}
      {showFlukeMessage ? (
        <HtmlTooltip
          interactive
          leaveDelay={500}
          placement="bottom-start"
          classes={{ tooltip: classes.text }}
          arrow
          title={
            <React.Fragment>
              <Typography variant="h6" color="inherit">
                We noticed something odd!
              </Typography>
              <br />
              <FlukeMessageComponent />
            </React.Fragment>
          }
        >
          <AnnouncementIcon style={FlukeIcon}>Hint</AnnouncementIcon>
        </HtmlTooltip>
      ) : null}
    </React.Fragment>
  );
};

export default ViewQuestion;
