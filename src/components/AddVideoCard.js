import { useNavigate } from "react-router-dom";
import classes from "./AddVideoCard.module.css";
import AddIcon from "@mui/icons-material/Add";

const AddVideoCard = () => {
  const navigation = useNavigate();

  return (
    <div className={classes.videoCardDiv}>
      <div className={classes.videoCard}>
        <AddIcon
          sx={{
            height: "50px",
            width: "50px",
            color: "white",
            border: "1px solid darkgrey",
            backgroundColor: "grey",
            borderRadius: "25px",
            position: "absolute",
            top: "45%",
            left: "45%",
            transition: "all 0.35s",
            "&:hover": {
              cursor: "pointer",
              scale: "1.25",
            },
          }}
          onClick={() => {
            navigation(`/addNewVideo`);
          }}
        />
      </div>
    </div>
  );
};

export default AddVideoCard;
