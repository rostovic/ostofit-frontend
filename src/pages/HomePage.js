import classes from "./HomePage.module.css";
import { AuthContext } from "../context/auth-context";
import { useContext, useEffect, useRef, useState } from "react";
import VideoCard from "../components/VideoCard";
import { getFollowerShorts, likeDislikeVideo } from "../backend/helpers";
import { BACKEND_URL } from "../backend/helpers";

const Homepage = () => {
  const [isObserverReady, setIsObserverReady] = useState(false);
  const [shortsData, setShortsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const observerRef = useRef();
  const { userData, logout } = useContext(AuthContext);
  const videoRef = useRef();

  const getData = async (id) => {
    const profileUserData = await getFollowerShorts(id);
    setShortsData(profileUserData.data);
    setIsLoading(false);
  };

  const handleLikeDisLikeVideo = async (videoID, myID, liked) => {
    await likeDislikeVideo(videoID, myID, liked);
    getData(userData.id);
  };

  useEffect(() => {
    getData(userData.id);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play();
          } else {
            entry.target.pause();
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    setIsObserverReady(true);
    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner}></div>
      </div>
    );
  }

  if (shortsData.length === 0) {
    return (
      <div className={classes.noContentDiv}>
        <div className={classes.noContentDivBorder}>
          <p>No new content!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.mainLayout}></div>
      <div className={classes.shortsLayout} ref={videoRef}>
        {shortsData.map((short) => (
          <VideoCard
            videoDetails={short}
            key={short.videoID}
            id={short.videoID}
            username={short.username}
            name={short.username}
            avatarUrl={short.profilePicUrl}
            isVerified={short.isVerified}
            observerRef={observerRef}
            handleLikeDisLikeVideo={handleLikeDisLikeVideo}
            refreshHomePage={getData}
            isSubscribed="true"
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;
