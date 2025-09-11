const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Auth middleware hit");
  console.log("Headers:", req.headers.authorization);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No auth header or invalid format");
    return res.status(403).json({ message: "No authorization header" });
  }

  const token = authHeader.split(" ")[1];
  console.log("Token:", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded:", decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log("JWT verification failed:", err.message);
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = {
  authMiddleware,
};
