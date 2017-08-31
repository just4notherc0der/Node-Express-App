const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');

// database connection
mongoose.connect('mongodb://localhost/nodeapp', {
  useMongoClient: true
});
const db = mongoose.connection;

// check database connection
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// check for database errors
db.on('error', (err) => {
  console.log(err);
});

// load models
const Article = require('./models/article');

// create the app
const app = express();

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: `${ __dirname }/views/layouts`
}));
app.set('view engine', 'hbs');

// index route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {
    if(err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Articles',
        articles
      });
    }
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
