const user = require("../models/user.model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.json");

class AuthController {
  static async auth(req, res) {
    const { login, password } = req.body;
    const foundUser = await user.findOne({ login });
    if (!foundUser) {
      return res.json("Пользователь с таким логином не найден");
    }
    const validate = bcrypt.compareSync(password + SECRET_KEY, foundUser.password);
    if (!validate) {
      return res.json("Неверный пароль");
    }
    console.log("Авторизация прошла успешно");
    const newToken = jwt.sign(
      {
        name: foundUser.name,
        lastName: foundUser.lastName,
        login: foundUser.login,
      },
      SECRET_KEY
    );

    res.json(`Bearer ${newToken}`);
  }
}

module.exports = {
  auth: AuthController.auth,
};
