const express = require("express");
const router = express.Router();const cleanBody = require("../middlewares/cleanbody");
const AuthController = require("../users/user.controller");
router.post("/signup", cleanBody, AuthController.Signup);
router.post('/login', cleanBody, AuthController.Login)
module.exports = router;