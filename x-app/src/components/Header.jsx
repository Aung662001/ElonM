import {
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext, ThemeContext } from "../ThemedApp";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Badge,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

export default function Header({ toggleDrawer }) {
  const mainPages = ["/", "/login", "/register"];
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const { setAuth, setAuthUser, auth } = useContext(AuthContext);
  return (
    <Box sx={{ flexGrow: 1, mb: 3 }}>
      <AppBar position="static" sx={{ bgcolor: "appbar.background" }}>
        <Toolbar>
          {mainPages.includes(location.pathname) ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexGrow: 1,
            }}
          ></Box>

          {mode === "dark" ? (
            <IconButton onClick={() => setMode("light")}>
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton onClick={() => setMode("dark")}>
              <DarkModeIcon />
            </IconButton>
          )}

          {auth && (
            <IconButton onClick={(e) => setShowMenu(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          )}

          <Menu
            anchorEl={showMenu}
            open={Boolean(showMenu)}
            onClose={() => setShowMenu(false)}
          >
            <MenuItem
              onClick={() => {
                setShowMenu(false);
                setAuth(false);
                setAuthUser({});
                navigate("/login");
                localStorage.removeItem("token");
              }}
              sx={{ width: 200 }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
