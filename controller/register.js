const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

exports.register = async (req, res) => {
  const { name, surname, email, password, role } = req.body;

  try {
    const userExists = await UserModel.findUserByEmail(email);

    if (userExists.length > 0) {
      return res
        .status(400)
        .json({ error: "Email already there, No need to register again." });
    }

    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Server error" });
      }

      try {
        await UserModel.insertUser(name, surname, email, hash, role);
        const token = jwt.sign({ email }, process.env.SECRET_KEY);
        res
          .status(200)
          .json({ message: "User added to database, not verified", token });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error while registering user!" });
  }
};
