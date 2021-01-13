import React from "react";
import Typography from "@material-ui/core/Typography";

function FlukeMessageComponent(props) {
  return (
    <div>
      <Typography>
        {"Wow! That's a long streak of answers in a quick span of time."}
      </Typography>
      <br />
      <Typography>
        {
          "But being a bit realistic, we think that you might've fluked some of those answers. We request you to take some time while answering."
        }
      </Typography>
    </div>
  );
}

export default FlukeMessageComponent;
