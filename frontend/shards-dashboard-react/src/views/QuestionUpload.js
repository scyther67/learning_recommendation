import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Row, Col } from "shards-react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    },
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

const formstyle = {
  width: "80vw",
  height: "60vh",
  marginTop: "5vh",
  marginLeft: "2vw"
};

const rowstyle = {
  display: "flex",
  flexDirection: "row",
  width: "70vw",
  marginBottom: "4vh"
};

const options = [
  {
    value: 0,
    label: "Option 1"
  },
  {
    value: 1,
    label: "Option 2"
  },
  {
    value: 2,
    label: "Option 3"
  },
  {
    value: 3,
    label: "Option 4"
  }
];

function QuestionUpload() {
  const classes = useStyles();
  const [option, setOption] = React.useState("EUR");

  const handleChange = event => {
    setOption(event.target.value);
  };
  return (
    <div style={formstyle}>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        style={{ height: "100%" }}
      >
        <Container>
          <Row>
            <Col sm={{ size: 10, order: 2, offset: 1 }}>
              <div className="row-1" style={rowstyle}>
                <TextField
                  id="standard-textarea"
                  label="Description"
                  variant="filled"
                  multiline
                  style={{ width: "70vw", margin: "1vh" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, order: 1, offset: 1 }}>
              <div className="row-2" style={rowstyle}>
                <TextField
                  id="standard-textarea"
                  label="Option 1"
                  placeholder="Placeholder"
                  variant="filled"
                  multiline
                  style={{ width: "30vw", margin: "1vh" }}
                />

                <TextField
                  id="standard-textarea"
                  label="Option 2"
                  placeholder="Placeholder"
                  variant="filled"
                  multiline
                  style={{ width: "30vw", margin: "1vh" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, order: 1, offset: 1 }}>
              <div className="row-3" style={rowstyle}>
                <TextField
                  id="standard-textarea"
                  label="Option 3"
                  placeholder="Placeholder"
                  variant="filled"
                  multiline
                  style={{ width: "30vw", margin: "1vh" }}
                />

                <TextField
                  id="standard-textarea"
                  label="Option 4"
                  placeholder="Placeholder"
                  variant="filled"
                  multiline
                  style={{ width: "30vw", margin: "1vh" }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, order: 1, offset: 1 }}>
              <div className="row-3" style={rowstyle}>
                <TextField
                  id="standard-select-currency"
                  select
                  value={option}
                  variant="filled"
                  onChange={handleChange}
                  helperText="Please select the correct option"
                  style={{ width: "30vw", margin: "1vh" }}
                >
                  {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="standard-select-currency"
                  select
                  value={option}
                  variant="filled"
                  onChange={handleChange}
                  helperText="Please select the subtopic"
                  style={{ width: "30vw", margin: "1vh" }}
                >
                  {options.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Col>
          </Row>

          <Row>
            <Col sm={{ size: 10, order: 1, offset: 1 }}>
              <div className="row-3" style={rowstyle}>
                <TextField name="Upload File" type="file" />
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 10, order: 1, offset: 1 }}>
              <div className="row-3" style={rowstyle}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "30vw", margin: "1vh", height: "50px" }}
                >
                  Add Question
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
}

export default QuestionUpload;
