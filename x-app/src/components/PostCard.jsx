import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Avatar,
  Button,
  ButtonGroup,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { pink, blue, blueGrey } from "@mui/material/colors";
import { formatRelative, parseISO, formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Delete,
  Favorite as LikedIcon,
  MoreVert,
  Share,
} from "@mui/icons-material";
import MessageIcon from "@mui/icons-material/Message";
import { useContext, useState } from "react";
import { AuthContext } from "../ThemedApp";
import { fetchToggleLike } from "../libs/fetcher";

const Post = ({ post, primary, LikeClick, deletePost }) => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const singlePost = (id) => {
    navigate(`/comment/${id}`);
  };
  const { authUser } = useContext(AuthContext);
  const profileClick = (handle) => {
    navigate(`/profile/${handle}`);
  };

  return (
    <>
      <Card
        sx={{
          mb: 1,
          bgcolor: primary ? "#183D3D" : "transparent",
        }}
        variant="outlined"
      >
        <CardActionArea>
          {/* comment.jsx */}
          <CardContent sx={{ display: "flex", p: 2 }}>
            <Box sx={{ mr: 3 }} onClick={() => profileClick(post.user.handle)}>
              <Avatar
                alt="Profile Picture"
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: primary ? blue[500] : pink[400],
                }}
              >
                {/* {post.user.name[0]} */}
                {post.user.name.charAt(0)}
              </Avatar>
            </Box>
            <Box onClick={() => singlePost(post._id)} sx={{ width: "100%" }}>
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ mr: 1 }} component="span">
                  <b>{post.user.name}</b>
                </Typography>

                <Typography component="span" sx={{ color: "grey" }}>
                  @{post.user.handle}
                </Typography>

                <Typography component="span" sx={{ ml: 1, color: pink[400] }}>
                  <small>
                    {/* {formatRelative(parseISO(post.created), new Date())} */}
                    {formatDistance(new Date(post.created), new Date(), {
                      addSuffix: true,
                    })}
                  </small>
                </Typography>
              </Box>

              <Typography variant="subtitle1" color="text.secondary">
                {post.body}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <ButtonGroup>
            <IconButton
              onClick={(e) => {
                LikeClick(post._id);
                fetchToggleLike(post._id);
              }}
            >
              {post.likes.includes(authUser._id) ? (
                <LikedIcon sx={{ color: pink[500] }} />
              ) : (
                <FavoriteBorderIcon color="error" />
              )}
            </IconButton>
            <Button
              variant="text"
              onClick={() => {
                navigate(`/likes/${post._id}`);
              }}
            >
              {post.likes && post.likes.length}
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <IconButton>
              <MessageIcon color="success" />
            </IconButton>
            <Button
              variant="text"
              onClick={() =>
                post.comments?.length && navigate(`/posts/${post._id}/comments`)
              }
            >
              {post.comments?.length ? post.comments.length : "0"}
            </Button>
          </ButtonGroup>
          {/* for delete  */}
          <IconButton onClick={(e) => setShowMenu(e.currentTarget)}>
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={showMenu}
            open={Boolean(showMenu)}
            onClose={() => setShowMenu(false)}
          >
            {post.owner === authUser._id && (
              <MenuItem
                sx={{
                  width: 200,
                  color: "red",
                }}
                onClick={() => deletePost(post._id)}
              >
                <Delete /> Delete Post
              </MenuItem>
            )}
            <MenuItem sx={{ width: 200 }}>
              <Share />
              Share
            </MenuItem>
          </Menu>
        </Box>
      </Card>
    </>
  );
};

export default Post;
