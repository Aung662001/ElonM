import { useContext, useState } from "react";

import Header from "./components/Header";
import MainDrawer from "./components/MainDrawer";
import { Add as AddIcon } from "@mui/icons-material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Container, LinearProgress, Fab } from "@mui/material";
import { AuthContext } from "./ThemedApp";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const { loading } = useContext(AuthContext);

  return (
    <>
      <Box sx={{ position: "sticky", width: "100vw", zIndex: 100, top: 0 }}>
        <Header toggleDrawer={toggleDrawer} />
      </Box>
      {loading && <LinearProgress />}
      <MainDrawer showDrawer={showDrawer} toggleDrawer={toggleDrawer} />

      <Container>
        <Box>
          <Outlet />
        </Box>
      </Container>
      {location.pathname === "/" && (
        <Fab
          color="success"
          sx={{
            position: "fixed",
            bottom: "40px",
            right: "40px",
          }}
          onClick={() => {
            navigate("/posts/add");
          }}
        >
          <AddIcon />
        </Fab>
      )}
    </>
  );
}
