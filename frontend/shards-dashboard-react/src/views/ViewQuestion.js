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
import SelectedDomainsComponent from "../components/SelectedDomainsComponent";
import "../assets/prism.css";
import "../assets/scroll-bar.css";
import LinearProgressWithLabel from "../components/LinearProgressBar";

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
  marginBottom: "4vh",
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

const cornerBtn2 = {
  position: "absolute",
  right: "40px",
  top: "50vh",
  fontSize: "45px",
  color: "#008080"
};

const cornerBtn1 = {
  position: "absolute",
  right: "40px",
  top: "5vh",
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
  const [startTimeStamp, setStartTimeStamp] = useState(null);
  const [endTimeStamp, setEndTimeStamp] = useState(null);
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
  const [predecessorList, setPredecessorList] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [lastAskedSubtopic, setLastAskedSubtopic] = useState(-1);
  const [progressValue, setProgressValue] = useState(0);
  const [carry_forward, setCarryForward] = useState(0);
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
    9,
    10,
    10
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
    if (JSON.parse(localStorage.getItem("subtopic_arr"))) {
      if (JSON.parse(localStorage.getItem("subtopic_arr")).length <= 0) {
        history.push("/test-end");
      }
    }

    Prism.highlightAll();
    async function fetchData() {
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        var subtopic_number = subtopic_arr[0];
        var stored_subtopic_arr = subtopic_arr;
        if (localStorage.getItem("subtopic_arr")) {
          stored_subtopic_arr = JSON.parse(
            localStorage.getItem("subtopic_arr")
          );
          if (
            Number(localStorage.getItem("last_asked_subtopic")) !=
            stored_subtopic_arr[0]
          ) {
            console.log("Change ST", Date.now());
            const config = {
              headers: {
                Authorization: localStorage.getItem("user_token")
              }
            };
            var resp = await axios.post(
              "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/user/updateSubtopicTimeStamp",
              {
                subtopic_no: stored_subtopic_arr[0]
              },
              config
            );
          }
          subtopic_number = stored_subtopic_arr[0];
          setSubArr(stored_subtopic_arr);
        } else if (stored_subtopic_arr[0] == 0) {
          const config = {
            headers: {
              Authorization: localStorage.getItem("user_token")
            }
          };
          var resp = await axios.post(
            "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/user/updateSubtopicTimeStamp",
            {
              subtopic_no: stored_subtopic_arr[0]
            },
            config
          );
          localStorage.setItem(
            "subtopic_arr",
            JSON.stringify(stored_subtopic_arr)
          );
        }
        localStorage.setItem("last_asked_subtopic", stored_subtopic_arr[0]);
        const res = await axios.post(
          "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/question/reqQuestion",
          { subtopic_no: subtopic_number },
          config
        );
        // console.log(res.data);
        //add question to data array
        let newData = data;
        setSRId(res.data.student_response_id);
        newData.push(res.data.random_question);
        // console.log(newData);
        setData(newData);
        setProgressValue(getProgressValue);
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
    if (JSON.parse(localStorage.getItem("subtopic_arr")).length > 0) {
      if (carry_forward + 1 >= 2) {
        changeHelp(false);
        setSelectedDomains(false);
      }
      setCarryForward(carry_forward + 1);
      //axios request to get next question
      setFlukeMsg(false);
      // changeHelp(false);
      setStartTimeStamp(Date.now());
      setLoader(true);
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        console.log("Asking Question for ", subtopic_arr[0]);
        localStorage.setItem("last_asked_subtopic", subtopic_arr[0]);
        const res = await axios.post(
          "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/question/reqQuestion",
          {
            question_no: subtopic_arr[0],
            subtopic_no: subtopic_arr[0],
            question_response: {
              question_start_timestamp:
                props.startTimeStamp || localStorage.getItem("start_time"),
              question_end_timestamp: props.endTimeStamp,
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
      // setPredecessorList([]);
      pushData(nr);
      setShowButton(false);
      setQA(false);
      setBtn1("default");
      setBtn2("default");
      setBtn3("default");
      setBtn4("default");
      setProgressValue(getProgressValue);
    } else {
      //if all questions are answered
      setLoader(true);
      try {
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };

        const res = await axios.post(
          "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/question/reqQuestion",
          {
            question_response: {
              question_start_timestamp: props.startTimeStamp,
              question_end_timestamp: props.endTimeStamp,
              student_response: responses[nr - 1]
            },
            student_response_id: student_response_id
          },
          config
        );
        //Saving Last Subtopic asked
        localStorage.setItem("subtopic_index", subtopic_index);
        setLoader(false);
        console.log(
          "FIN ARR",
          JSON.parse(localStorage.getItem("subtopic_arr"))
        );
        if (JSON.parse(localStorage.getItem("subtopic_arr")).length == 0) {
          localStorage.removeItem("subtopic_arr");
          localStorage.removeItem("last_asked_subtopic");
          history.push("/test-end");
        } else {
          history.push("/");
        }

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

  const setTimestamp = (start_ts, end_ts) => {
    if (start_ts) {
      setStartTimeStamp(start_ts);
    }
    if (end_ts) {
      setEndTimeStamp(end_ts);
    }
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

  const getProgressValue = () => {
    var ogLength = 22;
    var currLength = JSON.parse(localStorage.getItem("subtopic_arr")).length;
    console.log("VL=", ogLength, currLength);
    var retVal = ((ogLength - currLength) / ogLength) * 100;
    return ((ogLength - currLength) / ogLength) * 100;
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col sm={{ size: 10, order: 2, offset: 1 }}>
            <div style={cardStyles}>
              <div style={{ width: "100%" }}>
                <LinearProgressWithLabel value={progressValue} />
                <br />
                <br />
              </div>
              {/* <h4 style={{ color: "white", marginTop: "2vh" }}>
                Question {nr}/{total}
              </h4> */}
              <Typography variant="h6" style={{ color: "white" }}>
                {question.question_header}
              </Typography>

              <pre
                id="scroll-bar"
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
              startTimeStamp={startTimeStamp}
              endTimeStamp={endTimeStamp}
              setEndTimeStamp={setEndTimeStamp}
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
              NR={nr}
              subtopic_index={subtopic_index}
              setIndex={setIndex}
              setShowMessage={setShowMessage}
              setGoBack={setGoBack}
              setSuggestions={setSuggestions}
              setSelectedDomains={setSelectedDomains}
              setPredecessorList={setPredecessorList}
              subtopic_arr={subtopic_arr}
              setSubArr={setSubArr}
              setFlukeMsg={setFlukeMsg}
              showFlukeMessage={showFlukeMessage}
              violationLevelArray={violationLevelArray}
              setVLA={setVLA}
              subtopics_list={subtopics_list}
              data={data}
              setSelectedSuggestions={setSelectedSuggestions}
              setLastAskedSubtopic={setLastAskedSubtopic}
              setProgressValue={setProgressValue}
              getProgressValue={getProgressValue}
              carry_forward={carry_forward}
              setCarryForward={setCarryForward}
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
            <div
              style={{
                paddingBottom: "2vh"
              }}
            >
              <Typography variant="h6" color="inherit">
                Need Help ?
              </Typography>
              <br />
              <RecommendationContent
                showMessage={showMessage}
                goBack={goBack}
                selectedDomains={selectedDomains}
                suggestions={suggestions}
                predecessorList={predecessorList}
                setSubArr={setSubArr}
                subtopic_arr={subtopic_arr}
                nr={nr}
                data={data}
                student_response_id={student_response_id}
                responses={responses}
                changeHelp={changeHelp}
                setBtn1={setBtn1}
                setBtn2={setBtn2}
                setBtn3={setBtn3}
                setBtn4={setBtn4}
                setData={setData}
                setLoader={setLoader}
                setQA={setQA}
                pushData={pushData}
                setShowButton={setShowButton}
                total={total}
                startTimeStamp={startTimeStamp}
                endTimeStamp={endTimeStamp}
                setStartTimeStamp={setStartTimeStamp}
                setPredecessorList={setPredecessorList}
                setShowButton={setShowButton}
                setHelp={setHelp}
                getProgressValue={getProgressValue}
                setProgressValue={setProgressValue}
              />
            </div>
          }
        >
          <HelpOutlineIcon style={cornerBtn2}>Hint</HelpOutlineIcon>
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
      {selectedDomains ? (
        <HtmlTooltip
          interactive
          leaveDelay={500}
          placement="bottom-start"
          classes={{ tooltip: classes.text }}
          arrow
          title={
            <React.Fragment>
              <Typography variant="h6" color="inherit">
                Here's Something from Our Side
              </Typography>
              <br />
              <SelectedDomainsComponent
                selectedSuggestions={selectedSuggestions}
              />
            </React.Fragment>
          }
        >
          <AnnouncementIcon style={cornerBtn1}>Hint</AnnouncementIcon>
        </HtmlTooltip>
      ) : null}
    </React.Fragment>
  );
};

export default ViewQuestion;
