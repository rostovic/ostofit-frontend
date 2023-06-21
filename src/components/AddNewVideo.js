import { useContext, useRef, useState } from "react";
import classes from "./AddNewVideo.module.css";
import { AuthContext } from "../context/auth-context";
import { uploadVideo } from "../backend/helpers";
import { useNavigate } from "react-router-dom";

const AddNewVideo = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { userData } = useContext(AuthContext);
  const titleRef = useRef();

  const navigation = useNavigate();

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const title = titleRef.current.value;
    if (title.length === 0 || selectedFile === null) {
      return;
    }
    const data = new FormData();
    data.append("file", selectedFile, selectedFile.name);
    const response = await uploadVideo(data, userData.username, title);
    if (response === "success") {
      setTimeout(() => {
        setIsUploading(false);
        navigation("/profile");
        // modal window success
      }, 1000);
    } else {
      setTimeout(() => {
        setIsUploading(false);
        // modal window error
      }, 1000);
    }
  };

  return (
    <div className={classes.mainDiv}>
      <form className={classes.formUpload}>
        <span className={classes.formTitleText}>Upload your video!</span>
        <div className={classes.contentDiv}>
          <label htmlFor="file" className={classes.addFile}>
            Select video
          </label>

          <label>
            {selectedFile ? selectedFile.name : "No file selected."}
          </label>
        </div>
        <div className={classes.titleDiv}>
          <span className={classes.titleLabel}>Title:</span>
          <input
            id="text"
            name="text"
            type="text"
            ref={titleRef}
            className={classes.titleInput}
          ></input>
        </div>

        <button className={classes.buttonUpload} onClick={handleUpload}>
          {isUploading ? (
            <div className={classes.loaderSpinnerWrapper}>
              <div className={classes.loaderSpinner}></div>
            </div>
          ) : (
            "Upload"
          )}
        </button>

        <input
          id="file"
          name="file"
          type="file"
          className={classes.hiddenInput}
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
          style={{ visibility: "hidden" }}
          accept="video/*"
        />
      </form>
    </div>
  );
};

export default AddNewVideo;
