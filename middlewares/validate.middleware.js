const validateSignup = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^\S+@\S+\.\S+$/;
  const passRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!passRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters long and contain a number and special character",
    });
  }

  next();
};

module.exports = validateSignup;
