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
import React, { useEffect, useState } from "react";
import { fetchNoti } from "../libs/fetcher";
const Noti = () => {
  const [notis, setNotis] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetchNoti();
      if (result) {
        setNotis(result);
      }
    })();
  }, []);
  console.log(notis);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Box sx={{ alignSelf: "flex-end" }}>
        <Button variant="outlined">Mark As All Read</Button>
      </Box>
      {notis.map((noti) => {
        return (
          <Card key={noti._id} sx={{ opacity: `${noti.read ? ".4" : "1"}` }}>
            <CardActionArea>
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
                    {noti.user[0].name}
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
