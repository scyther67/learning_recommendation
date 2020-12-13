import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";

const RecommendationContent = props => {
  return (
    <React.Fragment>
      {props.showMessage ? (
        <Typography>
          {
            "Stuck at this question ? We suggest you to browse to learn some exciting concepts that will help you to answer this question."
          }
        </Typography>
      ) : (
        <React.Fragment>
          <Typography>
            We have curated a list of web resources that you might want to read
            before attempting the next question.
          </Typography>

          <hr></hr>
          <ul>
            <li>
              <a target="_blank" href={props.weblist[0]}>
                {props.weblist[0]}
              </a>
            </li>
            <li>
              <a target="_blank" href={props.weblist[1]}>
                {props.weblist[1]}
              </a>
            </li>
            <li>
              <a target="_blank" href={props.weblist[2]}>
                {props.weblist[2]}
              </a>
            </li>
          </ul>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default RecommendationContent;
