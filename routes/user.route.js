const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const validate = require("../middlewares/validate.middleware");
// const verifyToken = require('../middlewares/auth.middleware');

router.post('/signup', validate, auth.signup);
router.post('/login', auth.login );
router.get('/:username', auth.profile );

module.exports = router
