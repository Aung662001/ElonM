import { useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress } from "@mui/material";
const url = "http://localhost:8888/posts";
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
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
