import { useState, useEffect } from "react";

import { Box } from "@mui/material";

import { useParams } from "react-router-dom";

import UserList from "../components/UserList.jsx";
import { fetchLikes } from "../libs/fetcher.js";

export default function Likes() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async () => {
      let users = await fetchLikes(id);
      setUsers(users);
    })();
  }, [id]);
  return (
    <Box>
      <UserList title="Likes" users={users} />
    </Box>
  );
}
