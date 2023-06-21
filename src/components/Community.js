import { useState, useEffect } from "react";
import classes from "./Community.module.css";
import CommunityVideoCard from "./CommunityVideoCard";
import { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { getCommunityVideos } from "../backend/helpers";
import CommunityModalVideoWindow from "./CommunityModalVideoWindow";
import { Portal } from "@mui/material";

const Community = () => {
  const { userData } = useContext(AuthContext);
  const [communityVideos, setCommunityVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterNum, setFilterNum] = useState(30);
  const [modalWindow, setModalWindow] = useState(false);
  const [modalWindowVideoID, setModalWindowVideoID] = useState(null);
  const [selectedVideoCurrentTime, setSelectedVideoCurrentTime] =
    useState(null);

  const getVideos = async () => {
    setIsLoading(true);
    const videos = await getCommunityVideos(userData.id, filterNum);
    setCommunityVideos(videos);
    setIsLoading(false);
  };

  const openModal = (videoID, event) => {
    const videoCurrentTime = event.target.currentTime;
    setSelectedVideoCurrentTime(videoCurrentTime);
    if (modalWindow === false) {
      document.body.style.overflow = "hidden";
      setModalWindow(true);
      setModalWindowVideoID(videoID);
    }
  };

  const closeModal = () => {
    if (modalWindow === true) {
      document.body.style.overflow = "auto";
      setModalWindow(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, [filterNum]);

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner}></div>
      </div>
    );
  }

  return (
    <div className={classes.mainDiv}>
      <div className={classes.selectDiv}>
        <select
          defaultValue={filterNum}
          className={classes.selectOption}
          onChange={(e) => setFilterNum(e.target.value)}
        >
          <option value="1">Last 24h</option>
          <option value="7">Last week</option>
          <option value="30">Last month</option>
        </select>
      </div>
      <div className={classes.contentDiv}>
        <Portal>
          {modalWindow === false ? null : (
            <CommunityModalVideoWindow
              closeModal={closeModal}
              videoID={modalWindowVideoID}
              myID={userData.id}
              currentTime={selectedVideoCurrentTime}
            />
          )}
        </Portal>

        {communityVideos.map((video) => (
          <CommunityVideoCard
            videoDetails={video}
            key={video.videoID}
            openModal={openModal}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
