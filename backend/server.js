require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/', express.static(path.join(__dirname, '../frontend/dist/')));
app.use('/dist', express.static(path.join(__dirname, '../landingpage/dist')));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/skateparks', require('./routes/skateparkRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.use(errorHandler);

app.listen(process.env.PORT || 5000, () => console.log('Server started'));
