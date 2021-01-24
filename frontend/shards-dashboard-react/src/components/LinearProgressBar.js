import React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 30,
    borderRadius: 3
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#1a90ff"
  }
}))(LinearProgress);

export default function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" style={{ color: "white" }}>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
