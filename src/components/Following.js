import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import classes from "./Followers.module.css";
import Follower from "./Follower";
import { getAllFollowingForUser } from "../backend/helpers";

const Following = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const { userData } = useContext(AuthContext);
  const allFollowing = data.data || "";

  useEffect(() => {
    const getAllFollowing = async (id) => {
      const allFollowing = await getAllFollowingForUser(id);
      if (allFollowing.length === 0) {
        return setData(false);
      }
      if (data.status != "success") {
        setIsLoading(false);
      }
      return setData(allFollowing);
    };
    getAllFollowing(userData.id);
  }, []);

  return (
    <div className={classes.mainDiv}>
      <div className={classes.followersDiv}>
        {data
          ? allFollowing.map((user) => (
              <Follower
                id={user.id}
                key={user.id}
                avatarUrl={user.profile_pic}
                action="following"
                username={user.username}
              />
            ))
          : ""}
        {isLoading ? <div className={classes.loaderSpinner}></div> : ""}
        {!isLoading && !data ? <span>No users found!</span> : ""}
      </div>
    </div>
  );
};

export default Following;
