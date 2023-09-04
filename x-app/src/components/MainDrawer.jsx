import {
  Home as HomeIcon,
  Login as LoginIcon,
  Person2 as PersonIcon,
  PersonAddAlt as PersonAddAltIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { pink } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../ThemedApp";
import {
  Drawer,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

export default function MainDrawer({ showDrawer, toggleDrawer }) {
  const navigate = useNavigate();
  const { auth, setAuth, setAuthUser, authUser } = useContext(AuthContext);
  return (
    <div>
      <Drawer anchor="left" open={showDrawer} onClose={toggleDrawer}>
        <Box sx={{ width: 300 }}>
          <Box
            sx={{
              height: 180,
              display: "flex",
              alignItems: "end",
            }}
          >
            <Avatar
              sx={{
                width: 98,
                height: 98,
                ml: 3,
                mb: -5,
                bgcolor: pink[500],
                // background: "#59f",
              }}
            >
              {auth ? authUser.name : "U"}
            </Avatar>
            {auth && (
              <>
                <Typography variant="p" sx={{ ml: 3, mt: 3 }}>
                  {authUser.name}
                </Typography>
                <Typography variant="p" sx={{ ml: 1, mt: 3, color: "gray" }}>
                  @{authUser.handle}
                </Typography>
              </>
            )}
          </Box>

          <List sx={{ mt: 10 }}>
            {auth && (
              <>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate(`/profile/${authUser.handle}`);
                      toggleDrawer();
                    }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>

                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate("/");
                      setAuth(false);
                      toggleDrawer();
                    }}
                  >
                    <ListItemIcon>
                      <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate("/login");
                      setAuth(false);
                      setAuthUser({});
                      localStorage.removeItem("token");
                      toggleDrawer();
                    }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
            {!auth && (
              <>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate("/login");
                      setAuth(true);
                      toggleDrawer();
                    }}
                  >
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton
                    onClick={() => {
                      navigate("/register");
                      toggleDrawer();
                    }}
                  >
                    <ListItemIcon>
                      <PersonAddAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
