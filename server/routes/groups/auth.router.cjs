const { Router } = require("express");
const authController = require("../../controllers/Auth.controller.cjs");
const router = new Router();

router.post("/", authController.auth);

module.exports = router;
