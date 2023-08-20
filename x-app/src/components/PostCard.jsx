import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { pink, blue, blueGrey } from "@mui/material/colors";
import { formatRelative, parseISO, formatDistance } from "date-fns";
import { useNavigate } from "react-router-dom";

const Post = ({ post, primary }) => {
  const navigate = useNavigate();
  const singlePost = (id) => {
    navigate(`/comment/${id}`);
  };
  return (
    <>
      <Card
        sx={{ mb: 1, bgcolor: primary ? "#def" : "transparent" }}
        variant="outlined"
      >
        <CardActionArea onClick={() => singlePost(post._id)}>
          <CardContent sx={{ display: "flex", p: 2 }}>
            <Box sx={{ mr: 3 }}>
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
            <Box>
              <Box sx={{ mb: 1 }}>
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
      </Card>
    </>
  );
};

export default Post;