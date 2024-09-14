const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const sellerRoutes = require('./routes/seller');
const customerRoutes = require('./routes/customer');
const guestRoutes = require('./routes/guest');
const cors = require('./middlewares/CORS');
const errorHandler = require('./middlewares/error-handler');
const resourceNotFoundHandler = require('./middlewares/notfound');
const { storage } = require('./utilities/image-upload');

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(cors);
app.use('/auth', authRoutes);
app.use('/seller', sellerRoutes);
app.use('/customer', customerRoutes);
app.use('/guest', guestRoutes);
app.use(userRoutes);
app.use(resourceNotFoundHandler);
app.use(errorHandler);
mongoose.connect(process.env.DATABASE_URL).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
  });
});
