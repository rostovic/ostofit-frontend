import { useNavigate } from "react-router-dom";
import classes from "./CommunityVideoCard.module.css";
import { useState } from "react";
import { BACKEND_URL } from "../backend/helpers";

const CommunityVideoCard = ({ videoDetails, openModal }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideo = (e) => {
    if (isPlaying === false) {
      e.target.play();
      setIsPlaying(true);
    } else {
      e.target.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={classes.videoCard}>
      <div
        className={classes.videoDiv}
        onClick={(event) => openModal(videoDetails.videoID, event)}
      >
        <video
          className={classes.videoClip}
          loop
          muted
          onMouseEnter={(e) => handleVideo(e)}
          onMouseLeave={(e) => handleVideo(e)}
        >
          <source
            className={classes.videoClip}
            src={`${BACKEND_URL}/video?videoID=${videoDetails.videoID}`}
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default CommunityVideoCard;
