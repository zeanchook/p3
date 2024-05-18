const Data = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createJWT = (user) =>
  jwt.sign({ user }, process.env.SECRET, { expiresIn: "1h" });

const createUser = async (req, res) => {
  const { name, email, address, username, password, orders } = req.body;
  try {
    const user = await Data.User.create({
      name,
      email,
      address,
      username,
      password,
      orders,
    });
    const token = createJWT(user);
    res.status(201).json(token);
  } catch (error) {
    res.status(401).json({ error });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Data.User.findOne({ email });

  if (user === null) {
    res.status(401).json({ msg: "User not found" });
    return;
  }

  const match = await bcrypt.compare(password, user.password);
  console.log(password, user.password);
  console.log(match);

  if (match) {
    const token = createJWT(user);
    res.json(token);
  } else {
    res.status(401).json({ msg: "Password incorrect" });
  }
};

module.exports = {
  createUser,
  userLogin,
};
