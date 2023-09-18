import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../ThemedApp";
import FileDropZone from "./FileDropZone";
import {
  editNameAndHandle,
  fetchLogin,
  fetchProfile,
  fetchVerify,
  uploadCover,
  uploadPhoto,
} from "../libs/fetcher";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const [cover, setCover] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  const { setAuth, setAuthUser, authUser } = useContext(AuthContext);
  //style for modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 24,
    p: 4,
  };
  const onFileSelected = (file) => {
    setCover(file);
    const formData = new FormData();
    formData.append("cover", file);
    uploadCover(authUser._id, formData);
    fetchProfile(authUser.handle);
  };
  const onPhotoSelected = (file) => {
    setPhoto(file);
    const formData = new FormData();
    formData.append("photo", file);
    uploadPhoto(authUser._id, formData);
    fetchProfile(authUser.handle);
  };

  const editConfirm = async () => {
    if (!name & !handle) {
      return;
    }
    const res = await editNameAndHandle(name, handle);
    if (res) {
      setName("");
      setHandle("");
      setOpen(false);
      setAuth(false);
      setAuthUser({});
      navigate("/login");
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Edit Profile
        </Typography>
        <TextField
          id="outlined-basic"
          placeholder="Name"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          //   label={authUser.handle}
          placeholder="handle"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
        />
        <FileDropZone onFileSelected={onFileSelected} />
        <FileDropZone onFileSelected={onPhotoSelected} photo={true} />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            editConfirm();
          }}
        >
          Confirm
        </Button>
        <p>
          <small>
            If You Change Name or Handle , You Need To{" "}
            <b style={{ color: "red" }}>Login again!</b>
          </small>
        </p>
      </Box>
    </Modal>
  );
};

export default EditProfile;
