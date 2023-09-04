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
import { useContext } from "react";

import { Link } from "react-router-dom";
import { AuthContext } from "../ThemedApp";

export default function UserList({ users, title }) {
  const { authUser } = useContext(AuthContext);
  return (
    <Box>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
        {title}
      </Typography>
      <List>
        {users.map((user) => {
          console.log(user);
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
              {user.followers?.includes(authUser._id) ? (
                <Button>Unfollow</Button>
              ) : (
                <Button variant="contained">Follow</Button>
              )}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}
