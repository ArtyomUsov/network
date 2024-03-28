const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  res.status(200).send(`get`);
});

router.post("/", (req, res) => {
  res.status(200).send(`post`);
});

router.put("/", (req, res) => {
  res.status(200).send(`put`);
});

router.delete("/", (req, res) => {
  res.status(200).send(`delete`);
});

module.exports = router;
