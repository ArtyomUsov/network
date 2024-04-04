import * as React from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
  
export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "name",
    lastName: "lastName",
    avatar: null,
  });

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8080/api/user", {
        headers: {
          Authorization: token,
        },
      });
      if (!response.ok) {
        throw new Error("Error fetching current user");
      }
      const user = await response.json();
      if (user) {
        setUserData((prevState) => ({
          ...prevState,
          name: user.userData.name,
          lastName: user.userData.lastName,
          avatar: user.userData.avatar,
        }));
      } else {
        throw new Error("Данные пользователя не корректны");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    navigate("/api/auth");
  };

  return (
    <Box sx={{ pt: 5 }}>
      <Card sx={{ height: 315, maxWidth: 800, margin: "auto", position: "relative" }}>
        <CardMedia sx={{ height: 200, bgcolor: "gray" }} image={""} title="background" />
        <Paper sx={{ height: 120, position: "relative", position: "relative", top: -5 }}>
          <Avatar
            alt="User avatar"
            src={userData.avatar}
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              top: -50,
              left: 20,
              border: 4,
              borderColor: "white",
            }}
          />
          <CardContent sx={{ maxWidth: 600, margin: "auto" }}>
            {/* {user.userData && ( */}
            <Typography gutterBottom variant="h5" component="div">
              {userData.name} {userData.lastName}
            </Typography>
            {/* )}*/}
            <CardActions sx={{ justifyContent: "end" }}>
              <Button variant="Text" size="small">
                Редактировать профиль
              </Button>
              <Button variant="Text" size="small">
                Ещё
              </Button>
              <Button variant="Text" size="small" onClick={logOut}>
                Выйти
              </Button>
            </CardActions>
          </CardContent>
        </Paper>
      </Card>
    </Box>
  );
}
