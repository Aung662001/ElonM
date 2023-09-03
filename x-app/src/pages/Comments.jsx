import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllComments } from "../libs/fetcher";
import Post from "../components/PostCard";
import { AuthContext } from "../ThemedApp";

const Comments = () => {
  const { id } = useParams(); //single post id
  const { loading, authUser } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await fetchAllComments(id);
      setComments(data);
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
      {comments.map((comment) => {
        return <Post post={comment} key={comment._id} LikeClick={LikeClick} />;
      })}
    </>
  );
};

export default Comments;
