import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink as RouteNavLink, useHistory } from "react-router-dom";
import { NavItem, NavLink } from "shards-react";
import axios from "axios";
import axiosConfig from "../config/axiosConfig";
import coding from "../images/coding.png";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${coding})`,
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
  }
}));

export default function SignInSide() {
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (localStorage.getItem("user_token")) {
      history.push("/quiz");
    }
  });

  const onChangeEmail = e => {
    setEmail(e.target.value);
  };

  const onClickSubmit = async () => {
    const form = {
      password: pass,
      email: email
    };
    const formData = new FormData();
    formData.append("email", email);
    // formData.append("name", name);
    formData.append("password", pass);

    try {
      const res = await axiosConfig.post("/api/auth/login", form);
      if (res.data.message) {
        setError(true);
        setHelperText("Incorrect Credentials");
      } else {
        if (res.data.token) {
          const user = {
            token: res.data.token
          };
          // console.log("Here", res.data.name);
          localStorage.setItem("user_token", user.token);
          localStorage.setItem("user_name", res.data.name);

          if (res.data.code == 200) {
            setError(false);
            setHelperText("");
            setTimeout(() => {
              history.push("/quiz");
            }, 1000);
          }
        } else {
          // console.log("Error");
          setError(true);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const onChangePass = e => {
    setPass(e.target.value);
  };

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
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onChangeEmail}
              error={error}
              helperText={helperText}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChangePass}
              error={error}
            />

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onClickSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NavLink tag={RouteNavLink} to={"/sign-up"}>
                  {/* <Link href="#" variant="body2"> */}
                  {"Don't have an account? Sign Up"}
                  {/* </Link> */}
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
