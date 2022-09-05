const jwt = require("jsonwebtoken");

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userData = decodedToken;
    const userId = decodedToken.id;
    if (req.body.userId && req.body.userId !== userId) {
      throw new Error("Invalid User ID");
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
