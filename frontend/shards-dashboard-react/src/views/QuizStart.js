import React, { useEffect } from "react";
import { Container, Row, Col } from "shards-react";
import { Button } from "shards-react";
import { NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink, useHistory } from "react-router-dom";

const buttonStyles = {
  fontSize: "20px",
  marginTop: "4vh",
  borderRadius: "10px",
  padding: "15px 25px"
};

const cardStyles = {
  background: "white",
  borderRadius: "15px",
  width: "100%",
  minHeight: "70vh",
  marginTop: "8vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
};

const QuizStart = props => {
  let history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("user_token")) {
      history.push("/sign-in");
    }
  }, []);
  const onClickTest = () => {
    // console.log("Test Started ", Date.now());

    localStorage.setItem("start_time", Date.now());
  };

  return (
    <Container fluid>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <div style={cardStyles}>
            <Row
              noGutters
              className="page-header py-4"
              style={{ height: "10vh" }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <h1>Test Instructions</h1>
              </Col>
            </Row>
            <Row>
              <Col
                style={{
                  textAlign: "justify",
                  marginLeft: "2vw",
                  marginRight: "2vw",
                  fontSize: "16px",
                  maxHeight: "55vh",
                  overflow: "scroll"
                }}
              >
                <ol>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "For NEW Users: After a user has created his/her account, he/she is required to download our browser extension from {LINK TO EXTENSION}. After downloading the extension, the user needs to Login to the extension using the same username and password as set during the account creation in the testing platform. Please note that a user is COMPULSORILY required to be logged in to the browser extension before beginning his/her test. Only when a user does so will his/her data collection process commence. Failure to do so will result in data loss and disqualification of the candidate"
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "For EXISTING Users: In case a user has already created an account and wishes to revisit the platform, he needs to login to the testing platform AS WELL AS the browser extension in order for the data collection process to commence. Failure to do so will result in data loss and disqualification of the candidate."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "Once a user has completed the login/signup process, they are free to begin the test. Please note that if a user wishes to revise any SQL concept before the commencement of his/her test, they can do so after completing the Login process. However, it would be advisable to begin the test with the existing knowledge of SQL a candidate possesses."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "At any time before or during the test, a user is free to switch tabs to browse the internet in search of resources to clear their concepts. In fact, to aid the purpose of this research study, this behaviour is highly encouraged. However, a user is advised to not spend too much time browsing the internet in search for answers and only search a few resources before attempting a response. "
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "If any user is found accessing restricted online content, he/she will immediately be disqualified from this study."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "The test will consist of a total of 10 questions. Irrespective of the correctness of a candidate's response, the questions will keep moving forward. Only when a user answers a question on one subtopic correctly will he/she be able to move to the next one."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "The average time estimated to complete the test is 30 minutes."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "Please make sure that the test is given in an undisturbed environment so that it can be completed in one go."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "At no time does a candidate need to feel conscious and aware of being a part of this study and must answer questions and browse on the internet as candidly as possible. "
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "It is okay for a candidate to take breaks during the test and use the internet to access social media or other entertainment sites."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "Under no circumstance is a candidate supposed to approach another candidate to ask for answers or even seek professional help from their faculty or professionals during (or ever after) their test. The test is supposed to be completed by an individual’s own efforts and any act of cheating will result in corruption of data and immediate disqualification of a candidate."
                    }
                  </li>
                  <li style={{ marginBottom: "10px" }}>
                    {
                      "Once the test is complete, the user is supposed to log out of the testing platform AND the browser extension without fail. Failure to do so will result in the candidates data being logged even after his test is completed."
                    }
                  </li>
                </ol>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={{ offset: 5 }}>
          <NavLink tag={RouteNavLink} to={"/start-test"}>
            <Button id="start-btn" onClick={onClickTest} style={buttonStyles}>
              Begin The Test
            </Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizStart;
