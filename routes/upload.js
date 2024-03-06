const { Router } = require("express");
const multer = require("multer");

const router = Router();
const controller = require("../controllers/upload.js");

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads/avatars");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.post("/avatar", upload.single("avatar"), controller.avatar);

module.exports = router;
