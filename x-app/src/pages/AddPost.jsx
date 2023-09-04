import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { addNewPost } from "../libs/fetcher";
import { AuthContext } from "../ThemedApp";

//type, content, userId
const AddPost = () => {
  const [content, setContent] = useState("");
  const { authUser } = useContext(AuthContext);
  const submitPost = async (e) => {
    e.preventDefault();
    if (!content) {
      return;
    }
    let res = await addNewPost("post", content, authUser._id);
  };
  return (
    <>
      <Box>
        <h1>Add New Post</h1>
        <form onSubmit={(e) => submitPost(e)}>
          <TextField
            id="filled-multiline-static"
            label="What is in your mind?"
            multiline
            rows={4}
            variant="filled"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              sx={{
                borderRadius: "40px",
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddPost;
