const { Router } = require("express");
const router = new Router();
const routerUser = require("./groups/user.router.cjs");
const routerAuth = require("./groups/auth.router.cjs");
const validateAuth = require("../middlewares/auth/index.cjs");

router.use("/user",
 validateAuth,
  routerUser);
router.use("/auth", routerAuth);

module.exports = router;
