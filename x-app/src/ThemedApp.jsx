import { createContext, useMemo, useState, useEffect } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, pink } from "@mui/material/colors";
import App from "./App";
import { fetchVerify } from "./libs/fetcher";

export const ThemeContext = createContext();
export const AuthContext = createContext();
export default function ThemedApp() {
  const [mode, setMode] = useState("dark");
  const [auth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState({});

  useEffect(() => {
    (async () => {
      const user = await fetchVerify();
      if (user) {
        setAuth(true);
        setAuthUser(user);
      }
    })();
  }, []);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        ...(mode === "light"
          ? {
              banner: {
                background: grey[300],
              },
              appbar: {
                background: pink[500],
              },
              text: {
                fade: grey[500],
              },
            }
          : {
              banner: {
                background: grey[900],
              },
              appbar: {
                background: "#111",
              },
              text: {
                fade: grey[700],
              },
            }),
      },
    });
  }, [mode]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, authUser, setAuthUser }}>
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
