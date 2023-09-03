import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPosts, fetchToggleLike } from "../libs/fetcher";
import { AuthContext } from "../ThemedApp";

export default function Home() {
  const navigate = useNavigate();
  const { authUser, posts, loading } = useContext(AuthContext);
  function LikeClick(_id) {
    setPosts(
      posts.map((post) => {
        if (post._id == _id) {
          if (post.likes.includes(authUser._id)) {
            post.likes = post.likes.filter((like) => like !== authUser._id);
            console.log(post.likes);
          } else {
            post.likes.push(authUser._id);
          }
        }
        return post;
      })
    );
  }
  return (
    <>
      {!loading ? (
        posts.map((post) => {
          return <Post post={post} key={post._id} LikeClick={LikeClick} />;
        })
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
