const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const adminRoutes = require('./routes/admin.route');
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => console.log('DB Connected'))
  // .then(() => console.log('Connected to MongoDB'))
  // .catch((err) => console.error('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Smart device running on port ${port}`);
});