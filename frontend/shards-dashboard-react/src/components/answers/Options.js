import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import Button from "@material-ui/core/Button";
import { ThemeProvider } from "@material-ui/core/styles";
import "../../assets/prism.css";
import theme from "../../assets/theme";
import Prism from "prismjs";
import axios from "axios";
import "prismjs/components/prism-sql";

const cardStyles = {
  width: "100%",
  height: "10vh",
  marginTop: "3vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  padding: "5px",
  borderRadius: "5px"
  // color: "white",
};

const synStyle = {
  width: "95%"
};

function Options(props) {
  // const [isAnswered, setIA] = useState(props.isAnswered);
  const [classNames, setCN] = useState(["", "", "", ""]);
  const [WA, setWA] = useState([]);
  var { btn1, btn2, btn3, btn4 } = props;
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
    Prism.highlightAll();
  });

  const checkAnswer = async e => {
    var {
      isAnswered,
      questionNumber,
      setBtn1,
      setBtn2,
      setBtn3,
      setBtn4
    } = props;

    let updatedClassNames = classNames;
    if (!isAnswered) {
      let elem = e.currentTarget;

      let { correct } = props;
      let all_answers = [];
      let answer = Number(elem.dataset.id);
      all_answers.push(answer);
      var endTimeStamp = Date.now();
      props.setEndTimeStamp(endTimeStamp);
      if (answer === correct) {
        if (answer == 0) {
          setBtn1("primary");
        } else if (answer == 1) {
          setBtn2("primary");
        } else if (answer == 2) {
          setBtn3("primary");
        } else if (answer == 3) {
          setBtn4("primary");
        }

        var copy = props.subtopic_arr;
        // API for Subtopic Switch
        if (copy.length > 1 && copy[1] != copy[0]) {
          console.log("Change ST");
          const config = {
            headers: {
              Authorization: localStorage.getItem("user_token")
            }
          };
          var resp = await axios.post(
            "http://localhost:5000/api/user/updateSubtopicTimeStamp",
            {
              subtopic_no: copy[1]
            },
            config
          );
        }
        copy.shift();

        props.setSubArr(copy);

        localStorage.setItem("subtopic_arr", JSON.stringify(copy));
      } else {
        if (answer == 0) {
          setBtn1("secondary");
        } else if (answer == 1) {
          setBtn2("secondary");
        } else if (answer == 2) {
          setBtn3("secondary");
        } else if (answer == 3) {
          setBtn4("secondary");
        }
        updatedClassNames[answer] = "wrong";

        let arr = WA;
        arr.push(answer);
        setWA(arr);
        //  API request for recommendation content would be placed here
        const config = {
          headers: {
            Authorization: localStorage.getItem("user_token")
          }
        };
        try {
          if (props.NR - 1 == 0) {
            console.log(
              "TIME TAKEN",
              endTimeStamp - Number(localStorage.getItem("start_time"))
            );

            const res = await axios.post(
              "http://localhost:5000/api/suggestions/suggestionBySubTopic",
              {
                subtopic: props.subtopic_arr[0],
                question_start_timestamp: Number(
                  localStorage.getItem("start_time")
                ),
                question_end_timestamp: endTimeStamp,
                question_id: props.data[props.NR - 1]._id
              },
              config
            );
            console.log("RES_DATA", res.data);
            props.setShowMessage(res.data.showBrowseMessage);
            props.setGoBack(res.data.goBack);
            props.setSelectedDomains(res.data.domainSuggestionsBool);
            if (res.data.domainSuggestionsBool) {
              var randomSuggestions = res.data.suggestions;
              var domainSuggestions = res.data.domainSuggestions;
              var allSuggestions = randomSuggestions.append(domainSuggestions);
              props.setSuggestions(allSuggestions);
            } else if (res.data.domainSuggestionsBool == false) {
              props.setSuggestions(res.data.suggestions);
            }
            if (res.data.predecessor_list) {
              props.setPredecessorList(res.data.predecessor_list);
            }
          } else {
            // console.log("TIME TAKEN", endTimeStamp - props.startTimeStamp);
            const res = await axios.post(
              "http://localhost:5000/api/suggestions/suggestionBySubTopic",
              {
                subtopic: props.subtopic_arr[0],
                question_start_timestamp: props.startTimeStamp,
                question_end_timestamp: props.endTimeStamp,
                question_id: props.data[props.NR - 1]._id
              },
              config
            );
            console.log("RES_DATA", res.data);
            // Update Violation Levels
            var newVLA = props.violationLevelArray;
            newVLA.push(res.data.violation_level);
            props.setVLA(newVLA);

            //Check for past violation levels
            if (res.data.violation_level) {
              if (newVLA.length >= 2) {
                if (
                  newVLA[newVLA.length - 1] >= 2 &&
                  newVLA[newVLA.length - 2] >= 2
                ) {
                  props.setFlukeMsg(true);
                }
              }
            }

            props.setShowMessage(res.data.showBrowseMessage);
            props.setGoBack(res.data.goBack);
            props.setSelectedDomains(res.data.domainSuggestionsBool);
            if (res.data.domainSuggestionsBool) {
              var randomSuggestions = res.data.suggestions;
              var domainSuggestions = res.data.domainSuggestions;
              var allSuggestions = randomSuggestions.append(domainSuggestions);
              props.setSuggestions(allSuggestions);
            } else if (res.data.domainSuggestionsBool == false) {
              props.setSuggestions(res.data.suggestions);
            }
            if (res.data.predecessor_list) {
              props.setPredecessorList(res.data.predecessor_list);
            }
          }
        } catch (error) {
          console.log("ERROR", error);
        }

        props.changeHelp(true);
      }

      //Show Avg Time Message by setting Violation Level Array
      //Make Avg Time API req
      // const config = {
      //   headers: {
      //     Authorization: localStorage.getItem("user_token")
      //   }
      // };
      // if (props.NR >= 2) {
      //   const response = await axios.post(
      //     "http://localhost:5000/api/question/averageAnswerTime",
      //     {
      //       question_response: {
      //         start_time:
      //           props.NR - 2 >= 0
      //             ? props.timestamps[props.NR - 2]["start_time"]
      //             : localStorage.getItem("start_time"),

      //         end_time: props.timestamps[props.NR - 2]["end_time"],
      //         question_id: data[props.NR - 2].question_id
      //       }
      //     },
      //     config
      //   );
      //   console.log("RESPONSE", response.data);
      //   var newVLA = props.violationLevelArray;
      //   newVLA.push(response.violation_level);
      //   props.setVLA(newVLA);

      //   //Check for past violation levels
      //   if (newVLA.length >= 2) {
      //     if (
      //       newVLA[newVLA.length - 1] >= 2 &&
      //       newVLA[newVLA.length - 2] >= 2
      //     ) {
      //       props.setFlukeMsg(true);
      //       props.changeHelp(true);
      //     }
      //   }

      //   //Make Hint Visible
      // }

      setWA([]);
      //Show Next Question Button
      props.showButton();
      setCN(updatedClassNames);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Container>
          <Row>
            <Col>
              <Button
                style={cardStyles}
                onClick={checkAnswer}
                data-id="0"
                outline="true"
                variant="contained"
                color={btn1}
              >
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[0]}</code>
                </pre>
              </Button>
            </Col>
            <Col>
              <Button
                style={cardStyles}
                onClick={checkAnswer}
                data-id="1"
                variant="contained"
                color={btn2}
                className={classNames[1]}
              >
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[1]}</code>
                </pre>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                style={cardStyles}
                onClick={checkAnswer}
                data-id="2"
                variant="contained"
                color={btn3}
                className={classNames[2]}
              >
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[2]}</code>
                </pre>
              </Button>
            </Col>
            <Col>
              <Button
                style={cardStyles}
                onClick={checkAnswer}
                data-id="3"
                variant="contained"
                color={btn4}
                className={classNames[3]}
              >
                <pre style={synStyle}>
                  <code className="language-sql">{props.answers[3]}</code>
                </pre>
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default Options;
