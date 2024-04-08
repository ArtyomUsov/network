const { Router } = require("express");
const UserController = require('../../controllers/User.controller.cjs')
const router = new Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/assets/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", UserController.getCurrentUser);

router.get("/:id", UserController.getById);

router.post("/", UserController.create);

router.put('/', upload.single('avatar'), UserController.update);

router.delete("/", UserController.delete);

module.exports = router;
