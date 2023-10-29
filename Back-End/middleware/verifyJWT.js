const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  //get user from jwt token and add id to req objj
  const authHeader = req.headers.authorization || req.headers.Authorization;
  //check if header received

  console.log("authheader", authHeader); //bearer token
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //toekn received but invalid
    req.user = decoded.UserInfo.username;
    req.roles = decoded.UserInfo.roles;
    req.userId = decoded.UserInfo.userId;
    next();
  });
};
module.exports = verifyJWT;
