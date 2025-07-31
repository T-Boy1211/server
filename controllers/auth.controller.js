const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(401).json({ message: 'Already have an account' })
  }
  const hashedPassword = await bcrypt.hash( password,  10 );
  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
  res.status(201).json({ user, token });
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    const isMatch = await bcrypt.compare( password, user.password );
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password'})
    }
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    res.status(200).json({ user, token, message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}