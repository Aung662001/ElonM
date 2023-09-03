import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress, Box, Avatar, Button } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { fetchProfile } from "../libs/fetcher";
import { ThemeContext } from "@emotion/react";
import { AuthContext } from "../ThemedApp";
const url = "http://localhost:8888/users";
export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { handle } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProfile(handle);
      setPosts(data);
      setLoading(false);
    })();
  }, [handle]);

  const followingClick = () => {
    navigate(`/following/${handle}`);
  };
  const followerClick = () => {
    navigate(`/follower/${handle}`);
  };

  //
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
        <Box>
          <Box
            sx={{
              height: 200,
              backgroundColor: "gray",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              mb: 9,
            }}
          >
            <Avatar
              sx={{ background: blue[500], width: 128, height: 128, mb: -7 }}
            >
              A
            </Avatar>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 10,
              gap: 4,
            }}
          >
            <Button onClick={followingClick}>Following</Button>
            <Button onClick={followerClick}>follower</Button>
          </Box>
          {posts.map((post) => {
            return <Post post={post} key={post._id} LikeClick={LikeClick} />;
          })}
        </Box>
      ) : (
        <LinearProgress />
      )}
    </>
  );
}
