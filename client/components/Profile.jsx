import * as React from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardMedia, Button, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "Имя",
    lastName: "Фамилия",
    avatar: null,
    background:"https://fons.pibig.info/uploads/posts/2023-05/thumbs/1685465028_fons-pibig-info-p-tumannii-fon-instagram-59.jpg",
  });

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://127.0.0.1:8080/api/user", {
        headers: {
          Authorization: token,
        },
      });
      if (response.status === 401) {
        localStorage.removeItem("token");
        navigate("/auth");
        return;
      }
      if (!response.ok) {
        throw new Error("Не удалось получить данные текущего пользователя");
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

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleChangeAvatar = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("avatar", file);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://127.0.0.1:8080/api/user", {
          method: "PUT",
          headers: {
            Authorization: token,
          },
          body: formData,
        });

        if (response.ok) {
          const updatedUser = await response.json();
          setUserData((prevState) => ({
            ...prevState,
            avatar: updatedUser.avatar,
          }));
          fetchCurrentUser();
          console.log(updatedUser.avatar);
        } else {
          throw new Error("Error updating avatar");
        }
      } catch (error) {
        console.error(error);
      }
    };

    input.click();
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <Box sx={{ pt: 5 }}>
      <Card sx={{ height: 315, maxWidth: 800, margin: "auto", position: "relative" }}>
        <CardMedia
          sx={{ height: 200, bgcolor: "gray" }}
          image={userData.background}
          title="background"
          component="img"
          alt="Background Image"
        />
        <Paper sx={{ height: 120, position: "relative", position: "relative", top: -5 }}>
          <Avatar
            alt="User avatar"
            src={"main/src/assets/uploads/" + userData.avatar}
            key={userData.avatar}
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              top: -50,
              left: 20,
              border: 4,
              borderColor: "white",
              cursor: "pointer",
            }}
            onClick={handleChangeAvatar}
          />
          <CardContent sx={{ maxWidth: 600, margin: "auto" }}>
            <Typography gutterBottom variant="h5" component="div">
              {userData.name} {userData.lastName}
            </Typography>
            <CardActions sx={{ justifyContent: "end" }}>
              {/* <Button variant="Text" size="small">
                Редактировать профиль
              </Button>
              <Button variant="Text" size="small">
                Ещё
              </Button> */}
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
