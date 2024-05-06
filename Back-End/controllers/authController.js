const User = require("../model/User");
const Doctor = require("../model/Doctor");
const Patient = require("../model/Patient");
const Hospital = require("../model/Hospital");
const Admin = require("../model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.jwt) {
    console.log("cookies found", cookies);
  }

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and Password are required!" });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.status(401).json({ message: "user not found" }); //unauthorized user

  //evaulte password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    const username = foundUser.username;
    const userId = foundUser._id;
    //create jwts
    const accessToken = jwt.sign(
      //***use user id
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
          userId: foundUser._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const newRefreshToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles: roles,
          userId: foundUser._id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    const newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
    if (cookies?.jwt) {
      console.log("prev cookie clearing");
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None" }); //secure:true for production for https
    }

    //save refresh token in db to invalidate refresh token when user logs out
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();
    //storing in cookie
    console.log("new cookie set at login ");
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true, // Set the "secure" attribute to true
      maxAge: 24 * 60 * 60 * 1000, // One day
    });
    return res.json({ userId, roles, accessToken });
  } else {
    return res.status(401).json({ message: "Password Incorrect" });
  }
};

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //no content
  const refreshToken = cookies.jwt;

  //is refreshtoken in db?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return res.sendStatus(204); //successful but no content
  }

  //delete refreshtoken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  const result = await foundUser.save();
  console.log(result);

  //delete cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" }); //secure:true for production for https
  res.sendStatus(204);
};

const handleNewUser = async (req, res) => {
  const { email, username, password, firstname, lastname, roles } = req.body;
  if (!email || !username || !password || !firstname || !lastname)
    return res
      .status(400)
      .json({ message: "Required fields have not been entered!" });
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate email" });
  try {
    //encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store new user
    console.log("roles in register?", roles);
    const result = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
      roles: roles,
      firstname: firstname,
      lastname: lastname,
      isDeleted: false,
      //default role and object id automatically given
    });
    console.log(
      "we sure can get the ID in the register controller",
      result._id
    );
    console.log(result);
    if (result) {
      let profile;
      if ("Patient" in roles) {
        console.log("User has the Patient role");
        profile = await Patient.create({ userId: result._id });
        result.profileId = profile._id;
      } else if ("Doctor" in roles) {
        console.log("User has doctor role");
        profile = await Doctor.create({ userId: result._id });
        result.profileId = profile._id;
      } else if ("Admin" in roles) {
        console.log("User has Admin role");
        profile = await Admin.create({ userId: result._id });
        result.profileId = profile._id;
      } else {
        console.log("User has no recognized role");
        // Handle the case where no recognized role is found
      }
      //Update the user with the profile ID
      await result.save();
      console.log("profile::", profile);
      return res.status(201).json({
        message: `New user ${username} created! You can now update the profile!`,
        result,
        profileId: profile._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data receiver" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleNewHospital = async (req, res) => {
  const {
    email,
    username,
    password,
    roles,
    contactNumber,
    regNumber,
    address,
  } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    !roles ||
    !contactNumber ||
    !regNumber ||
    !address
  )
    return res
      .status(400)
      .json({ message: "Required fields have not been entered!" });
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.status(409).json({ message: "Duplicate email" });
  try {
    //encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store new user
    console.log("roles in register?", roles);
    const result = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
      roles: roles,
      isDeleted: false,
      //default role and object id automatically given
    });
    console.log(
      "we sure can get the ID in the register controller",
      result._id
    );
    console.log(result);
    if (result) {
      let profile;
      profile = await Hospital.create({
        userId: result._id,
        isDeleted: false,
        address: address,
        contactNumber: contactNumber,
        regNumber: regNumber,
      });
      result.profileId = profile._id;
      await result.save();
      console.log("profile::", profile);
      return res.status(201).json({
        message: `New user ${username} created! You can now update the profile!`,
        result,
        profileId: profile._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const handleNewPatient = async (req, res) => {
  const {
    email,
    username,
    password,
    address,
    contactNumber,
    age,
    gender,
    eContactNumber,
    cnicNumber,
    bloodGroup,
    DOB,
    roles,
  } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    !roles ||
    !contactNumber ||
    !eContactNumber ||
    !address ||
    !cnicNumber ||
    !bloodGroup ||
    !DOB ||
    !age ||
    !gender
  )
    return res
      .status(400)
      .json({ message: "Required fields have not been entered!" });
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "An account with the provided email already exists" });
  try {
    //encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store new user
    console.log("roles in register?", roles);

    const result = await User.create({
      username: username,
      password: hashedPwd,
      email: email,
      isDeleted: false,
      roles: roles,
      //default role and object id automatically given
    });
    console.log(result._id);
    console.log(result);
    if (result) {
      let profile;
      profile = await Patient.create({
        userId: result._id,
        isDeleted: false,
        address: address,
        contactNumber: contactNumber,
        eContactNumber: eContactNumber,
        age: age,
        cnicNumber: cnicNumber,
        gender: gender,
        bloodGroup: bloodGroup,
        DOB: DOB,
      });
      result.profileId = profile._id;
      await result.save();
      console.log("profile::", profile);
      return res.status(201).json({
        message: `New user ${username} created! You can now update the profile!`,
        result,
        profileId: profile._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const handleNewDoctor = async (req, res) => {
  const {
    email,
    username,
    password,
    roles,
    address,
    licenseNumber,
    age,
    gender,
    cnicNumber,
    contactNumber,
    // hospitalAffiliation,
    DOB,
    // department,
    yearsOfExperience,
  } = req.body;
  if (
    !email ||
    !username ||
    !password ||
    !roles ||
    !contactNumber ||
    !licenseNumber ||
    !address ||
    !cnicNumber ||
    // !hospitalAffiliation ||
    !DOB ||
    // !department ||
    !yearsOfExperience
  )
    return res
      .status(400)
      .json({ message: "Required fields have not been entered!" });
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ message: "An account with the provided email already exists" });
  try {
    //encrypt password
    const hashedPwd = await bcrypt.hash(password, 10);
    //create and store new user
    console.log("roles in register?", roles);

    const result = await User.create({
      username: username,
      email: email,
      password: hashedPwd,
      roles: roles,
      isDeleted: false,
      //default role and object id automatically given
    });
    console.log(result._id);
    console.log(result);
    if (result) {
      let profile;
      profile = await Doctor.create({
        userId: result._id,
        isDeleted: false,
        address: address,
        contactNumber: contactNumber,
        licenseNumber: licenseNumber,
        age: age,
        cnicNumber: cnicNumber,
        gender: gender,
        yearsOfExperience: yearsOfExperience,
        DOB: DOB,
        // hospitalAffiliation: hospitalAffiliation,
        // department: department,
      });
      result.profileId = profile._id;
      await result.save();
      console.log("profile::", profile);
      return res.status(201).json({
        message: `New user ${username} created! You can now update the profile!`,
        result,
        profileId: profile._id,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data received" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  //if we have cookies then checking to see if we have jwt
  console.log("checking for cookies");
  if (cookies) {
    console.log("cookie found in refresh");
  }
  if (!cookies?.jwt) return res.status(401).json("no cookies"); //unauthorized cuz no cookie
  const refreshToken = cookies.jwt;
  //clear old cookie
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None" });

  const foundUser = await User.findOne({ refreshToken }).exec();

  //dectected refresh token reuse
  if (!foundUser) {
    //got a cookie but did not find user linked to the refresh token
    //hence we can say that the token was being reused
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        //error if we cant decode cuz it is expired
        if (err) return res.sendStatus(403); //forbidden
        const hackedUser = await User.findOne({
          username: decoded.UserInfo.username,
        }).exec();
        //deletes all refresh token if token found to be valid=>user will have to login again if accesstoken expires
        hackedUser.refreshToken = [];
        const result = await hackedUser.save();
        console.log(result);
      }
    );
    return res.sendStatus(403);
  }
  //need to remove the old token from rrefresh token array
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );
  //evaluate jwt->successfull and valid rf token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        //received token but is expired and is being replaced
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save();
        console.log(result);
      }
      if (err || foundUser.username !== decoded.UserInfo.username) {
        console.log(err);
        return res.sendStatus(403); //found user and refresh token but was an old one
      }

      //refresh token was still valid
      const roles = Object.values(foundUser.roles);
      const username = foundUser.username;
      const userId = foundUser._id;
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
            userId: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "3h" }
      );

      //set new rftoken
      const newRefreshToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: roles,
            userId: foundUser._id,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "5d" }
      );
      //save refresh token in db to invalidate refresh token when user logs out
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();
      console.log(result);
      //storing in cookie
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true, // Set the "secure" attribute to true
        maxAge: 24 * 60 * 60 * 1000, // One day
      });
      return res.json({ userId, roles, accessToken });
    }
  );
};

module.exports = {
  handleRefreshToken,
  handleNewUser,
  handleLogout,
  handleLogin,
  handleNewDoctor,
  handleNewHospital,
  handleNewPatient,
};
