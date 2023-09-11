import {
  Box,
  Typography,
  List,
  ListItem,
  Avatar,
  ListItemText,
  ListItemAvatar,
  Button,
} from "@mui/material";

import { pink } from "@mui/material/colors";
import { useContext, useState } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../ThemedApp";
import { UnfollowToUser, followToUser } from "../libs/fetcher";

export default function UserList({ users, title, setFollowing }) {
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        {title}
      </Typography>
      <List>
        {users.map((user) => {
          return (
            <ListItem key={user._id} sx={{ d: "flex" }}>
              <Box sx={{ flexGrow: 1 }}>
                <ListItemAvatar>
                  <Link
                    to={`/profile/${user.handle}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Avatar sx={{ bgcolor: pink[500] }}>{user.name[0]}</Avatar>
                  </Link>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name + " @" + user.handle}
                  secondary={user.profile}
                />
              </Box>
              {FollowingBtn({ user })}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
function FollowingBtn({ user }) {
  const { authUser } = useContext(AuthContext);
  const [follow, setFollow] = useState(user.followers?.includes(authUser._id));
  console.log(authUser, user);
  return (
    <Button
      onClick={() => {
        follow ? UnfollowToUser(user) : followToUser(user);
        setFollow(!follow);
      }}
      variant={follow ? "" : "contained"}
    >
      {follow ? "Unfollow" : "Follow"}
    </Button>
  );
}
