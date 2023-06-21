import { AuthContext } from "../context/auth-context";
import { useContext, useEffect, useState } from "react";
import Follower from "./Follower";
import classes from "./Requests.module.css";
import {
  actionRequest,
  getAllFollowerRequests,
  refreshUserData,
} from "../backend/helpers";

const Requests = () => {
  const authContext = useContext(AuthContext);
  const [data, setData] = useState(null);
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const getFollowerRequests = async (id) => {
    const followerRequests = await getAllFollowerRequests(id);
    setData(followerRequests.data);
    setIsLoading(false);
  };

  const acceptDeclineRequest = async (action, myID, userID) => {
    await actionRequest(action, myID, userID);
    const refreshData = await refreshUserData(userData.username);
    authContext.refreshData(refreshData);
    getFollowerRequests(userData.id);
  };

  useEffect(() => {
    getFollowerRequests(userData.id);
  }, []);

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner}></div>
      </div>
    );
  }

  return (
    <div className={classes.mainDiv}>
      <div className={classes.followersDiv}>
        {data.length >= 1 ? (
          data.map((user) => (
            <Follower
              id={user.id}
              key={user.username}
              avatarUrl={user.profilePicUrl}
              action="requests"
              username={user.username}
              acceptDeclineRequest={acceptDeclineRequest}
            />
          ))
        ) : (
          <span>No new requests.</span>
        )}
      </div>
    </div>
  );
};

export default Requests;
