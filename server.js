const express = require('express');
const path = require('path');
// create the app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// index route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Articles'
  });
});

// add articles route
app.get('/articles/add', (req, res) => {
  res.render('add', {
    title: 'Add'
  });
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
