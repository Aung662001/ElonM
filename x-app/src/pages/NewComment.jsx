import Box from "@mui/material/Box";
import React, { useContext, useState } from "react";

import { InputAdornment, TextField, IconButton } from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
const NewComment = ({ addComment, setContent, content }) => {
  return (
    <Box sx={{ display: "flex", mb: 4 }}>
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
                <AddCommentIcon color="info" />
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
