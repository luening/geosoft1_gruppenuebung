var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var addRouter = require('./routes/add');
var showRouter = require('./routes/show');
var deleteRouter = require('./routes/delete');
var show_poiRouter = require('./public/javascripts/show_poi');

/*
var leafletcssRouter = require('./node_modules/leaflet/dist/leaflet.css')
var leafletjsRouter = require('./node_modules/leaflet/dist/leaflet.js')
var leafletDrawcssRouter = require('./node_modules/leaflet-draw/dist/leaflet.draw.css')
var leafletDrawjsRouter = require('./node_modules/leaflet-draw/dist/leaflet.draw.js')
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
app.use(express.static(path.join(__dirname, '/node_modules/leaflet/dist/leaflet.css')));
app.use(express.static(path.join(__dirname, '/node_modules/leaflet/dist/leaflet.js')));
app.use(express.static(path.join(__dirname, '/node_modules/leaflet-draw/dist/leaflet.draw.css')));
app.use(express.static(path.join(__dirname, '/node_modules/leaflet-draw/dist/leaflet.draw.js')));

app.use('/node_modules/leaflet/dist/leaflet.css', leafletcssRouter);
app.use('/node_modules/leaflet/dist/leaflet.js', leafletjsRouter);
app.use('/node_modules/leaflet-draw/dist/leaflet.draw.css', leafletDrawcssRouter);
app.use('/node_modules/leaflet-draw/dist/leaflet.draw.js', leafletDrawjsRouter);
*/

app.use('/', addRouter);
app.use('/show', showRouter);
app.use('/delete', deleteRouter);
app.use('/show_poi', show_poiRouter);


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
