const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    //roles array coming from jwt compared with allowed roles
    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);
    //new boolean array that tells which roles are allowed=>those allowed are stored in result
    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((val) => val === true);
    //if no role allowed
    if (!result) return res.sendStatus(401);

    next();
  };
};

module.exports = verifyRoles;
