// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const User = require('./models/user.model');

// const createAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.DB_URI);
//     console.log('✅ Connected to MongoDB');

//     const email = 'ayanwolavictor1211@gmail.com';
//     const password = 'OmoAyan$12';
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const adminExists = await User.findOne({ email });
//     if (adminExists) {
//       console.log('❌ Admin already exists');
//       process.exit();
//     }

//     const admin = await User.create({
//       firstName: 'VictorKing',
//       lastName: 'Lion',
//       email,
//       password: hashedPassword,
//       role: 'admin',
//     });

//     if (!admin) {
//       console.log('❌ Failed to create admin');
//       process.exit();
//     }
//     const generateAuthToken = () => {
//       const token = jwt.sign(
//         { _id: admin._id, email: admin.email, role: admin.role },
//         process.env.JWT_SECRET,
//         {
//           expiresIn: "1h",
//         }
//       );
//       return token;
//     };
//     console.log(`✅ Admin created: ${(admin.email, generateAuthToken())}`);
//     process.exit();
//   } catch (error) {
//     console.error('❌ Error creating admin:', error.message);
//     process.exit(1);
//   }
// };

// createAdmin();
