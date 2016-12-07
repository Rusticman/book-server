const BookUser = require('../model/book_user');

module.exports = function(req, res, next){


BookUser.find({},{"booksIOwn":1,"_id":0}, function(err,results){

  if(err){
    console.error('there was an error getting all the books.')
    throw err;
  }
const allBooksArray = [];

results.forEach((elem) => {

elem.booksIOwn.forEach((books) => {

  allBooksArray.push(books)
})
})

  res.status(200).send({success:true, allBooks:allBooksArray})
})

}
