import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAllComments } from "../libs/fetcher";
import Post from "../components/PostCard";
import { AuthContext } from "../ThemedApp";

const Comments = () => {
  const { id } = useParams(); //single post id
  const { posts, loading, setPosts } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  let data;
  useEffect(() => {
    (async () => {
      data = await fetchAllComments(id);
      setComments(data.map((data) => data._id));
      setPosts((posts) => [...posts, ...data]);
    })();
  }, [id]);
  if (!posts || !comments) {
    return "loading";
  }
  return (
    <>
      {posts.map((post) => {
        console.log(posts);
        if (comments?.includes(post._id)) {
          return <Post post={post} key={post._id} />;
        } else {
          ("No Comments Yet");
        }
      })}
    </>
  );
};

export default Comments;
