import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth-context";
import Follower from "./Follower.js";
import classes from "./Followers.module.css";
import { getAllFollowersForUser } from "../backend/helpers";

const Followers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(false);
  const { userData } = useContext(AuthContext);
  const allFollowers = data.data || "";

  useEffect(() => {
    const getAllFollowers = async (id) => {
      const allFollowers = await getAllFollowersForUser(id);
      if (allFollowers.data.length === 0) {
        setIsLoading(false);
        return setData(false);
      }
      if (data.status != "success") {
        setIsLoading(false);
      }
      return setData(allFollowers);
    };
    getAllFollowers(userData.id);
  }, []);

  return (
    <div className={classes.mainDiv}>
      <div className={classes.followersDiv}>
        {data
          ? allFollowers.map((user) => (
              <Follower
                id={user.id}
                key={user.id}
                avatarUrl={user.profile_pic}
                action="followers"
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
export default Followers;
