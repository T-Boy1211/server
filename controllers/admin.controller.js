const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const sendMail = require('../utils/mailer');

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    if (!['admin', 'user'].includes(role))
      return res
        .status(400)
        .json({
          message: 'Invalid role. Role must be either "admin" or "user".',
        });
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const templateName = role === 'admin' ? 'adminSignup' : 'userSignup';
    await sendMail(email, templateName, {
      name: firstName,
      email,
    });

    res.status(201).json({ message: 'User created', user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const isMatch = await bcrypt.compare(password);
    if (!isMatch) return res.status(400).json({ message: ''})

    const token = jwt.sign(
      { userId: user._id, email: user.email, role:  user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const templateName = role === 'admin' ? 'adminLogin' : 'userLogin';
    await sendMail(email, templateName, {
      name: firstName,
      email,
    });

    res.status(201).json({ message: 'Loged in successful', user, token });
  } catch (error) {
    console.log(`An error occure ${error.message}`);
    
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};