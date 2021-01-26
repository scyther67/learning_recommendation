import React from "react";
import Typography from "@material-ui/core/Typography";
import KnowledgeMap from "../images/knowledge_map.jpg";
import { Container, Row, Col, Button, func } from "shards-react";

const outerBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  height: "100vh",
  flexDirection: "column"
};

const innerBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",

  borderRadius: "5px"
};

function TestEndView() {
  return (
    <div style={outerBoxStyle}>
      <div className="container" style={innerBoxStyle}>
        <Typography variant="h5">
          {"Congratulations!! You've Successfully Completed The Test"}
        </Typography>
        <br />
        <br />
        <br />
        <img
          style={{
            width: "40vw",
            objectFit: "cover",
            borderRadius: "5px",
            border: "2px solid black"
          }}
          src={KnowledgeMap}
        ></img>
        <br />
        <br />
        <br />
        <Typography variant="h6">
          {
            "By completing our series of tests, you've completed learning all subtopics as per the SQL Knowledge Map above."
          }
        </Typography>
      </div>
    </div>
  );
}

export default TestEndView;
