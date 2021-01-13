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
    setSubArray,
    nr,
    timestamps,
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
    subtopic_arr
  } = props;

  const addPredeccesor = async () => {
    if (predecessorList.length > 0) {
      var copy = subtopic_arr;
      if (predecessorList.length > 1) {
        copy.unshift(predecessorList[0], predecessorList[1]);
        setSubArray(copy);
      } else {
        copy.unshift(predecessorList[0]);
        setSubArray(copy);
      }
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
            modified_tp["start_time"] = timestamps[nr - 2]["end_time"];
            modified_tp["end_time"] = timestamps[nr - 1]["tp"];
          }
          delete modified_tp.tp;

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
        props.setPredeccesorList([]);
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
                "It seems as if you are having a bit of difficulty in understanding the topic. Well, we went through the same thing ourselves. Answering questions of the previous subtopics helped us get a better grip on this concept."
              }
            </Typography>
            <Typography>
              {"Would you also like to do the same yourself ?"}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={addPredeccesor}
            >
              {"Yes, Please Take Me Back!"}
            </Button>
          </React.Fragment>
        </ThemeProvider>
      );
    } else {
      if (selectedDomains && suggestions.length > 0) {
        return (
          <React.Fragment>
            <hr style={{ backgroundColor: "white" }} />
            <Typography>
              {
                "We noticed that you like some websites better than the others. Well, we also do that XD. Here is a curated list of websites(From your favourites) to make you understand the concept better."
              }
            </Typography>
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
  }
};

export default RecommendationContent;
