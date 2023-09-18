import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import { useNavigate } from "react-router-dom";
import { deleteSinglePost, fetchPosts, fetchToggleLike } from "../libs/fetcher";
import { AuthContext, NotiCountContext } from "../ThemedApp";
import { LinearProgress } from "@mui/material";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authUser, posts, setPosts } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const posts = await fetchPosts();
      if (!posts) {
        setLoading(false);
        return navigate("/login");
      }
      setPosts(posts);
      setLoading(false);
    })();
  }, []);
  //for delete post inside postcard
  const deletePost = async (id) => {
    let res = await deleteSinglePost(id);
    if (res) {
      setPosts((posts) => [...posts.filter((post) => post._id !== id)]);
    }
  };
  function LikeClick(_id) {
    setPosts(
      posts.map((post) => {
        if (post._id == _id) {
          if (post.likes.includes(authUser._id)) {
            post.likes = post.likes.filter((like) => like !== authUser._id);
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
          return (
            <Post
              post={post}
              key={post._id}
              LikeClick={LikeClick}
              deletePost={deletePost}
            />
          );
        })
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
