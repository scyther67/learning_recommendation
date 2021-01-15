import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import theme from "../assets/theme";
import axios from "axios";
import { ThemeProvider } from "@material-ui/core/styles";
import ListItem from "../components/ListItem";

const RecommendationContent = props => {
  const {
    showMessage,
    goBack,
    selectedDomains,
    suggestions,
    predecessorList,
    setSubArr,
    nr,
    data,
    student_response_id,
    responses,
    changeHelp,
    setBtn1,
    setBtn2,
    setBtn3,
    setBtn4,
    setData,
    setLoader,
    setQA,
    pushData,
    setShowButton,
    total,
    subtopic_arr,
    startTimeStamp,
    endTimeStamp,
    setStartTimeStamp,
    setPredecessorList
  } = props;

  const stayOnSubtopic = async () => {
    props.setShowButton(false);
    props.setHelp(false);

    const config1 = {
      headers: {
        Authorization: localStorage.getItem("user_token")
      }
    };
    var resp = await axios.post(
      "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/user/updateSubtopicTimeStamp",
      {
        subtopic_no: subtopic_arr[0]
      },
      config1
    );
    props.setShowButton(true);
  };

  const addPredeccesor = async () => {
    if (predecessorList.length > 0) {
      var copy = subtopic_arr;
      if (predecessorList.length > 1) {
        copy.unshift(predecessorList[0], predecessorList[1]);
        setSubArr(copy);
      } else {
        copy.unshift(predecessorList[0]);
        setSubArr(copy);
      }
      try {
        const config1 = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        var resp = await axios.post(
          "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/user/updateSubtopicTimeStamp",
          {
            subtopic_no: copy[0]
          },
          config1
        );
      } catch (error) {
        console.log(error);
      }

      if (nr != total) {
        //axios request to get next question

        changeHelp(false);
        setStartTimeStamp(Date.now());
        setLoader(true);
        try {
          const config = {
            headers: {
              Authorization: localStorage.getItem("user_token")
            }
          };

          localStorage.setItem("last_asked_subtopic", copy[0]);
          const res = await axios.post(
            "https://sqlrecommender.southeastasia.cloudapp.azure.com/api/question/reqQuestion",
            {
              question_no: subtopic_arr[0],
              subtopic_no: copy[0],
              question_response: {
                question_start_timestamp:
                  startTimeStamp || localStorage.getItem("start_time"),
                question_end_timestamp: endTimeStamp,
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
        setPredecessorList([]);
        setBtn1("default");
        setBtn2("default");
        setBtn3("default");
        setBtn4("default");
      }
    }
  };

  if (showMessage) {
    return (
      <React.Fragment>
        {/* <Typography>{"Having some trouble ?"}</Typography> */}
        <hr style={{ backgroundColor: "white" }} />
        <Typography>
          {
            "We suggest you to browse the internet to get a thorough understanding of the topic being tested."
          }
        </Typography>
      </React.Fragment>
    );
  } else {
    if (goBack && predecessorList.length > 0) {
      return (
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <hr style={{ backgroundColor: "white" }} />
            <Typography>
              {
                "It seems as if you are having a bit of difficulty in understanding the topic. Well, we went through the same thing ourselves."
              }
            </Typography>
            <br />
            <Typography>
              {
                "Answering questions of the previous subtopics helped us get a better grip on this concept."
              }
            </Typography>
            <br />
            <Typography>
              {"Would you also like to do the same yourself ?"}
              <br />
              <br />
              <br />
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addPredeccesor}
              style={{
                // position: "absolute",
                // left: "50%",
                // transform: "translate(-50%, -50%)",
                marginBottom: "10px"
              }}
            >
              {"Yes, Please Take Me Back!"}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={stayOnSubtopic}
              style={
                {
                  // position: "absolute",
                  // left: "50%",
                  // transform: "translate(-50%, -50%)"
                }
              }
            >
              {"No, I Want To Stay! "}
            </Button>
          </React.Fragment>
        </ThemeProvider>
      );
    } else if (suggestions.length > 0) {
      return (
        <React.Fragment>
          <hr style={{ backgroundColor: "white" }} />
          <Typography>
            {
              "We have curated a list of web resources that you might want to read before attempting the next question."
            }
          </Typography>

          <hr style={{ backgroundColor: "white" }}></hr>
          <ul>
            {props.suggestions.map((item, index) => (
              <ListItem
                key={props.suggestions[index]}
                href={props.suggestions[index]}
                item={props.suggestions[index]}
              />
            ))}
          </ul>
        </React.Fragment>
      );
    }
  }
};

export default RecommendationContent;
