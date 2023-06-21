import { Avatar } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import classes from "./LayoutLeft.module.css";
import { getAllDataNumbers } from "../backend/helpers";
import LogoutIcon from "@mui/icons-material/Logout";

const LayoutLeft = () => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigate();
  const authContext = useContext(AuthContext);
  const { logout } = useContext(AuthContext);
  const { id, profile_pic, username, isVerified } = authContext.userData;

  const getNumbersForProfile = async (id) => {
    const numberData = await getAllDataNumbers(id);
    setData(numberData);
    setIsLoading(false);
  };

  useEffect(() => {
    getNumbersForProfile(id);
  }, [authContext.userData]);

  const { followers, following, requests } = data || ["", "", ""];

  if (isLoading) {
    return (
      <div className={classes.loaderSpinnerWrapper}>
        <div className={classes.loaderSpinner}></div>
      </div>
    );
  }

  return (
    <div className={classes.mainLayout}>
      <div className={classes.contentDiv}>
        <div className={classes.userDiv}>
          <Avatar
            src={profile_pic}
            sx={{
              height: 35,
              width: 35,
              cursor: "pointer",
              "&:hover": { scale: "1.05" },
            }}
            onClick={() => {
              navigation(`profile`);
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <p
              className={classes.username}
              onClick={() => {
                navigation(`profile`);
              }}
            >
              {username}
            </p>

            {isVerified === 1 ? (
              <div className={classes.circleIcon}>
                <CheckCircleIcon
                  sx={{
                    color: "blue",
                    marginTop: "6px",
                    height: "20px",
                    width: "20px",
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <LogoutIcon
            sx={{
              "&:hover": { scale: "1.1", cursor: "pointer" },
            }}
            onClick={logout}
          />
        </div>
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div className={classes.followersDiv}>
            <p
              className={classes.followerNumber}
              onClick={() => {
                navigation("requests");
              }}
            >
              {requests}
            </p>

            <p className={classes.followerText}>requests</p>
          </div>
          <div className={classes.followersDiv}>
            <p
              className={classes.followerNumber}
              onClick={() => {
                navigation("followers");
              }}
            >
              {followers}
            </p>

            <p className={classes.followerText}>followers</p>
          </div>
          <div className={classes.followersDiv}>
            <p
              className={classes.followerNumber}
              onClick={() => {
                navigation("following");
              }}
            >
              {following}
            </p>

            <p className={classes.followerText}>following</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LayoutLeft;
