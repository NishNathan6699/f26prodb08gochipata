
require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_CON;

// Connect to MongoDB Atlas
mongoose.connect(connectionString)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import Hiking Trail model
const HikingTrail = require('./models/hikingtrail');

// Add sample hiking trails to MongoDB
async function recreateDB() {
  try {
    // Delete existing hiking trails
    await HikingTrail.deleteMany({});

    // Create three hiking trails
    const trails = [
      {
        name: 'Mozingo Lake Trail',
        location: 'Maryville, Missouri',
        difficulty: 'Easy',
        length: 3.5
      },
      {
        name: 'Forest Trail',
        location: 'Missouri',
        difficulty: 'Moderate',
        length: 5.2
      },
      {
        name: 'Mountain Trail',
        location: 'Colorado',
        difficulty: 'Hard',
        length: 8.0
      }
    ];

    // Save all three trails to MongoDB
    await HikingTrail.insertMany(trails);

    console.log('Three hiking trails saved successfully');
  } catch (err) {
    console.error('Database seed error:', err);
  }
}

// Run the sample-data setup once after connecting
mongoose.connection.once('open', async () => {
  console.log('Database ready');

  // Set to false after the first successful run
 const reseed = false;

  if (reseed) {
    await recreateDB();
  }
});

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// LAB 13 PART 2 - Passport imports
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hikingtrailsRouter = require('./routes/hikingtrails');
var gridRouter = require('./routes/grid');
var pickRouter = require('./routes/pick');
var resourceRouter = require('./routes/resource');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// LAB 13 PART 2 - Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'development-only-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hikingtrails', hikingtrailsRouter);
app.use('/grid', gridRouter);
app.use('/selector', pickRouter);


console.log('Hiking trails route registered');
console.log('Resource router type:', typeof resourceRouter);
app.use('/resource', resourceRouter);

// LAB 13 PART 2 - Passport configuration
var Account = require('./models/account');

passport.use(new LocalStrategy(Account.authenticate()));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
