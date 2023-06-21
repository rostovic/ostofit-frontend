import { TextField } from "@mui/material";
import classes from "./CreateAccount.module.css";
import { useEffect, useRef, useState } from "react";
import {
  checkIfUsernameIsNotTaken,
  createNewAccount,
} from "../backend/helpers";
import PopUpWindow from "./PopUpWindow";
import { checkPwd, checkUsernameValid } from "../backend/functions";

const CreateAccount = () => {
  const [checkUsername, setCheckUsername] = useState("");
  const [usernameValidInfo, setUsernameValidInfo] = useState(false);
  const [fieldsEmpty, setFieldsEmpty] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);
  const [errorMessagePassword, setErrorMessagePassword] = useState(null);
  const [errorMessageUsername, setErrorMessageUsername] = useState(null);

  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");

  const resetErrors = () => {
    setErrorMessagePassword(null);
    setFieldsEmpty(null);
    setErrorMessageUsername(null);
  };

  const createAccount = async () => {
    setIsSaving(true);
    if (
      firstNameRef.current.value === "" ||
      lastNameRef.current.value === "" ||
      usernameRef.current.value === "" ||
      passwordRef.current.value === ""
    ) {
      setFieldsEmpty(true);
      setIsSaving(false);
      return;
    }

    const validUsername = checkUsernameValid(usernameRef.current.value);

    if (validUsername !== "valid") {
      setErrorMessageUsername(validUsername);
      setIsSaving(false);
      return;
    }

    const checkPassword = checkPwd(passwordRef.current.value);

    if (checkPassword !== "valid") {
      setErrorMessagePassword(checkPassword);
      setIsSaving(false);
      return;
    }
    const response = await createNewAccount(
      firstNameRef.current.value,
      lastNameRef.current.value,
      usernameRef.current.value,
      passwordRef.current.value
    );

    if (response === "success") {
      setTimeout(() => {
        setIsSaving(false);
        setAccountCreated(true);
      }, 1000);
    } else {
      setIsSaving(false);
      return "error";
    }
  };

  useEffect(() => {
    if (checkUsername === "") {
      setUsernameValidInfo("");
      return;
    }

    const checkTimeout = setTimeout(() => {
      const checkIfValid = async (username) => {
        const response = await checkIfUsernameIsNotTaken(username);
        if (response === "success") {
          setUsernameValidInfo("Username is available!");
        } else {
          setUsernameValidInfo("Username is taken!");
        }
      };
      checkIfValid(checkUsername);
    }, 500);
    return () => clearTimeout(checkTimeout);
  }, [checkUsername]);

  return (
    <div className={classes.mainDiv}>
      {accountCreated ? <PopUpWindow /> : null}
      <div className={classes.navigation}></div>
      <div className={classes.contentDiv}>
        <div className={classes.signUpDiv}>
          <div className={classes.inputsDiv}>
            <span className={classes.textCreate}>Create a new account!</span>
            <TextField
              required
              label="First Name"
              type="text"
              name="first_name"
              inputRef={firstNameRef}
              onFocus={resetErrors}
            />
            <TextField
              required
              label="Last Name"
              type="text"
              name="last_name"
              inputRef={lastNameRef}
              onFocus={resetErrors}
            />
            <TextField
              required
              label="Username"
              onChange={(e) => setCheckUsername(e.target.value)}
              helperText={usernameValidInfo === "" ? "" : usernameValidInfo}
              FormHelperTextProps={{
                style: {
                  color:
                    usernameValidInfo === "Username is taken!"
                      ? "red"
                      : "green",
                },
              }}
              inputRef={usernameRef}
              onFocus={resetErrors}
            />
            {
              <span
                className={classes.errorMessageUsername}
                style={{
                  marginBottom: errorMessageUsername === null ? 0 : "12px",
                }}
              >
                {errorMessageUsername}
              </span>
            }
            <TextField
              required
              label="Password"
              type="password"
              inputRef={passwordRef}
              onFocus={resetErrors}
            />
            {fieldsEmpty === true ? (
              <span style={{ color: "red" }}>Please fill out every field!</span>
            ) : null}
            {
              <span className={classes.errorMessage}>
                {errorMessagePassword}
              </span>
            }
            <button
              className={classes.buttonCreate}
              style={{
                cursor:
                  usernameValidInfo === "Username is taken!" ||
                  usernameValidInfo === "" ||
                  isSaving
                    ? "not-allowed"
                    : "pointer",
              }}
              disabled={
                usernameValidInfo === "Username is taken!" ||
                usernameValidInfo === "" ||
                isSaving
                  ? true
                  : false
              }
              onClick={createAccount}
            >
              {isSaving ? (
                <div className={classes.loaderSpinnerWrapper}>
                  <div className={classes.loaderSpinner}></div>
                </div>
              ) : (
                "Create account!"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
