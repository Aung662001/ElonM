import { useEffect, useState } from "react";
import Post from "../components/PostCard";
import { Box, LinearProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import NewComment from "./NewComment";
const url = "http://localhost:8888/posts";
export default function Comment() {
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/${id}`);
      const data = await res.json();
      setPost(data);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {!loading ? (
        <Box>
          <Post post={post} key={post._id} primary={true} />

          {post.comments.length != 0 &&
            post.comments.map((comment) => {
              return <Post post={comment} key={comment._id} />;
            })}
          <NewComment />
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
