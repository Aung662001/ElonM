import {
  Menu as MenuIcon,
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useContext, useState } from "react";
import { NotiCountContext, ThemeContext } from "../ThemedApp";
import { useNavigate } from "react-router-dom";
import Search from "../pages/Search";
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
  const [openSearch, setOpenSearch] = useState(false);
  // const [showMenu, setShowMenu] = useState(false);
  // const { setAuth, setAuthUser, auth } = useContext(AuthContext);
  const { notiCount } = useContext(NotiCountContext);
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
          <IconButton onClick={() => setOpenSearch(true)}>
            <PersonSearchIcon />
          </IconButton>
          {mode === "dark" ? (
            <IconButton
              onClick={() => {
                localStorage.setItem("xclone-theme", "light");
                setMode("light");
              }}
            >
              <LightModeIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                localStorage.setItem("xclone-theme", "dark");
                setMode("dark");
              }}
            >
              <DarkModeIcon />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              navigate("/notis");
            }}
          >
            <Badge
              color="error"
              badgeContent={notiCount}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          {/* {auth && (
            <IconButton onClick={(e) => setShowMenu(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          )} */}

          {/* <Menu
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
          </Menu> */}
        </Toolbar>
      </AppBar>
      <Search open={openSearch} setOpen={setOpenSearch} />
    </Box>
  );
}
