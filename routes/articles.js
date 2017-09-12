const express = require('express');
const router = express.Router();

// load Article model
const Article = require('../models/article');

// edit article
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if(err) {
      console.log(err);
      return;
    } else {
      res.render('edit', { article })
    }
  });
});

router.post('/edit/:id', ensureAuthenticated, (req, res) => {
  const article = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body
  };

  const query = { _id: req.params.id };

  Article.update(query, article, (err) => {
    if(err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});


// add articles route
router.get('/add_article', ensureAuthenticated, (req, res) => {
  res.render('add_article', {
    title: 'Add'
  });
});

router.post('/add_article', (req, res) => {
  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('author','Author is required').notEmpty();
  req.checkBody('body','Body is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('add_article', {
      title:'Add Article',
      errors
    });
  } else {
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
    });
  }
});

// delete article
router.delete('/:id', (req, res) => {
  let query = { _id: req.params.id };

  Article.remove(query, function(err) {
    if(err) {
      console.log(err);
      return;
    } else {
      res.send('Success');
    }
  });
});

// single article
router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if(err) {
      console.log(err);
      return;
    } else {
      res.render('article', { article })
    }
  });
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
