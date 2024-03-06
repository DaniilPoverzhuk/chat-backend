const { Router } = require("express");
const router = Router();

const controller = require("../controllers/auth.js");
const validation = require("../validation/auth.js");

router.post("/login", validation.login(), controller.login);

router.post(
  "/registration",
  validation.registration(),
  controller.registration
);

router.get("/logout", controller.logout);

module.exports = router;
