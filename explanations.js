/*

{{  }} - text only
{{{ body }}} - also renders HTML, HAS TO BE body

$mongo
>show dbs - shows available databases
>use nodeapp - creates new database named nodeapp
>db.createCollection('articles'); - creates articles collection
>show collections - shows collections in current database
>db.articles.insert({
  title: "Article One",
  author: "Imaginary Friend",
  body: "Lorem Ipsum..."
}); - inserts a new article (ids are created automatically)
>db.articles.find(); - shows all articles
>db.articles.find().pretty(); - same but looks little nicer

mongoose - ORM for mongodb, it gives it structore by allowing us to create model

*/
