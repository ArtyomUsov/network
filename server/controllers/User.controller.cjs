const user = require("../models/user.model.cjs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config.json");

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
      const newUser = await user.create({
        name,
        lastName,
        login,
        password,
        email,
        avatar,
      });
      res.json(newUser);
    } catch (error) {
      console.log(error);
      res.json("create error");
    }
  }
  static async update(req, res) {}
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
