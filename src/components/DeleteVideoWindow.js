import classes from "./DeleteVideoWindow.module.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const DeleteVideoWindow = ({ setWindowRemove, removeVideo }) => {
  return (
    <div className={classes.popUpWindow}>
      <div className={classes.popUpDiv}>
        <div className={classes.divMessage}>
          <span className={classes.messageTitle}>Delete this video?</span>
          <div className={classes.iconsDiv}>
            <CheckCircleIcon
              sx={{
                color: "lime",
                width: "65px",
                height: "65px",
                transition: "all 0.25s",
                "&:hover": {
                  scale: "1.2",
                  cursor: "pointer",
                },
              }}
              onClick={removeVideo}
            />
            <CancelIcon
              sx={{
                color: "red",
                width: "65px",
                height: "65px",
                transition: "all 0.35s",
                "&:hover": {
                  scale: "1.2",
                  cursor: "pointer",
                },
              }}
              onClick={() => setWindowRemove(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteVideoWindow;
