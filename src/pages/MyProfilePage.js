import classes from "./MyProfilePage.module.css";
import { AuthContext } from "../context/auth-context";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import VideoCard from "../components/VideoCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { getMyProfileData, likeDislikeVideo } from "../backend/helpers";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddVideoCard from "../components/AddVideoCard";

const MyProfilePage = () => {
  const navigation = useNavigate();
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const { profile_pic, username, isVerified, shortDate, description } =
    authContext.userData;

  const getData = async (username) => {
    const data = await getMyProfileData(username);
    setVideoData(data.videos);
    setIsLoading(false);
  };

  const handleLikeDisLikeVideo = async (videoID, myID, liked) => {
    await likeDislikeVideo(videoID, myID, liked);
    getData(username);
  };

  useEffect(() => {
    getData(username);
  }, [username]);

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner}></div>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.mainDiv}>
        <div className={classes.avatarDiv}>
          <Avatar src={profile_pic} sx={{ height: 150, width: 150 }} />
          <EditIcon
            sx={{
              position: "absolute",
              marginTop: "25px",
              marginLeft: "160px",
              transition: "all 0.35s ease",
              "&:hover": {
                height: "30px",
                width: "30px",
                cursor: "pointer",
              },
            }}
            onClick={() => {
              navigation(`/profile/edit`);
            }}
          />
        </div>
        <div className={classes.userDiv}>
          <p className={classes.nameText}>{username}</p>
          {isVerified === 1 ? (
            <div className={classes.tooltip}>
              <CheckCircleIcon
                sx={{
                  color: "blue",
                  position: "absolute",
                  right: "-30px",
                  marginTop: "5px",
                }}
              />
              <span className={classes.tooltiptext}>Verified user!</span>
            </div>
          ) : (
            ""
          )}
        </div>
        <span className={classes.dateText}>joined {shortDate}</span>
        <span
          style={{
            wordBreak: "break-all",
            maxWidth: "75%",
            fontSize: "12px",
            marginTop: "4px",
          }}
        >
          {description}
        </span>
      </div>

      <div className={classes.contentDiv}>
        {videoData.length % 3 === 0 ? <AddVideoCard /> : null}
        {videoData.length % 3 === 0 ? <AddVideoCard /> : null}
        {videoData.length % 3 === 1 ? <AddVideoCard /> : null}
        <AddVideoCard />
        {videoData.map((video) => (
          <div key={video.videoID} className={classes.videoCardDiv}>
            <VideoCard
              videoDetails={video}
              isCompact={true}
              handleLikeDisLikeVideo={handleLikeDisLikeVideo}
              myVideo={true}
              getData={getData}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfilePage;
