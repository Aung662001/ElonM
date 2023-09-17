import { Favorite, Message, Opacity } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { fetchNoti, fetchReadNoti, getToken } from "../libs/fetcher";
import { NotiCountContext } from "../ThemedApp";
import { useNavigate } from "react-router-dom";

const Noti = () => {
  const navigate = useNavigate();
  const { notiCount, setNotiCount } = useContext(NotiCountContext);
  const [notis, setNotis] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchNoti();
      if (result) {
        setNotis(result);
        setNotiCount(result.filter((res) => res.read == false).length);
      }
    })();
  }, []);
  const readNoti = (id) => {
    setNotis(
      notis.map((noti) => {
        if (noti._id == id) noti.read = true;
        return noti;
      })
    );
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ alignSelf: "flex-end" }}>
        <Button variant="outlined">Mark As All Read</Button>
      </Box>
      {notis.map((noti) => {
        return (
          <Card key={noti._id} sx={{ opacity: `${noti.read ? ".4" : "1"}` }}>
            <CardActionArea
              onClick={() => {
                readNoti(noti._id);
                fetchReadNoti(noti._id);
                setNotiCount(notiCount - 1);
                navigate(`/comment/${noti.target}`);
              }}
            >
              <CardContent
                sx={{ display: "flex", gap: 2, alignItems: "center" }}
              >
                {noti.type == "comment" ? (
                  <Message color="success" />
                ) : (
                  <Favorite color="error" />
                )}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar></Avatar>
                  <Typography sx={{ font: "lg" }}>
                    {noti.user.name}
                  </Typography>{" "}
                  {noti.msg}
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </Box>
  );
};

export default Noti;
