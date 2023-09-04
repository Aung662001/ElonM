import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllComments } from "../libs/fetcher";
import Post from "../components/PostCard";
import { AuthContext } from "../ThemedApp";
import { LinearProgress } from "@mui/material";
const Comments = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); //single post id
  const { authUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      let data = await fetchAllComments(id);
      if (!data) setLoading(false);
      setComments(data);
      setLoading(false);
    })();
  }, []);
  function LikeClick(_id) {
    setComments(
      comments.map((comment) => {
        if (comment._id == _id) {
          if (comment.likes.includes(authUser._id)) {
            comment.likes = comment.likes.filter(
              (like) => like !== authUser._id
            );
          } else {
            comment.likes.push(authUser._id);
          }
        }
        return comment;
      })
    );
  }
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        comments.map((comment) => {
          return (
            <Post post={comment} key={comment._id} LikeClick={LikeClick} />
          );
        })
      )}
    </>
  );
};

export default Comments;
