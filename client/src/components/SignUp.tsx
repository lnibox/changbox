import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { signUp } from "./services/user.services";
import CONSTANT from "../constant";
import { Redirect } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignUp = (props: any) => {
  const classes = useStyles();
  const field = {
    value: "",
    inValid: false,
    inValidText: ""
  };

  const [user, setUser] = useState({
    firstName: { ...field },
    lastName: { ...field },
    email: { ...field },
    password: { ...field }
  });

  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  // Similar componentDidUpdate and componentDidMount
  useEffect(() => {}, [user]);

  const validate = function(e, type) {
    let value = e.target.value;
    const setData = value => {
      const obj = { ...field };
      if (0 !== value.length) {
        obj.value = value;
        if (CONSTANT.SIGNUP.EMAIL !== type) {
          if (20 < value.length) {
            // Length > 20
            obj.inValid = true;
            obj.inValidText = CONSTANT.SIGNUP.INVALIDMAXIMUMLENGTH;
          } else if (CONSTANT.SIGNUP.PASSWORD !== type) {
            let arrValue = [...value];
            for (let i = arrValue.length - 1; i >= 0; i--) {
              if (!isNaN(parseInt(arrValue[i]))) {
                // Contain number
                obj.inValid = true;
                obj.inValidText = CONSTANT.SIGNUP.INVALIDNUMBERVALUE;
                break;
              }
              if ([...CONSTANT.SPECIAL_CHAR].includes(arrValue[i])) {
                // Contain special character
                obj.inValid = true;
                obj.inValidText = CONSTANT.SIGNUP.INVALIDSPECIALCHAR;
                break;
              }
            }
          }
        }
      } else {
        // Length == 0
        obj.inValid = true;
        obj.inValidText = CONSTANT.SIGNUP.INVALIDEMPTYTEXT;
      }
      return obj;
    };
    switch (type) {
      case CONSTANT.SIGNUP.FIRSTNAME:
        user.firstName = setData(value);
        break;
      case CONSTANT.SIGNUP.LASTNAME:
        user.lastName = setData(value);
        break;
      case CONSTANT.SIGNUP.EMAIL:
        user.email = setData(value);
        break;
      case CONSTANT.SIGNUP.PASSWORD:
        user.password = setData(value);
        break;
      default:
    }
    setUser(user);
    props.onChange(type, value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    let data: object = {
      firstName: user.firstName.value,
      lastName: user.lastName.value,
      email: user.email.value,
      password: user.password.value
    };
    try {
      await signUp(data).then(response => {
        setRedirect(true);
      });
    } catch (error) {
      const response = error.response.data.error;
      if (409 === response.statusCode) {
        user.email.inValid = true;
        user.email.inValidText = response.message;
      } else if (422 === response.statusCode) {
        if ("invalid email" === response.message) {
          user.email.inValid = true;
          user.email.inValidText = response.message;
        } else {
          user.password.inValid = true;
          user.password.inValidText = response.message;
        }
      }
      setUser({ ...user });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => validate(e, CONSTANT.SIGNUP.FIRSTNAME)}
                error={user.firstName.inValid}
                helperText={user.firstName.inValidText}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => validate(e, CONSTANT.SIGNUP.LASTNAME)}
                error={user.lastName.inValid}
                helperText={user.lastName.inValidText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => validate(e, CONSTANT.SIGNUP.EMAIL)}
                error={user.email.inValid}
                helperText={user.email.inValidText}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={e => validate(e, CONSTANT.SIGNUP.PASSWORD)}
                error={user.password.inValid}
                helperText={user.password.inValidText}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      {renderRedirect()}
    </Container>
  );
};

const inputChanged = (type: any, valueChanged: any) => {
  return {
    type: type,
    valueChanged
  };
};

const mapStateToProp = (state: any) => {
  return { state: state };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onChange: (type: any, valueChange: any) => {
      dispatch(inputChanged(type, valueChange));
    }
  };
};

export default connect(mapStateToProp, mapDispatchToProps)(SignUp);
