import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";

const RecommendationContent = props => {
  return (
    <React.Fragment>
      <Typography>
        We have curated a list of web resources that you might want to read
        before attempting this question again.
      </Typography>
      {/* <h3>{props.updateContent}</h3> */}
      <hr></hr>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://www.studytonight.com/dbms/select-query.php"
          >
            https://www.studytonight.com/dbms/select-query.php
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.tutorialspoint.com/sql/sql-select-query.htm"
          >
            https://www.tutorialspoint.com/sql/sql-select-query.htm
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.geeksforgeeks.org/sql-select-query/"
          >
            https://www.geeksforgeeks.org/sql-select-query/
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://www.w3schools.com/sql/sql_select.asp"
          >
            https://www.w3schools.com/sql/sql_select.asp
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default RecommendationContent;
