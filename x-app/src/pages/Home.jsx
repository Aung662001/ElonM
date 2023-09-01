import { useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchPosts } from "../libs/fetcher";

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
          return <Post post={post} key={post._id} />;
        })
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
