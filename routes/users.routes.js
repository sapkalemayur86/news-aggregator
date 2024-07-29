const express = require("express");
const router = express.Router();

const { createUser,loginUser,getPreferences } = require("../controllers/user.controller");
const { validateUser } = require("../middlewares/validate.middleware");

router.post("/login",loginUser);

router.post("/register",createUser);

router.get("/preferences",validateUser,getPreferences);

module.exports =router;