// load npm modules
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// make new express app
var app = express();

// register partials from hbs
hbs.registerPartials(__dirname + '/views/partials');
// app.set for express config as a key want to set + value want to use
// telling that the hbs is the view engine we'll use
app.set('view engine', 'hbs');

// express middleware for server log
app.use((req, res, next) => {
  // create a log to function track the date and type of request
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  // write the log to a file
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// express middlaware for maintence mode
// uncomment to use
// app.use((req, res, next) => {
//   res.render('maintenance.hbs'); 
//   pageTitle: 'Maintenance Mode'
// });

// express middleware for reading an static folder
app.use(express.static(__dirname + '/public'));

// hbs helper to pass date function to all templates
hbs.registerHelper('getCurrentYear',  () => {
  return new Date().getFullYear()
});

// hbs helper for capitalization
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// http handlers
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Site',
    welcomeMessage: 'Welcome to my super Node App',
  });
});

// create another page - route
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

// create a bad route for when a request fails
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: `Can't connect.`
  });
});

// bind the app to a port on our machine, for local
app.listen(3000, () =>{
  console.log('Server is up on port 3000');
});