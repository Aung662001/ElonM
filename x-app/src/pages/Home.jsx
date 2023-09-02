import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPosts, fetchToggleLike } from "../libs/fetcher";
import { AuthContext } from "../ThemedApp";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useContext(AuthContext);

  function LikeClick(_id) {
    fetchToggleLike(_id);
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
  useEffect(() => {
    (async () => {
      const posts = await fetchPosts();
      if (!posts) {
        return navigate("/login");
      }

      setPosts(posts);
      setLoading(false);
    })();
  }, []);

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
