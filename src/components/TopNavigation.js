import { useNavigate } from "react-router-dom";
import classes from "./TopNavigation.module.css";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { useContext, useEffect, useState } from "react";
import ListItemDropdown from "./ListItemDropdown";
import { AuthContext } from "../context/auth-context";
import { findUsers } from "../backend/helpers";

const TopNavigation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { userData } = useContext(AuthContext);
  const navigation = useNavigate();
  const [isSearching, setIsSearching] = useState(false);
  const [users, setUsers] = useState("");

  const closeSearchDropdownList = () => {
    setIsSearching(false);
    setUsers("");
    document.getElementById("search-bar").value = "";
  };

  useEffect(() => {
    if (searchTerm === "") {
      setIsSearching(false);
      setUsers("");
      return;
    }

    const isTyping = setTimeout(() => {
      const users = async (username, myId) => {
        const users = await findUsers(username, myId);
        setUsers(users.data);
        setIsSearching(true);
      };
      users(searchTerm, userData.id);
    }, 500);

    return () => clearTimeout(isTyping);
  }, [searchTerm]);

  return (
    <div className={classes.mainDiv}>
      <div className={classes.buttonDiv}>
        <button
          className={classes.buttonStyle}
          onClick={() => {
            navigation("home");
          }}
        >
          Home
        </button>

        <button
          className={classes.buttonStyle}
          onClick={() => {
            navigation("profile");
          }}
        >
          My Profile
        </button>

        <button
          className={classes.buttonStyle}
          onClick={() => {
            navigation("community");
          }}
        >
          Community
        </button>

        <div className={classes.spaceDiv}></div>
        <div className={classes.spaceDiv}></div>
      </div>
      <div className={classes.searchDiv}>
        <TextField
          sx={{ height: 50 }}
          fullWidth
          placeholder="Search user..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          id="search-bar"
          variant="standard"
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={() => {
            setIsSearching(false);
          }}
        />
        {users.length > 0 && isSearching && (
          <div className={classes.popUpSearchDiv}>
            <div className={classes.divList}>
              <ul className={classes.listStyle}>
                {users.map((user) => (
                  <ListItemDropdown
                    key={user.username}
                    id={user.id}
                    avatarUrl={user.profile_pic}
                    username={user.username}
                    closeSearchDropdownList={closeSearchDropdownList}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className={classes.rightDiv}></div>
    </div>
  );
};
export default TopNavigation;
