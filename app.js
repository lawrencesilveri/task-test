const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const mongoose = require('mongoose');
const config = require('./config/config');
// connect to DB
mongoose.connect(
  config.database,
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected successfullyl!`);
});
// Routes list
const postsRouter = require('./routes/api/posts.routes');
// Init
const app = express();
// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.static(path.join(__dirname, 'public')));

// Application Routes
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api/posts', postsRouter);

module.exports = app;
