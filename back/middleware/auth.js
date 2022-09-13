// Importer	package token
const jwt = require("jsonwebtoken");

// Exporter	middleware
module.exports = (req, res, next) => {
  try {
    console.log("@@ AUTH");
    const token = req.headers.authorization.split(" ")[1]; // Récupérer token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Décoder token
    const userId = decodedToken.userId; // Récupérer id du user
    req.auth = { userId }; // Ainsi userId accessible dans le controlleur stuff
    if (req.body.userId && req.body.userId !== userId) {
      // Comparer	id du user
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
