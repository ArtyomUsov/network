import { Box } from "@mui/material";
import React from "react";
import Profile from "../components/Profile";
import Auth from "./Auth";

const Main = () => {
  return (
    <Box sx={{ bgcolor: "whitesmoke" }}>
      {/* <Auth /> */}
      <Profile />
    </Box>
  );
};

export default Main;
