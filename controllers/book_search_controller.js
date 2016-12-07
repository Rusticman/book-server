const BookUser = require('../model/book_user');
const books = require('google-books-search');

module.exports = function(req, res, next){
const bookQuery = req.params.book;

books.search(bookQuery, function(err,results){

  const resultsArray = [];

if(results !== undefined){

  results.forEach((elem) => {
    const obj = {};
    obj.title = elem.title;
    obj.authors = [];
    elem.authors.forEach((author) => obj.authors.push(author))
    obj.link = elem.link;
    obj.thumbnail = elem.thumbnail;
    resultsArray.push(obj);
  });
  return res.status(200).send({success:true, data:resultsArray})
}
else{
  return res.status(200).send({success:true, data:[]})//no results
}
});


}
