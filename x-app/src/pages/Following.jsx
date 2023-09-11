import React, { useState, useEffect } from "react";
import { fetchFollowing } from "../libs/fetcher";
import { useLocation, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import UserList from "../components/UserList";

const Following = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(path);
  const [loading, setLoading] = useState(true);
  const [follower, setFollower] = useState([]);
  const [following, setFollowing] = useState([]);
  const { handle } = useParams();
  const reg = new RegExp("/following/");
  const ing = reg.test(path);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchFollowing(handle);
      setFollower(data.followerUsers);
      setFollowing(data.followingUsers);
      setLoading(false);
    })();
  }, [handle]);
  return (
    <Box>
      {ing ? (
        <UserList
          title="Following Users"
          users={following}
          setFollowing={setFollowing}
        />
      ) : (
        <UserList title="Followers " users={follower} />
      )}
    </Box>
  );
};

export default Following;
//userId = posts.user._id
