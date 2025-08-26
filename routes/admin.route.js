const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const verifyToken = require('../middlewares/auth.middleware');
const isAdmin = require('../middlewares/admin.middleware');
const addProduct = require('../controllers/product.controller');
const upload = require('../middlewares/upload.middleware');

router.post('/create-user', verifyToken, isAdmin, adminController.createUser);
router.post('/login', adminController.adminLogin);
router.get('/get-users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/dashboard', verifyToken, isAdmin);
router.post("/add-product", verifyToken, isAdmin, upload.single("image"), addProduct.addProduct);

module.exports = router;
