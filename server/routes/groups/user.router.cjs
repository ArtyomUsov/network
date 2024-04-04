const { Router } = require("express");
const UserController = require('../../controllers/User.controller.cjs')
const router = new Router();

router.get("/", UserController.getCurrentUser);

router.get("/:id", UserController.getById);

router.post("/", UserController.create);

router.put("/", UserController.update);

router.delete("/", UserController.delete);

module.exports = router;
