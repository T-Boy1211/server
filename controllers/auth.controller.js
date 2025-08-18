const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendMail = require("../utils/mailer");
require("dotenv").config();

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(401).json({ message: 'Already have an account' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'user'
    });

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );

    const templateName = user.role === 'admin' ? 'adminSignup' : 'userSignup';
    await sendMail(user.email, templateName, {
      name: user.firstName,
      email: user.email,
    });

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY }
    );
    
    const templateName = user.role === 'admin' ? 'adminLogin' : 'userLogin';
    await sendMail(user.email, templateName, {
      name: user.firstName,
      email: user.email,
    });

    res.status(200).json({ message: "User logged in successfully", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.profile = async (req, res) => {
  const userExists = User.findById;
  const user = User(
    firstName,
    lastName,
    email,
    password,
  )
  if (userExists) return res.status(200).json({ user })
}