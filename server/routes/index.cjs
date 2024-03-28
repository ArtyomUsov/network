const { Router } = require("express");
const router = new Router();
const routerUser = require('./groups/user.router.cjs')

router.use("/user", routerUser);

module.exports = router;
