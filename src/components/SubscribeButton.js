import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import classes from "./SubscribeButton.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import { useState } from "react";

const SubscribeButton = ({
  isSubscribed = false,
  requestSent,
  handleSubUnSub,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "black",
        color: "white",
        fontSize: "10px",
        boxShadow: "none",
        borderRadius: "20px",
        ":hover": {
          backgroundColor: "red",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleSubUnSub(isSubscribed)}
    >
      {!isHovered && requestSent === 1 ? <span>Request sent! </span> : null}
      {isHovered && requestSent === 1 ? <span>Remove request? </span> : null}
      {isSubscribed && requestSent !== 1 ? (
        <div className={classes.subscribedButtonStyle}>
          {isHovered ? <p>UNSUBSCRIBE?</p> : <p>SUBSCRIBED</p>}
          {isHovered ? (
            <ClearIcon sx={{ height: 14, width: 14 }} />
          ) : (
            <CheckIcon sx={{ height: 14, width: 14, marginLeft: "4px" }} />
          )}
        </div>
      ) : null}
      {!isSubscribed && requestSent !== 1 ? (
        <div className={classes.notSubcribedButtonStyle}>
          <p>SUBSCRIBE</p>
        </div>
      ) : null}
    </Button>
  );
};
export default SubscribeButton;
