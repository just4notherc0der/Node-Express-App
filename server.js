const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');

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

// load Article model
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

// express session
app.use(session({
  secret: '63421somethingrandom',
  resave: true,
  saveUninitialized: true
}))

// express validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.');
    let root = namespace.shift();
    let formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param: formParam,
      msg,
      value
    };
  }
}));

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


// articles routes
let articles = require('./routes/articles');
app.use('/articles', articles);

// users routes
let users = require('./routes/users');
app.use('/users', users);


// start the server
app.listen(3000, () => console.log('Server started on port 3000'));
