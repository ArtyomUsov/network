import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Auth = () => {
  const [loginData, setLoginData] = useState({
    login: "",
    password: "",
  });
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = () => {
    // Реализуйте отправку данных на сервер для авторизации
  };

  const handleRegister = () => {
    // Реализуйте отправку данных на сервер для регистрации
  };

  const loginForm = (
    <>
      <TextField label="Login" name="login" value={loginData.login} onChange={handleChange} />
      <TextField type="password" label="Password" name="password" value={loginData.password} onChange={handleChange} />
      <Button variant="contained" color="success" onClick={handleLogin}>
        Login
      </Button>
      <Button variant="text" color="success" onClick={() => setIsLoginFormVisible(false)}>
        Not registered?
      </Button>
    </>
  );

  const registerForm = (
    <>
      <TextField label="Name" name="name" value={""} onChange={handleChange} />
      <TextField label="Last Name" name="lastName" value={""} onChange={handleChange} />
      <TextField label="Email" name="email" value={""} onChange={handleChange} />
      <TextField label="Login" name="login" value={loginData.login} onChange={handleChange} />
      <TextField type="password" label="Password" name="password" value={loginData.password} onChange={handleChange} />
      <TextField
        type="password"
        label="repeat password"
        name="repeat password"
        value={loginData.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="success" onClick={handleRegister}>
        Register
      </Button>
      <Button variant="text" color="success" onClick={() => setIsLoginFormVisible(true)}>
        Log in
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
