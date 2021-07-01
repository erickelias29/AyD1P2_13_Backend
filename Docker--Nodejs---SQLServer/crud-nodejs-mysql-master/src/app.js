const express = require('express'),
      path = require('path'),
      morgan = require('morgan')

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 80);


// middlewares
app.use(morgan('dev'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
var server = app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});

module.exports = server