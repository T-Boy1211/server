const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const validate = require("../middlewares/validate.middleware");
const User = require('../models/user.model');
// const verifyToken = require('../middlewares/auth.middleware');

router.post('/signup', validate, auth.signup);
router.post('/signin', auth.signin );
router.get("/users", User.find);

module.exports = router
