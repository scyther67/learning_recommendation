import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import theme from "../assets/theme";
import { ThemeProvider } from "@material-ui/core/styles";

const RecommendationContent = props => {
  const {
    showMessage,
    goBack,
    selectedDomains,
    suggestions,
    predecessorList,
    subtopics_arr,
    setSubArray
  } = props;

  const addPredeccesor = () => {
    var copy = subtopics_arr;
    copy.unshift(predecessorList[0], predecessorList[1]);
    setSubArray(copy);
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
    if (goBack) {
      return (
        <ThemeProvider theme={theme}>
          <React.Fragment>
            {/* <Typography>{"Having some trouble ?"}</Typography> */}
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
      if (selectedDomains && suggestions) {
        return (
          <React.Fragment>
            {/* <Typography>{"Having some trouble ?"}</Typography> */}
            <hr style={{ backgroundColor: "white" }} />
            <Typography>
              {
                "We noticed that you like some websites better than the others. Well, we also do that XD. Here is a curated list of websites(From your favourites) to make you understand the concept better."
              }
            </Typography>
            <ul>
              <li>
                <a target="_blank" href={suggestions[0]}>
                  {suggestions[0]}
                </a>
              </li>
              <li>
                <a target="_blank" href={suggestions[1]}>
                  {suggestions[1]}
                </a>
              </li>
              <li>
                <a target="_blank" href={suggestions[2]}>
                  {suggestions[2]}
                </a>
              </li>
            </ul>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {/* <Typography>{"Having some trouble ?"}</Typography> */}
            <hr style={{ backgroundColor: "white" }} />
            <Typography>
              {
                "We have curated a list of web resources that you might want to read before attempting the next question."
              }
            </Typography>

            <hr style={{ backgroundColor: "white" }}></hr>
            <ul>
              <li>
                <a target="_blank" href={props.suggestions[0]}>
                  {props.suggestions[0]}
                </a>
              </li>
              <li>
                <a target="_blank" href={props.suggestions[1]}>
                  {props.suggestions[1]}
                </a>
              </li>
              <li>
                <a target="_blank" href={props.suggestions[2]}>
                  {props.suggestions[2]}
                </a>
              </li>
            </ul>
          </React.Fragment>
        );
      }
    }
  }
};

export default RecommendationContent;
