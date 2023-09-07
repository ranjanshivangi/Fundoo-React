import React from "react";
import "./Login.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import GoggleLogo from "../../assests/google-logo.png";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../services/UserService";

const Login = () => {
  const navigate = useNavigate();

  const [loginObj, setLoginObj] = React.useState({ email: "", password: "" });

  const emailRegex =
    /^[a-zA-Z]+[a-zA-Z0-9]*[- . + _]?[a-zA-Z0-9]+[@]{1}[a-z0-9]+[.]{1}[a-z]+[.]?[a-z]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&-+=()])([a-zA-Z0-9]*).{8,}$/;

  const [emailErr, setemailErr] = React.useState(false);
  const [emailHelper, setemailHelper] = React.useState("");

  const [passwordErr, setpasswordErr] = React.useState(false);
  const [passwordHelper, setpasswordHelper] = React.useState("");

  const takeEmail = (event) => {
    setLoginObj({ ...loginObj, email: event.target.value });
  };
  const takePassword = (event) => {
    setLoginObj({ ...loginObj, password: event.target.value });
  };

  const emailTestRegex = emailRegex.test(loginObj.email);
  const passwordTestRegex = passwordRegex.test(loginObj.password);

  const handleLogin = () => {
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
    if (emailTestRegex == true && passwordTestRegex == true) {
      userLogin(loginObj)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.data.token);
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSignUp = () => {
    navigate("/");
  };

  return (
    <Box className="outer-box">
      <Box className="login-container">
        <Grid
          container
          rowGap={2}
          height="100%"
          width="100%"
          flexDirection={"column"}
          justifyContent={"flex-start"}
        >
          <Grid item xs={12}>
            <Box className="login-header">
              <div>
                <img
                  src={GoggleLogo}
                  alt="err loaading logo"
                  width="150"
                  height="50"
                />
              </div>
              <div className="login-heading">Login</div>
              <div className="login-sub-heading">Use your Google Account</div>
            </Box>
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
          </Grid>
          <Grid item xs={12}>
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
          <Link underline="hover">Forget Password?</Link>
          <Grid container justifyContent={"space-between"}>
            <Grid item xs={12} sm={12} md={6}>
              <Button variant="text" onClick={handleSignUp}>
                Create Account
              </Button>
            </Grid>
            <Grid item xs={8} sm={8} md={4}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                size="small"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default Login;
