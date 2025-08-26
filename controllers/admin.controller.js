const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/mailer");

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    if (!["admin", "user"].includes(role))
      return res.status(400).json({
        message: 'Invalid role. Role must be either "admin" or "user".',
      });
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { userId: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY
      }
    );

    const templateName = role === "admin" ? "adminSignup" : "userSignup";
    await sendMail(email, templateName, {
      name: admin.firstName,
      email,
    });

    res.status(201).json({ message: "Admin created", admin, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const admin = await User.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Unregistered email exists" });

    const isMatch = bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Password not match" });

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    const templateName = role === "admin" ? "adminLogin" : "userLogin";
    await sendMail(email, templateName, {
      name: admin.firstName,
      email,
    });

    res.status(201).json({ message: "Loged in successful", admin, token });
  } catch (error) {
    console.log(`An error occure ${error.message}`);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
