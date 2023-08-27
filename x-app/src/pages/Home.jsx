import { useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:8888/posts";
export default function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } else {
        navigate("/login");
      }
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
