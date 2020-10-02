import React from "react";
import { Container, Row, Col } from "shards-react";
import { Button } from "shards-react";
import { NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";

const buttonStyles = {
  fontSize: "20px",
  marginTop: "5vh",
  borderRadius: "10px",
  padding: "15px 25px"
};

const cardStyles = {
  background: "white",
  borderRadius: "15px",
  width: "100%",
  minHeight: "60vh",
  marginTop: "8vh",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
};

const QuizStart = () => {
  const onClickTest = () => {
    // console.log("Test Started ", Date.now());
    localStorage.setItem("start_time", Date.now());
  };

  return (
    <Container>
      <Row>
        <Col sm={{ size: 10, order: 2, offset: 1 }}>
          <div style={cardStyles}>
            <Row
              noGutters
              className="page-header py-4"
              style={{ height: "60vh" }}
            >
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <h1>Let's Take an SQL Quiz</h1>
              </Col>
            </Row>
            {/* <Row>
              <Col
                style={{
                  textAlign: "justify",
                  marginLeft: "2vw",
                  marginRight: "2vw",
                  fontSize: "16px"
                }}
              >
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Sed ut perspiciatis unde omnis iste
                  natus error sit voluptatem accusantium doloremque laudantium,
                  totam rem aperiam, eaque ipsa quae ab illo inventore veritatis
                  et quasi architecto beatae vitae dicta sunt explicabo. Nemo
                  enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                  aut fugit, sed quia consequuntur magni dolores eos qui ratione
                  voluptatem sequi nesciunt. Neque porro quisquam est, qui
                  dolorem ipsum quia dolor sit amet, consectetur, adipisci
                  velit, sed quia non numquam eius modi tempora incidunt ut
                  labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad
                  minima veniam, quis nostrum exercitationem ullam corporis
                  suscipit laboriosam, nisi ut aliquid ex ea commodi
                  consequatur? Quis autem vel eum iure reprehenderit qui in ea
                  voluptate velit esse quam nihil molestiae consequatur, vel
                  illum qui dolorem eum fugiat quo voluptas nulla pariatur
                </p>
              </Col>
            </Row> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={{ offset: 5 }}>
          <NavLink tag={RouteNavLink} to={"/start-test"}>
            <Button onClick={onClickTest} style={buttonStyles}>
              Take a Test
            </Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
};

export default QuizStart;
