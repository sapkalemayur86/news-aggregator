const bcrypt = require("bcrypt");
const UserModel = require("../database/models/users.model");
const jwt = require("jsonwebtoken");

async function userRegistrationService(body) {
  try {
    const { username, password, preferences } = body;
    if (!username || !password)
      return res.status(400).send("Username and password required");

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      username,
      password: hashedPassword,
      preferences: preferences,
    });
    user.save();
    return {
      status: 201,
      message: "user created successfully with ID:" + user._id,
    };
  } catch (err) {
    throw new Error("USER NOT CREATED " + err.message);
  }
}

async function userloginService(body) {
  try {
    const { username, password } = body;
    if (!username || !password)
      return res.status(400).send("Username and password required");

    const foundUser = await UserModel.find({ username: username });
    const secret = process.env.JWT_SECRET;

    if (foundUser != null) {
      validatePassword = await bcrypt.compare(password, foundUser[0].password);
      if (validatePassword) {
        const payload = {
          id: foundUser[0]._id.toString(),
          user: foundUser[0].username,
        };

        const authToken = jwt.sign(payload, secret, { expiresIn: "1h" });
        return {
          status: 200,
          message: "Authentication Sucess!!",
          token: authToken,
        };
      }
    }

    return {
      status: 401,
      message: "Wrong Username or Password!",
    };
  } catch (err) {
    throw new Error("Error While Authentication: " + err.message);
  }
}

async function getUserPrefrences(body) {
  try {
    const { username } = body;
    const foundUser = await UserModel.find({ username: username });
    if (foundUser) {
      const userPrefrences = foundUser[0].preferences;
      if (userPrefrences) {
        return {
          status: 200,
          preferences: userPrefrences,
        };
      } else {
        return {
          status: 404,
          preferences: [],
        };
      }
    }

    return {
      status: 404,
      message: "User not found!",
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  userRegistrationService,
  userloginService,
  getUserPrefrences,
};
