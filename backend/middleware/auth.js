const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("No token");
  }

  try {
    const token = authHeader.split(" ")[1]; // ✅ important
    const decoded = jwt.verify(token, "secretkey");

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json("Invalid token");
  }
};