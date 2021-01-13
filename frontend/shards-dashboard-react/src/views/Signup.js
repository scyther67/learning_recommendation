import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import axios from "axios";
import learning from "../images/learning.png";
import { FormControl } from "@material-ui/core";
import PdfViewer from "../components/PdfViewer";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${learning})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  formControl: {
    minWidth: 150,
    marginTop: "15px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SignInSide(props) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [SQL, setSQL] = useState(3);
  const [field, setField] = useState("");
  const [year, setYear] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passError, setPassError] = useState(false);
  const [passHelperText, setPassHelperText] = useState("");
  const [nameError, setNameError] = useState(false);
  const [nameHelperText, setNameHelperText] = useState("");
  const [ageError, setAgeError] = useState(false);
  const [ageHelperText, setAgeHelperText] = useState("");
  const [checked, setChecked] = useState(false);
  const [agreeHelperText, setAgreeHelperText] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeSQL = e => {
    setSQL(e.target.value);
  };

  const onChangeAge = e => {
    setAge(e.target.value);
  };

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onChangeName = e => {
    setName(e.target.value);
  };

  const onChangeField = e => {
    setField(e.target.value);
  };

  const onChangeYear = e => {
    setYear(e.target.value);
  };

  const onChangePass = e => {
    setPass(e.target.value);
  };

  const onChangeCheck = e => {
    setChecked(e.target.checked);
  };

  function valuetext(value) {
    return value;
  }

  const onClickSubmit = async () => {
    if (checked) {
      const form = {
        name: name,
        password: pass,
        email: email,
        age: age,
        field_of_study: field,
        recent_education: year,
        proficiency: SQL
      };
      const formData = new FormData();
      formData.append("email", email);
      formData.append("name", name);
      formData.append("password", pass);
      formData.append("age", age);
      formData.append("proficiency", SQL);
      formData.append("field_of_study", field);
      formData.append("recent_education", year);

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/register",
          form
        );

        if (res.data.token) {
          const user = {
            token: res.data.token,
            username: name
          };
          localStorage.setItem("user_token", user.token);
          localStorage.setItem("user_name", user.username);
          setTimeout(() => {
            history.push("/quiz");
          }, 2000);
        } else if (res.data.errors) {
          console.log(res.data);
          for (let index = 0; index < res.data.errors.length; index++) {
            if (res.data.errors[index].param == "email") {
              setEmailError(true);
              setEmailHelperText(res.data.errors[index].msg);
            }
            if (res.data.errors[index].param == "password") {
              setPassError(true);
              setPassHelperText(res.data.errors[index].msg);
            }
            if (res.data.errors[index].param == "age") {
              setAgeError(true);
              setAgeHelperText(res.data.errors[index].msg);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setAgreeHelperText("Please Click on I Agree");
    }
  };

  const classes = useStyles();

  useEffect(() => {
    console.log("On this page");
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              style={{ fontSize: "8px" }}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Name"
              name="email"
              error={nameError}
              helperText={nameHelperText}
              // autoComplete="email"
              autoFocus
              onChange={onChangeName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              error={emailError}
              helperText={emailHelperText}
              autoComplete="email"
              autoFocus
              onChange={onChangeEmail}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              error={passError}
              helperText={passHelperText}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePass}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
              error={ageError}
              helperText={ageHelperText}
              // autoComplete="email"
              autoFocus
              onChange={onChangeAge}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="field"
              label="Field"
              name="field"
              // autoComplete="email"
              autoFocus
              onChange={onChangeField}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                Year of Study
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={year}
                onChange={onChangeYear}
                label="Year of Study"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"High School"}>High School</MenuItem>
                <MenuItem value={"Undergraduate"}>Undergraduate</MenuItem>
                <MenuItem value={"Post Graduate"}>Post Graduate</MenuItem>
                <MenuItem value={"Doctorate"}>Doctorate</MenuItem>
              </Select>
            </FormControl>
            <Typography
              style={{ marginTop: "15px" }}
              id="discrete-slider-small-steps"
              gutterBottom
            >
              Proficiency in SQL
            </Typography>
            <Slider
              style={{ width: "30vw" }}
              defaultValue={3}
              getAriaValueText={valuetext}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks={[
                {
                  value: 0,
                  label: "0*"
                },
                {
                  value: 1,
                  label: "1*"
                },
                {
                  value: 2,
                  label: "2*"
                },
                {
                  value: 3,
                  label: "3*"
                },
                {
                  value: 4,
                  label: "4*"
                },
                {
                  value: 5,
                  label: "5*"
                }
              ]}
              min={0}
              max={5}
              valueLabelDisplay="auto"
              onChange={onChangeSQL}
              name="SQL"
            />
            <a
              style={{
                cursor: "pointer",
                display: "block",
                // border: "2px solid black",
                marginTop: "10px",
                textDecoration: "underline"
              }}
              onClick={handleClickOpen}
            >
              <b>View Consent Form</b>
            </a>

            <FormControlLabel
              control={
                <Checkbox
                  name="checked"
                  checked={checked}
                  onChange={onChangeCheck}
                />
              }
              label="I have read the Consent Form and agree to paticipate in the study"
            />
            <FormHelperText style={{ color: "red" }}>
              {agreeHelperText}
            </FormHelperText>
            <Dialog
              maxWidth={"md"}
              fullWidth={true}
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                style={{
                  textAlign: "center"
                }}
              >
                {"Consent Form "}
              </DialogTitle>
              <DialogContent>
                <PdfViewer />
              </DialogContent>
            </Dialog>

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickSubmit}
            >
              Register
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
