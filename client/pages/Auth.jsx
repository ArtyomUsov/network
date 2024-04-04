import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    lastName: "",
    email: "",
    login: "",
    password: "",
  });
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: registerData.login,
          password: registerData.password,
        }),
      });
      const data = await response.json();
      localStorage.setItem("token", data);
      // console.log(localStorage.getItem("token"));
      // console.log(data);

      navigate("/api/main");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerData.name,
          lastName: registerData.lastName,
          email: registerData.email,
          login: registerData.login,
          password: registerData.password,
        }),
      });
      if (!response.ok) {
        console.log(response);
        throw new Error("Возникла ошибка при создании пользователя");
      } else {
        console.log("Вы успешно зарегистрировались");
        setRegisterData({
          name: "",
          lastName: "",
          email: "",
          login: "",
          password: "",
        });
      }
      setIsLoginFormVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const loginForm = (
    <>
      <TextField label="Логин" name="login" value={registerData.login} onChange={handleChange} />
      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={registerData.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="success" onClick={handleLogin}>
        Войти
      </Button>
      <Button variant="text" color="success" onClick={() => setIsLoginFormVisible(false)}>
        Не зарегистрировались?
      </Button>
    </>
  );

  const registerForm = (
    <>
      <TextField label="Имя" name="name" value={registerData.name} onChange={handleChange} />
      <TextField label="Фамилия" name="lastName" value={registerData.lastName} onChange={handleChange} />
      <TextField label="Электронная почта" name="email" value={registerData.email} onChange={handleChange} />
      <TextField label="Логин" name="login" value={registerData.login} onChange={handleChange} />
      <TextField
        type="password"
        label="Пароль"
        name="password"
        value={registerData.password}
        onChange={handleChange}
      />
      <TextField
        type="password"
        label="Повторите пароль"
        name="repeat password"
        value={registerData.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="success" onClick={handleRegister}>
        Зарегистрироваться
      </Button>
      <Button variant="text" color="success" onClick={() => setIsLoginFormVisible(true)}>
        Войти
      </Button>
    </>
  );

  return (
    <Box sx={{ pt: 4 }}>
      <Box sx={{ m: "auto", p: 4, display: "grid", gap: 1, maxWidth: 400, border: "2px solid grey", borderRadius: 3 }}>
        <Typography variant="h1" gutterBottom>
          Network
        </Typography>
        {isLoginFormVisible ? loginForm : registerForm}
      </Box>
    </Box>
  );
};

export default Auth;
