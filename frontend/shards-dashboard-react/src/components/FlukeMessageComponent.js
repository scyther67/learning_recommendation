import React from "react";
import Typography from "@material-ui/core/Typography";

function FlukeMessageComponent(props) {
  if (props.showFlukeMessage) {
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
  } else if (props.showSlowMessage) {
    return (
      <div>
        <Typography>
          {
            "Ohh! It seems as of you've been spending a lot of time on questions."
          }
        </Typography>
        <br />
        <Typography>
          {
            "We suggest you to pace up a bit when answering while still maintaining a high level of accuracy."
          }
        </Typography>
      </div>
    );
  }
}

export default FlukeMessageComponent;
