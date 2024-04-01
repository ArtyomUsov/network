const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config.json");

const validateAuth = (req, res, next) => {
  try {
    jwt.verify(req.headers.jwt, SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json("Вы не автаризованы");
  }
};

module.exports = validateAuth;
