import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../ThemedApp";

const EditProfile = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const { authUser } = useContext(AuthContext);
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
          placeholder={authUser.name}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-basic"
          //   label={authUser.handle}
          placeholder={authUser.handle}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained">Confirm</Button>
        <p>
          <small>You can Edit Cover and Profile Photo By clicking On it.</small>
        </p>
      </Box>
    </Modal>
  );
};

export default EditProfile;
