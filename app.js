var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { Authenticate } = require("./routes/AuthenticationRoute");
const { router } = require("./routes/AuthenticationRoute");
const Budget = require("./routes/BudgetRoute");
var app = express();

//cors setting
app.use(cors());
//db
mongoose.connect(process.env.DatabaseConnectionString)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>res.send('Backend App'))
// routes
app.use("/expensetracker/api/auth", router);
app.use("/expensetracker/api/budget", Authenticate, Budget);
// catch 404 and forward to error handler

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
