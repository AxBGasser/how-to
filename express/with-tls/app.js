const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const https = require('node:https') 
const  options = require('./ssl/options') 
require('dotenv').config({path: path.resolve(__dirname, './.env')})

// HTTPS_PORT=443
const HTTPS_PORT = process.env.HTTPS_PORT 

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const Error = require('./routes/error');

const app = express();
const server = https.createServer(options, app)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(Error.Catch404);

// error handler
app.use(Error.ErrorHandler);

server.listen(HTTPS_PORT,()=>{
  console.log("Server Running at https://bgasser.local")
})

module.exports = app;
