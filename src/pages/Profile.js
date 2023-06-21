import { useParams } from "react-router-dom";
import classes from "./Profile.module.css";
import { Avatar } from "@mui/material";
import VideoCard from "../components/VideoCard";
import SubscribeButton from "../components/SubscribeButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import {
  getProfileData,
  likeDislikeVideo,
  subUnSubToUser,
} from "../backend/helpers";

const Profile = () => {
  const { userData } = useContext(AuthContext);
  const param = useParams();
  const [profileData, setProfileData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getProfileUserData = async (username) => {
    const profileUserData = await getProfileData(username, userData.id);
    setProfileData(profileUserData.userData);
    setIsLoading(false);
  };

  useEffect(() => {
    getProfileUserData(param.username);
  }, [param.username]);

  const handleSubUnSub = () => {
    const action = async (isSubscribed, myID, username, requestSent) => {
      await subUnSubToUser(isSubscribed, myID, username, requestSent);
    };

    const update = async () => {
      await action(
        profileData.isSubscribed,
        userData.id,
        profileData.username,
        profileData.requestSent
      );
      getProfileUserData(param.username);
    };
    update();
  };

  const handleLikeDisLikeVideo = async (videoID, myID, liked) => {
    await likeDislikeVideo(videoID, myID, liked);
    getProfileUserData(param.username);
  };

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner} />
      </div>
    );
  }

  if (profileData.length === 0) {
    return (
      <div className={classes.errorDiv}>
        <div className={classes.errorDivBorder}>
          <p>Error! User not found!</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.mainDiv}>
        <Avatar
          src={profileData.profile_pic}
          sx={{ height: 150, width: 150 }}
        />
        <div className={classes.userDiv}>
          <p className={classes.nameText}>{profileData.username}</p>
          {profileData.isVerified === 1 ? (
            <div className={classes.tooltip}>
              <CheckCircleIcon
                sx={{
                  color: "blue",
                  position: "absolute",
                  right: "-30px",
                  marginTop: "5px",
                  cursor: "pointer",
                }}
              />
              <span className={classes.tooltiptext}>Verified user!</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <span className={classes.dateText}>joined {profileData.shortDate}</span>
        <span
          style={{
            wordBreak: "break-all",
            maxWidth: "75%",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          {profileData.description}
        </span>
        <div style={{ marginTop: "10px" }}>
          <SubscribeButton
            isSubscribed={profileData.isSubscribed}
            requestSent={profileData.requestSent}
            handleSubUnSub={handleSubUnSub}
          />
        </div>
      </div>
      <div className={classes.contentDiv}>
        {profileData.videos?.map((video) => (
          <div key={video.url} className={classes.videoCardDiv}>
            <VideoCard
              videoDetails={video}
              isCompact={true}
              handleLikeDisLikeVideo={handleLikeDisLikeVideo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
