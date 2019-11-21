var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
// make sure the controller for assignments is included
const assignmentsRouter = require('./controllers/assignments');

var app = express();

// mongo db connection code from class
// db.  try to connect and log a result (success / failure)
const mongoose = require('mongoose')
const globals = require('./config/globals')

mongoose.connect(globals.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    (res) => {
      console.log("I'm in")
    }
).catch(() => {
  console.log('Abort mission')
})

// code from class for configuring passport
// make the passport
app.use(session({
    secret:'mycr@zy$ecret$tring'
}))

// passport setup
app.use(passport.initialize())
app.use(passport.session())

// 3. link passport to our User model
const User = require('./models/user')
passport.use(User.createStrategy())

// 4. set up passport to read / write user data to the session object
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// googles proprietary auth stuff
const GoogleStrategy = require('passport-google-oauth20').Strategy
passport.use(new GoogleStrategy({
        clientID: globals.ids.google.clientID,
        clientSecret: globals.ids.google.clientSecret,
        callbackURL: globals.ids.google.callbackURL
    },
    (token, tokenSecret, profile, done) => {
        // do we already have a User document in MongoDB for this Google profile?
        User.findOne({oauthId: profile.id}, (err, user) => {
            if (err) {
                console.log(err) // error, so stop and debug
            }
            if (!err && user != null) {
                // Google already exists in our MongoDB so just return the user object
                done(null, user)
            }
            else {
                // Google user is new, register them in MongoDB users collection
                user = new User({
                    oauthId: profile.id,
                    username: profile.displayName,
                    oauthProvider: 'Google',
                    created: Date.now()
                })

                user.save((err) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        done(null, user)
                    }
                })
            }
        })
    }
))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// what should be the connection to my assignments controller that for some reason crashes the program
app.use('/assignments', assignmentsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
