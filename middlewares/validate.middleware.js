const jwt = require("jsonwebtoken");

function validateUser(req, res, next) {
  const jwtSecret = process.env.JWT_SECRET;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({
      message: "Authentication Error!!",
    });
  } else {
    jwt.verify(token, jwtSecret, (error, decodedString) => {
      if (error) {
        res.status(401).send("redirect to login");
      } else {
        const username = decodedString.user;
        const id = decodedString.id;
        req.username = username;
        req.id = id;
        next();
      }
    });
  }
}

module.exports = { validateUser };
