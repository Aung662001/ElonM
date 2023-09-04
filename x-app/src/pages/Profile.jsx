import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import { LinearProgress, Box, Avatar, Button, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blue, pink } from "@mui/material/colors";
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
  console.log(posts);
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
              {posts[0].user.name.charAt(0)}
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
            <Link
              to={`/following/${handle}`}
              style={{ textDecoration: "none", display: "flex", gap: 3 }}
            >
              <Typography sx={{ color: pink[500] }}>
                {posts[0].user.following?.length || "0"}
              </Typography>
              Following
            </Link>
            <Link
              to={`/follower/${handle}`}
              style={{ textDecoration: "none", display: "flex", gap: 3 }}
            >
              <Typography sx={{ color: pink[500] }}>
                {posts[0].user.followers?.length || "0"}
              </Typography>{" "}
              Follower
            </Link>
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
