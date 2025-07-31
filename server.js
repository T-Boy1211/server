const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.route');
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/user', userRouter);
// app.use('/admin', adminRouter);

mongoose.connect(process.env.DB_URI)
mongoose.connection.on('connected', () => console.log('DB Connected'))
  // .then(() => console.log('Connected to MongoDB'))
  // .catch((err) => console.error('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Smart device running on port ${port}`);
});