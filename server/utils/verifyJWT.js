import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({ error: "Session token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

export default verifyToken;
