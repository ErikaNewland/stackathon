const express = require('express');
const path = require('path');
const db = require('./db');
const session = require('express-session');

const app = express();


// general purpose middleware
app.use(require('./middleware/logging'));
app.use(require('./middleware/body-parsing'));
app.use(express.static(path.join(__dirname, '../public')));

// configure and create our database store
// store session information on postgres database to restart without interrupting users
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });

dbStore.sync();  //DO WE WANT TO HAVE HTIS BEFORE 

//session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'a wildly insecure secret',
  store: dbStore,
  resave: false,
  saveUninitialized: true
}));

// app.use(require('./middleware/passport'));

// serve api routes
app.use('/api', require('./api')); // matches all requests to /api

// error handling
app.use(require('./middleware/error'));

// serve index.html for all non-api routes
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


// process.env.PORT for deploying to Heroku or 3000 for local
const port = process.env.PORT || 3000; 

// sync our database
db.sync() 
  .then(function(){
  	// then start listening with our express server once we have synced
    app.listen(port, function () {
	  console.log("Knock, knock");
	  console.log("Who's there?");
	  console.log(`Your server, listening on port ${port}`);
	}) 
  });

// app.listen(port, function(){
//   console.log('Your server, listeining on port', port)
// })