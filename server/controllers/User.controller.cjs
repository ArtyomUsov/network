const user = require("../models/user.model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.json");
const fs = require('fs');

class UserController {
  static async getAll(req, res) {
    try {
      const userList = await user.find();
      res.json(userList);
    } catch (error) {
      console.log(error);
      res.json("get error");
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, SECRET_KEY);
      const userLogin = decodedToken.login;
      const userData = await user.findOne({
        login: userLogin,
      });
      console.log(userData);
      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      const filteredUserData = {
        name: userData.name,
        lastName: userData.lastName,
        avatar: userData.avatar,
      };
      console.log(filteredUserData);
      return res.status(200).json({ userData: filteredUserData });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Произошла ошибка при получении пользователя" });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const userData = await user.findOne({
        _id: id,
      });
      res.json(userData);
    } catch (error) {
      console.log(error);
      res.json("getById error");
    }
  }
  static async create(req, res) {
    try {
      const { name, lastName, login, password, email, avatar } = req.body;
      const hashedPassword = bcrypt.hashSync(password + SECRET_KEY, 5);
      const newUser = await user.create({
        name,
        lastName,
        login,
        password: hashedPassword,
        email,
        avatar,
      });
      res.json(newUser);
    } catch (error) {
      console.log(error);
      res.json("create error");
    }
  }

  static async update(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, SECRET_KEY);
      const userLogin = decodedToken.login;

      const userData = await user.findOne({ login: userLogin });

      if (!userData) {
        return res.status(404).json({ message: "Пользователь не найден" });
      }
      if (req.file) {
        if (userData.avatar) {
          fs.unlinkSync(`src/assets/uploads/${userData.avatar}`);
        }
        userData.avatar = req.file.filename;
        await userData.save();
      }
      res.status(200).json({
        message: "Данные пользователя успешно обновлены",
        avatar: `src/assets/uploads/${req.file.filename}`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Произошла ошибка при обновлении данных пользователя" });
    }
  }

  static async delete(req, res) {}

  static async auth(req, res) {
    const { login, password } = req.body;
    const foundUser = await user.findOne({ login });
    if (!foundUser) {
      return res.json("rerror");
    }
    const validate = bcrypt.compareSync(password, foundUser.password);
    if (!validate) {
      return res.json("error");
    }
    const newToken = jwt.sign(
      {
        name: foundUser.name,
        lastName: foundUser.lastName,
        login: foundUser.login,
      },
      SECRET_KEY
    );

    res.json(newToken);
  }
}

module.exports = UserController;
