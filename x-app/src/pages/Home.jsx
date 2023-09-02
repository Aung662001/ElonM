import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPosts, fetchToggleLike } from "../libs/fetcher";
import { AuthContext } from "../ThemedApp";

export default function Home() {
  const navigate = useNavigate();
  const { authUser, posts, loading } = useContext(AuthContext);

  return (
    <>
      {!loading ? (
        posts.map((post) => {
          return <Post post={post} key={post._id} />;
        })
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
