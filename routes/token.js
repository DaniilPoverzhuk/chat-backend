const { Router } = require("express");
const router = Router();

const controller = require("../controllers/token.js");

router.post("/update", controller.update);
router.get("/check", controller.check);

module.exports = router;
