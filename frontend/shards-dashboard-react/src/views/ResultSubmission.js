import React, { useState } from "react";
import QuestionLoader from "../components/QuestionLoader";

const ResultSubmission = () => {
  return (
    <div
      style={{
        border: "2px solid red",
        // marginTop: "auto",
        // display: "flex",
        width: "100%",
        position: "absolute",
        bottom: "0px",
        height: "100%",
        top: "10vh",
        height: "100%"
      }}
    >
      <QuestionLoader />
    </div>
  );
};

export default ResultSubmission;
