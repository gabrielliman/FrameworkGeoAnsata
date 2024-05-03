const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const acessToken = req.cookies["accessToken"];
  if (!acessToken) {
    return res
      .status(401)
      .json({ error: "User not Authenticated!", cookie: req.cookies });
  }
  try {
    const validToken = verify(acessToken, process.env.SECRET_KEY);
    if (validToken) {
      req.user = validToken;
      return next();
    }
  } catch (err) {
    res.clearCookie("accessToken")
    return res.status(401).json({ error: err });
  }
};
module.exports = { validateToken };
