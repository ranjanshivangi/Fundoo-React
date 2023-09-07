import React from "react";
import "./SignUp.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { userSignup } from "../../services/UserService";

const SignUp = () => {
  const navigate = useNavigate();

  const nameRegex = /^[A-Z]{1}[A-Za-z ]{2,}$/;
  const emailRegex =
    /^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

  const [firstNameErr, setFirstNameErr] = React.useState(false);
  const [firstNameHelper, setFirstNameHelper] = React.useState("");

  const [lastNameErr, setLastNameErr] = React.useState(false);
  const [lastNameHelper, setLastNameHelper] = React.useState("");

  const [emailErr, setemailErr] = React.useState(false);
  const [emailHelper, setemailHelper] = React.useState("");

  const [passwordErr, setpasswordErr] = React.useState(false);
  const [passwordHelper, setpasswordHelper] = React.useState("");

  const [signupObj, setSignupObj] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const takeFirstName = (event) => {
        setSignupObj({ ...signupObj, firstName: event.target.value });
  };
  const takeLastName = (event) => {
    setSignupObj({ ...signupObj, lastName: event.target.value });
  };
  const takeEmail = (event) => {
    setSignupObj({ ...signupObj, email: event.target.value });
  };
  const takePassword = (event) => {
    setSignupObj({ ...signupObj, password: event.target.value });
  };

  const firstNameTestRegex = nameRegex.test(signupObj.firstName);
  const lastNameTestRegex = nameRegex.test(signupObj.lastName);
  const emailTestRegex = emailRegex.test(signupObj.email);
  const passwordTestRegex = passwordRegex.test(signupObj.password);

  const handleNext = () => {
    if (firstNameTestRegex === true) {
      setFirstNameErr(false);
      setFirstNameHelper("");
    } else {
      setFirstNameErr(true);
      setFirstNameHelper("Enter correct first name");
    }

    if (lastNameTestRegex === true) {
      setLastNameErr(false);
      setLastNameHelper("");
    } else {
      setLastNameErr(true);
      setLastNameHelper("Enter correct last name");
    }

    if (emailTestRegex === true) {
      setemailErr(false);
      setemailHelper("");
    } else {
      setemailErr(true);
      setemailHelper("Enter correct email");
    }

    if (passwordTestRegex === true) {
      setpasswordErr(false);
      setpasswordHelper("");
    } else {
      setpasswordErr(true);
      setpasswordHelper("Enter correct password");
    }
    if (firstNameTestRegex == true && lastNameTestRegex == true && emailTestRegex == true && passwordTestRegex == true) {
      userSignup(signupObj)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <Box  className="outer-box">
  <Box className="signup-container">
      <Grid container justifyContent={"space-between"} height="100%">
        <Grid
          container
          xs={12}
          sm={12}
          md={7}
          rowGap={3}
          justifyContent={"space-between"}
        >
          <Grid item xs={12}>
            <p className="heading">
              <span style={{ color: "#4285F4" }}>F</span>
              <span style={{ color: "#DB4437" }}>u</span>
              <span style={{ color: "#F4B400" }}>n</span>
              <span style={{ color: "#4285F4" }}>d</span>
              <span style={{ color: "#0F9D58" }}>o</span>
              <span style={{ color: "#DB4437" }}>o</span>
            </p>
            <p className="sub-heading">Create your Fundoo Account</p>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5}>
            <TextField
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              fullWidth
              required
              error={firstNameErr}
              helperText={firstNameHelper}
              onChange={takeFirstName}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5.5}>
            <TextField
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              fullWidth
              required
              error={lastNameErr}
              helperText={lastNameHelper}
              onChange={takeLastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="email"
              variant="outlined"
              type="email"
              fullWidth
              required
              error={emailErr}
              helperText={emailHelper}
              onChange={takeEmail}
            />
            <p>you can use numbers, letters and period</p>
          </Grid>
          <Grid item xs={12} sm={12} md={5.5}>
            <TextField
              id="outlined-password-inpu"
              label="Password"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
              error={passwordErr}
              helperText={passwordHelper}
              onChange={takePassword}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5.5}>
            <TextField
              id="outlined-password-inpu"
              label="Confirm"
              type="password"
              autoComplete="current-password"
              fullWidth
              required
            />
          </Grid>
          <p>
            Use 8 or more characters with a mix of letters, numbers and symbols
          </p>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox />} label=" Show Password" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button variant="text" onClick={handleSignIn}>
              Sign In instead
            </Button>
          </Grid>
          <Grid item xs={4} sm={2} justifyContent={"flex-end"}>
            <Button variant="contained" fullWidth onClick={handleNext}>
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid
          container
          xs={0}
          sm={0}
          md={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box className="grid-two">
            <img
              src="https://ssl.gstatic.com/accounts/signup/glif/account.svg"
              alt=""
              width="200"
              height="200"
            />
            <p className="img-text">
              One account. All of Fundoo working for you.
            </p>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Box>
  
  );
};

export default SignUp;
