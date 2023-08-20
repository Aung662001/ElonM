import { useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress, Box, Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
const url = "http://localhost:8888/users";
export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { handle } = useParams();
  useEffect(() => {
    (async () => {
      const res = await fetch(`${url}/${handle}`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    })();
  }, [handle]);

  return (
    <>
      {!loading ? (
        <Box>
          <Box
            sx={{
              height: 200,
              backgroundColor: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              mb: 12,
            }}
          >
            <Avatar
              sx={{ background: blue[500], width: 128, height: 128, mb: -7 }}
            >
              A
            </Avatar>
          </Box>
          {posts.map((post) => {
            return <Post post={post} key={post._id} />;
          })}
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
