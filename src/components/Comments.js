import classes from "./Comments.module.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { getCommentsData, likeComment } from "../backend/helpers";
import { useNavigate } from "react-router-dom";

const Comments = ({ comment, setCommentsData, videoID }) => {
  const { userData } = useContext(AuthContext);
  const navigation = useNavigate();

  const navigateToProfile = () => {
    if (userData.username === comment.username) {
      navigation(`/profile`);
    } else {
      navigation(`/profile/${comment.username}`);
    }
  };

  const handleLikeDislike = (status) => {
    const identifier = comment.liked_comment;
    const likeDisLikeComment = async (identifier, status, commentID, myID) => {
      const data = await likeComment(identifier, status, commentID, myID);
    };
    likeDisLikeComment(identifier, status, comment.id_comment, userData.id);

    const refreshComments = async (videoID, myID) => {
      const comments = await getCommentsData(videoID, myID);
      setCommentsData(comments);
    };

    refreshComments(videoID, userData.id);
  };

  return (
    <div className={classes.singleComment}>
      <div className={classes.divAvatar}>
        <Avatar
          src={comment.profile_pic}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => navigateToProfile()}
        />
      </div>
      <div className={classes.divUserComment}>
        <div className={classes.usernameDate}>
          <span
            className={classes.textUsername}
            onClick={() => navigateToProfile()}
          >
            @{comment.username}
          </span>
          <span className={classes.textDate}>{comment.time}</span>
          {comment.MyComment === 1 ? (
            <PersonIcon sx={{ height: "20px", width: "20px" }} />
          ) : null}
        </div>

        <span className={classes.textForComment}>{comment.comment}</span>
        <span className={classes.textIcons}>
          <span>
            {comment.comment_likes <= 0 ? null : comment.comment_likes}
          </span>
          <ThumbUpIcon
            sx={{
              color: comment.liked_comment === true ? "green" : "black",
              "&:hover": {
                cursor: "pointer",
                color: "green",
              },
            }}
            onClick={() => handleLikeDislike("liked")}
          />
          <ThumbDownAltIcon
            sx={{
              color: comment.liked_comment === false ? "red" : "black",
              "&:hover": {
                cursor: "pointer",
                color: "red",
              },
            }}
            onClick={() => handleLikeDislike("disliked")}
          />
        </span>
      </div>
    </div>
  );
};

export default Comments;
