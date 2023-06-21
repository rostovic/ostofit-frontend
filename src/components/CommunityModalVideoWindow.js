import { useEffect, useState } from "react";
import classes from "./CommunityModalVideoWindow.module.css";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { getVideoData, likeDislikeVideo } from "../backend/helpers";
import VideoCard from "./VideoCard";

const CommunityModalVideoWindow = ({
  videoID,
  myID,
  closeModal,
  currentTime,
}) => {
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCommunityVideoData = async (videoID, myID) => {
    const videoData = await getVideoData(videoID, myID);
    setVideoData(videoData);
    setIsLoading(false);
  };

  const handleLikeDisLikeVideo = async (videoID, myID, liked) => {
    await likeDislikeVideo(videoID, myID, liked);
    getCommunityVideoData(videoID, myID);
  };

  useEffect(() => {
    getCommunityVideoData(videoID, myID);
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner}></div>
      </div>
    );
  }

  return (
    <div className={classes.modalWindow} style={{ marginTop: window.scrollY }}>
      <FullscreenExitIcon
        sx={{
          position: "absolute",
          right: "33%",
          top: "3%",
          width: "50px",
          height: "50px",
          transition: "scale 0.5s",
          "&:hover": {
            scale: "0.6",
            cursor: "pointer",
          },
        }}
        onClick={() => closeModal()}
      />
      <div className={classes.videoCard}>
        <VideoCard
          videoDetails={videoData}
          key={videoData.videoID}
          id={videoData.videoID}
          username={videoData.username}
          name={videoData.username}
          avatarUrl={videoData.profilePicUrl}
          isVerified={videoData.isVerified}
          isSubscribed={videoData.isSubscribed}
          handleLikeDisLikeVideo={handleLikeDisLikeVideo}
          currentTime={currentTime}
          playNow={false}
          modal={true}
        />
      </div>
    </div>
  );
};

export default CommunityModalVideoWindow;
