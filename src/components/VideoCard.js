import { Avatar } from "@mui/material";
import classes from "./VideoCard.module.css";
import SubscribeButton from "./SubscribeButton";
import { useState, useEffect, useRef, useContext } from "react";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CommentIcon from "@mui/icons-material/Comment";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import {
  deleteVideo,
  refreshUserData,
  subUnSubToUser,
} from "../backend/helpers";
import { AuthContext } from "../context/auth-context";
import Forward5Icon from "@mui/icons-material/Forward5";
import Replay5Icon from "@mui/icons-material/Replay5";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteVideoWindow from "./DeleteVideoWindow";
import { BACKEND_URL } from "../backend/helpers";

const VideoCard = ({
  videoDetails,
  observerRef,
  avatarUrl,
  username,
  isVerified,
  isCompact = false,
  isSubscribed = false,
  handleLikeDisLikeVideo,
  myVideo = false,
  getData,
  playNow = true,
  currentTime = 0,
  modal = false,
}) => {
  const authContext = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const navigation = useNavigate();
  const videoRef = useRef();
  const [playVideo, setPlayVideo] = useState(false);
  const [muted, setMuted] = useState(true);
  const [isSubmittingData, setIsSubmittingData] = useState(false);
  const [windowRemove, setWindowRemove] = useState(false);

  const handleSubUnSub = (isSubscribed) => {
    setIsSubmittingData(true);
    const requestSent = 0;
    const action = async (isSubscribed, myID, userUsername, requestSent) => {
      await subUnSubToUser(isSubscribed, myID, userUsername, requestSent);
      const refreshData = await refreshUserData(userData.username);
      authContext.refreshData(refreshData);
      setIsSubmittingData(false);
    };
    action(isSubscribed, userData.id, videoDetails.username, requestSent);
  };

  const handleLikeDisLike = async () => {
    setIsSubmittingData(true);
    await handleLikeDisLikeVideo(
      videoDetails.videoID,
      userData.id,
      videoDetails.liked
    );
    setIsSubmittingData(false);
  };

  const removeVideoPopUp = async () => {
    setWindowRemove(true);
  };

  const removeVideo = async () => {
    await deleteVideo(videoDetails.videoID);
    setWindowRemove(false);
    await getData(userData.username);
  };

  const handlePlayVideo = (e) => {
    e.stopPropagation();
    if (!videoRef.current.paused) {
      videoRef.current.muted = true;
      setPlayVideo(false);
      setMuted(true);
      return;
    }

    videoRef.current.muted = false;
    setPlayVideo(true);
    setMuted(false);
  };

  const handleMuteUnmute = () => {
    videoRef.current.muted = !muted;
    setMuted((current) => !current);
  };

  const handleShortVideoTime = (time) => {
    if (time === "+5") {
      videoRef.current.currentTime += 5;
    } else {
      videoRef.current.currentTime -= 5;
    }
  };

  useEffect(() => {
    const handlePlayEvent = () => {
      setPlayVideo(true);
    };

    const handlePauseEvent = () => {
      setPlayVideo(false);
    };

    videoRef.current?.addEventListener("play", handlePlayEvent);
    videoRef.current?.addEventListener("pause", handlePauseEvent);

    return () => {
      videoRef.current?.removeEventListener("play", handlePlayEvent);
      videoRef.current?.removeEventListener("pause", handlePauseEvent);
    };
  }, [videoRef.current]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    if (playVideo) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [playVideo]);

  useEffect(() => {
    if (!observerRef?.current) {
      return;
    }
    observerRef.current.observe(videoRef.current);
  }, [observerRef?.current]);

  useEffect(() => {
    videoRef.current.currentTime = currentTime;
    if (modal === true) {
      setPlayVideo(true);
      setMuted(false);
    }
  }, []);

  return (
    <div className={classes.videoCard}>
      {windowRemove ? (
        <DeleteVideoWindow
          setWindowRemove={setWindowRemove}
          removeVideo={removeVideo}
        />
      ) : null}
      <div className={classes.videoDiv}>
        <video
          className={classes.videoClip}
          loop
          onClick={handlePlayVideo}
          ref={videoRef}
          muted={playNow}
        >
          <source
            src={`${BACKEND_URL}/video?videoID=${videoDetails.videoID}`}
            type="video/mp4"
          />
        </video>

        {myVideo ? (
          <div className={classes.removeVideo}>
            <CancelIcon
              sx={{
                width: "35px",
                height: "35px",
                "&:hover": {
                  color: "red",
                  cursor: "pointer",
                },
              }}
              onClick={removeVideoPopUp}
            />
          </div>
        ) : null}

        <div className={classes.iconsDiv}>
          <div className={classes.singleIconDiv}>
            {videoDetails.liked === 1 ? (
              <StarIcon
                sx={{
                  color: "gold",
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "white",
                  },
                }}
                onClick={() => {
                  !isSubmittingData && handleLikeDisLike();
                }}
              />
            ) : (
              <StarBorderIcon
                sx={{
                  color: "white",
                  height: "30px",
                  width: "30px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "gold",
                  },
                }}
                onClick={() => {
                  !isSubmittingData && handleLikeDisLike();
                }}
              />
            )}

            <span className={classes.boldText}>
              {videoDetails.videoLikesAmount}
            </span>
          </div>
          <div className={classes.singleIconDiv}>
            <CommentIcon
              sx={{
                color: "white",
                height: "25px",
                width: "25px",
                cursor: "pointer",
                "&:hover": {
                  color: "darkgrey",
                },
              }}
              onClick={() => {
                navigation(`/video/${videoDetails.videoID}`);
              }}
            />
            <span className={classes.boldText}>
              {videoDetails.videoCommentsAmount}
            </span>
          </div>
          <div className={classes.singleIconDiv}>
            {muted ? (
              <VolumeOffIcon
                sx={{
                  color: "white",
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "darkgrey",
                  },
                }}
                onClick={handleMuteUnmute}
              />
            ) : (
              <VolumeUpIcon
                sx={{
                  color: "white",
                  height: "25px",
                  width: "25px",
                  cursor: "pointer",
                  "&:hover": {
                    color: "darkgrey",
                  },
                }}
                onClick={handleMuteUnmute}
              />
            )}
          </div>

          <div className={classes.singleIconDiv}>
            <Forward5Icon
              sx={{
                color: "white",
                height: "25px",
                width: "25px",
                cursor: "pointer",
                "&:hover": {
                  color: "darkgrey",
                  animation: "spin_1 2s linear infinite",
                  "@keyframes spin_1": {
                    "0%": {
                      transform: "rotate(-360deg)",
                    },
                    "100%": {
                      transform: "rotate(0deg)",
                    },
                  },
                },
              }}
              onClick={() => handleShortVideoTime("+5")}
            />
          </div>

          <div className={classes.singleIconDiv}>
            <Replay5Icon
              sx={{
                color: "white",
                height: "25px",
                width: "25px",
                cursor: "pointer",
                "&:hover": {
                  color: "darkgrey",
                  animation: "spin_2 2s linear infinite",
                  "@keyframes spin_2": {
                    "0%": {
                      transform: "rotate(0eg)",
                    },
                    "100%": {
                      transform: "rotate(-360deg)",
                    },
                  },
                },
              }}
              onClick={() => handleShortVideoTime("-5")}
            />
          </div>
        </div>

        <div
          className={
            playVideo
              ? `${classes.playVideoClass} ${classes.videoPlayIconDiv}`
              : `${classes.pauseVideoClass} ${classes.videoPlayIconDiv}`
          }
        >
          <PlayArrowIcon
            sx={{
              color: "white",
              height: isCompact ? "45px" : "90px",
              width: isCompact ? "45px" : "90px",
              backgroundColor: "transparent",
              backdropFilter: "blur(10px)",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
        </div>
      </div>
      <div className={classes.videoFooter}>
        <span
          className={isCompact ? classes.compactVideoTitle : classes.videoTitle}
          onClick={() => {
            navigation(`/video/${videoDetails.videoID}`);
          }}
        >
          {videoDetails.title}
        </span>
        <div className={classes.footerContainer}>
          <div className={classes.footerLeft}>
            {isCompact ? null : (
              <div className={classes.footerUser}>
                <Avatar
                  src={avatarUrl}
                  sx={{ height: 35, width: 35, cursor: "pointer" }}
                  onClick={() => {
                    navigation(`/profile/${username}`);
                  }}
                />
                <p
                  onClick={() => {
                    navigation(`/profile/${username}`);
                  }}
                >
                  {username}
                </p>
                {isVerified === 1 ? (
                  <CheckCircleIcon
                    sx={{
                      color: "blue",
                      height: "15px",
                      width: "15px",
                      marginTop: "2px",
                      backgroundColor: "transparent",
                      borderRadius: "25px",
                    }}
                  />
                ) : (
                  ""
                )}
                <span className={classes.datePostedText}>
                  • {videoDetails.date_posted}
                </span>
              </div>
            )}
          </div>
          <div className={classes.footerRight}>
            {isCompact ? null : (
              <SubscribeButton
                isSubscribed={isSubscribed}
                handleSubUnSub={handleSubUnSub}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
