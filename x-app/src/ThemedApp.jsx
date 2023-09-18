import CssBaseline from "@mui/material/CssBaseline";
import { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, pink } from "@mui/material/colors";
import App from "./App";
import { fetchNoti, fetchPosts, fetchVerify, getToken } from "./libs/fetcher";
export const ThemeContext = createContext();
export const AuthContext = createContext();
export const NotiCountContext = createContext();
import { useNavigate } from "react-router-dom";
import { LinearProgress } from "@mui/material";
const wsc = new WebSocket("ws://localhost:8888/connect");
wsc.onopen = () => {
  wsc.send(getToken());
};
export default function ThemedApp() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("dark");
  const [auth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notiCount, setNotiCount] = useState("");

  // wsc.onmessage = () => {
  //   (async () => {
  //     const result = await fetchNoti();
  //     if (result) {
  //       setNotiCount(result.filter((res) => res.read == false).length);
  //     }
  //   })();
  // };

  wsc.onmessage = (e) => {
    alert("noti");
    // (async () => {
    //   const result = await fetchNoti();
    //   if (result) {
    //     setNotiCount(result.filter((res) => res.read == false).length);
    //   }
    // })();
  };
  //like and unlike
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
  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = await fetchVerify();
      if (user) {
        setLoading(false);
        setAuth(true);
        setAuthUser(user);
      } else {
        setLoading(false);
      }
    })();
    (async () => {
      const result = await fetchNoti();
      if (result) {
        setNotiCount(result.filter((res) => res.read == false).length);
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
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authUser,
        setAuthUser,
        posts,
        setPosts,
        LikeClick,
      }}
    >
      <ThemeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <NotiCountContext.Provider value={{ notiCount, setNotiCount }}>
            <CssBaseline />
            {loading ? <LinearProgress /> : <App />}
            {/* <App /> */}
          </NotiCountContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </AuthContext.Provider>
  );
}
