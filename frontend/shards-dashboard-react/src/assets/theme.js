import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    primary: {
      main: "#81c784"
    },
    error: {
      main: "#e57373"
    },
    success: {
      main: "#81c784"
    },
    secondary: {
      main: "#e57373"
    },
    default: {
      main: "#2196f3"
    }
  }
});
