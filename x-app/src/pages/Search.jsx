import { Box, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { searchUser } from "../libs/fetcher";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";
const Search = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const handleClose = () => setOpen(false);
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
    minHeight: "500px",
  };
  useEffect(() => {
    const to = setTimeout(async () => {
      const res = await searchUser(searchText);
      if (res) {
        const data = await res.json();
        setUsers([...data]);
      }
    }, 300);
    return () => clearTimeout(to);
  }, [searchText]);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Search Someone
        </Typography>
        <TextField
          id="outlined-basic"
          placeholder="Name to search"
          variant="outlined"
          autoComplete="off"
          fullWidth
          value={searchText}
          sx={{ mb: 2 }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          focused
        />
        {users.length &&
          users.map((user) => {
            return (
              <Box
                key={user._id}
                onClick={() => {
                  navigate(`/profile/${user.handle}`);
                  handleClose();
                }}
                sx={{
                  overflow: "hidden",
                  mt: 2,
                  backgroundColor: "#7f7f7f",
                  padding: 1,
                  borderRadius: "10px",
                  cursor: "pointer",
                  "&:hover": {
                    scale: "1.03",
                  },
                }}
              >
                {user.name}
              </Box>
            );
          })}
      </Box>
    </Modal>
  );
};

export default Search;
