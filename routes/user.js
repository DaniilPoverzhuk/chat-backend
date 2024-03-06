const { Router } = require("express");
const router = Router();

const validation = require("../validation/user.js");
const controller = require("../controllers/user.js");
const authMiddleware = require("../middleware/auth.js");

router.use(authMiddleware);

router.get("/getAll", validation.getAll(), controller.getAll);

module.exports = router;
