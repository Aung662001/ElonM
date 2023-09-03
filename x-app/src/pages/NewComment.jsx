import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { IconButton, InputAdornment } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { AuthContext } from "../ThemedApp";
const NewComment = () => {
  const [content, setContent] = useState("");
  const { authUser } = useContext(AuthContext);
  const addComment = (e) => {
    e.preventDefault();
  };
  return (
    <Box sx={{ display: "flex" }}>
      <TextField
        id="filled-basic"
        label="What is in your mind!"
        variant="filled"
        sx={{ flexGrow: 1 }}
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={(e) => addComment(e)}>
                <AddCommentIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </Box>
  );
};

export default NewComment;
