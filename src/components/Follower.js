import { Avatar } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import classes from "./Follower.module.css";
import { useContext, useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { AuthContext } from "../context/auth-context";

const Follower = ({
  id,
  action,
  avatarUrl,
  username,
  acceptDeclineRequest,
}) => {
  const requestUserID = id;
  const { userData } = useContext(AuthContext);
  const navigation = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const renderText = () => {
    if (action === "requests") {
      return (
        <div style={{ display: "flex", gap: 15 }}>
          <CheckIcon
            className={classes.iconStyle}
            sx={{ backgroundColor: "green" }}
            fontSize="large"
            onClick={() =>
              acceptDeclineRequest("accept", userData.id, requestUserID)
            }
          />
          <ClearIcon
            className={classes.iconStyle}
            sx={{ backgroundColor: "red" }}
            fontSize="large"
            onClick={() =>
              acceptDeclineRequest("decline", userData.id, requestUserID)
            }
          />
        </div>
      );
    }

    if (action === "followers") {
      return <span>{isHovered ? "Remove follower!" : "Following you!"}</span>;
    }

    return <span>{isHovered ? "Stop following!" : "Following!"}</span>;
  };

  return (
    <div className={classes.singleFollower}>
      <Avatar
        src={avatarUrl}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          navigation(`/profile/${username}`);
        }}
      />
      <p
        id={id}
        onClick={() => {
          navigation(`/profile/${username}`);
        }}
      >
        {username}
      </p>
      <div
        className={
          action === "requests" ? classes.requestDiv : classes.followerDiv
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderText()}
      </div>
    </div>
  );
};

export default Follower;
