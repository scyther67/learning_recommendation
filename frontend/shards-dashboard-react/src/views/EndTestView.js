import React from "react";
import Typography from "@material-ui/core/Typography";

const outer_box_css = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
};

const content_box = {
  width: "60vw",
  height: "70vh",
  background: "#2b2b2b",
  border: "2px solid black",
  borderRadius: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
};

const EndTestView = () => {
  return (
    <div style={outer_box_css}>
      <div style={content_box}>
        <Typography variant={"h2"} style={{ color: "white" }}>
          Thank You For Taking The Test
        </Typography>
        <br />
        <br />
        <br />
        <Typography variant={"h6"} style={{ color: "white" }}>
          A hearty congratulations from us. You have successfully completed
          learning all the subtopics.
        </Typography>
        <br />
        <Typography variant={"h6"} style={{ color: "white" }}>
          To improve our system, we would like to know your opinion of our
          system. Please help us out by filling this form.
        </Typography>
      </div>
    </div>
  );
};

export default EndTestView;
