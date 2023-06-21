import { useEffect, useState } from "react";
import classes from "./PopUpWindow.module.css";
import { useNavigate } from "react-router-dom";

const PopUpWindow = () => {
  const [seconds, setSeconds] = useState(3);
  const navigation = useNavigate();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (seconds === 0) {
      setRedirect(true);
    }
    seconds > 0 && setTimeout(() => setSeconds(seconds - 1), 1000);
  }, [seconds]);

  setTimeout(() => navigation("/login"), 4000);

  return (
    <div className={classes.popUpWindow}>
      <div className={classes.popUpDiv}>
        <div className={classes.divMessage}>
          {redirect ? (
            <div className={classes.loaderSpinnerWrapper}>
              <div className={classes.loaderSpinner}></div>
            </div>
          ) : (
            <>
              <span className={classes.messageTitle}>
                You have successfully created an account!
              </span>

              <span className={classes.message}>
                You are be directed to the login screen in {seconds} seconds...
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopUpWindow;
