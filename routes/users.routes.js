const express = require("express");
const router = express.Router();

const { createUser,loginUser,getPreferences,UpdatePreferences } = require("../controllers/user.controller");
const { validateUser } = require("../middlewares/validate.middleware");

router.post("/login",loginUser);

router.post("/register",createUser);

router.get("/preferences",validateUser,getPreferences);

router.put("/preferences",validateUser,UpdatePreferences);

module.exports =router;