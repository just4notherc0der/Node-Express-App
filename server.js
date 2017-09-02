const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

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

// single article
app.get('/article/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if(err) {
      console.log(err);
      return;
    } else {
      res.render('article', { article })
    }
  });
});

// add articles route
app.get('/articles/add', (req, res) => {
  res.render('add', {
    title: 'Add'
  });
});

app.post('/articles/add', (req, res) => {
  let article = new Article;
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  })
});

// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
