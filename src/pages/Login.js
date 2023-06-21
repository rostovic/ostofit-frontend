import { Form, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { loginUser } from "../backend/helpers";
import profile from "../images/profile.jpg";
import explore from "../images/explore.jpg";

const ERRORS = {
  USERNAME: {
    BLANK: "Empty username!",
  },
  PASSWORD: {
    BLANK: "Empty password!",
  },
  USER: {
    BLANK: "Invalid credentials!",
  },
};

const Login = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorUsername, setErrorUsername] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorUser, setErrorUser] = useState(null);
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");

  const resetErrors = () => {
    setErrorUsername(null);
    setErrorPassword(null);
    setErrorUser(null);
  };

  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    const username = usernameInputRef.current.value;
    const password = passwordInputRef.current.value;

    if (username.length === 0) {
      setErrorUsername(ERRORS.USERNAME.BLANK);
    }

    if (password.length === 0) {
      setErrorPassword(ERRORS.PASSWORD.BLANK);
    }

    if (!username || !password) {
      return;
    }

    const userData = await loginUser(username, password);

    if (userData === "Invalid credentials!") {
      setErrorUser(ERRORS.USER.BLANK);
      return;
    }

    ctx.login(userData);
    navigate("/home");

    return;
  };

  const renderError = (errorType) => {
    if (errorType === "username") {
      if (!errorUsername) {
        return;
      }

      return (
        <div>
          <span>{errorUsername}</span>
        </div>
      );
    }

    if (errorType === "password") {
      if (!errorPassword) {
        return;
      }

      return (
        <div>
          <span>{errorPassword}</span>
        </div>
      );
    }

    if (errorType === "Invalid credentials!")
      if (!errorUser) {
        return;
      }

    return (
      <div>
        <span>{errorUser}</span>
      </div>
    );
  };

  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: " flex", width: "100%" }}>
        <div className={classes.divText}>
          <span className={classes.textStyle}>Explore community</span>
        </div>

        <div className={classes.divText}>
          <span className={classes.textStyle}>Create content</span>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.imageDiv}>
          <img src={explore} alt="test" className={classes.imgStyle} />
        </div>
        <div className={classes.loginContainer}>
          <Form onSubmit={formSubmissionHandler}>
            <input
              className={classes.input}
              ref={usernameInputRef}
              id="email"
              type="text"
              name="email"
              placeholder="Username"
              onFocus={resetErrors}
            ></input>
            {renderError("username")}
            <input
              className={classes.input}
              ref={passwordInputRef}
              id="password"
              type="password"
              name="password"
              placeholder="Password..."
              onFocus={resetErrors}
            ></input>
            {renderError("password")}
            {renderError("User does not exist!")}
            <button className={classes.buttonLogIn} type="submit">
              Log In
            </button>
            <button
              className={classes.createAccountButton}
              type="button"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Create account!
            </button>
          </Form>
        </div>
        <div className={classes.imageDiv}>
          <img src={profile} alt="test" className={classes.imgStyle} />
        </div>
      </div>
    </main>
  );
};

export default Login;
