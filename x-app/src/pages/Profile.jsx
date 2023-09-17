import { useContext, useEffect, useState } from "react";
import Post from "../components/PostCard";
import {
  LinearProgress,
  Box,
  Avatar,
  Button,
  Typography,
  Card,
  CardActionArea,
  IconButton,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { blue, pink } from "@mui/material/colors";
import { fetchProfile, uploadCover } from "../libs/fetcher";
import { ThemeContext } from "@emotion/react";
import { AuthContext } from "../ThemedApp";
const url = "http://localhost:8888/users";
export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { handle } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const [cover, setCover] = useState([]);
  const [photo, setPhoto] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchProfile(handle);
      setPosts(data);
      setLoading(false);
    })();
  }, [handle]);

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
  const getFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker({
      types: [
        {
          description: "Images",
          accept: {
            "image/*": [".png", ".jpg", ".jpeg"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    return await fileHandle.getFile();
  };
  //
  const changeCover = async () => {
    if (authUser.handle !== handle) return false;
    const file = await getFile();
    setCover(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("cover", file);
    console.log(formData);
    uploadCover(posts[0].user._id, formData);
  };
  const changePhoto = async () => {
    if (authUser.handle !== handle) return false;
    const file = await getFile();
    setPhoto(URL.createObjectURL(file));
  };
  return (
    <>
      {!loading ? (
        <Box>
          <Card>
            <CardActionArea
              sx={{
                bgcolor: "banner.background",
                height: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={changeCover}
            >
              <img src={cover} alt="" style={{ width: "100%" }} />
            </CardActionArea>
          </Card>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 8,
              mt: -9,
            }}
          >
            <IconButton onClick={changePhoto}>
              <Avatar
                src=""
                sx={{
                  background: pink[500],
                  width: 128,
                  height: 128,
                }}
              >
                {photo.length ? (
                  <img src={photo} width="128" height="128" />
                ) : (
                  posts[0].user.name[0]
                )}
              </Avatar>
            </IconButton>
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
