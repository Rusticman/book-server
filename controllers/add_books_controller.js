const BookUser = require('../model/book_user');

module.exports = function(req, res, next){
const id = req.body.id;
const bookData = req.body.bookData;


BookUser.findById(id, function(err,user){
  if(err){
    console.error('There was an error saving the books to the users account')
    throw err;
  }
  if(user === null){
    res.status(404).send({success:false})
  }

  if(user.location === null){
    return res.status(200).send({locationRequired:true})
  }
  bookData.forEach((elem) => {
    elem.location = user.location;
    elem.ownerEmail = user.email;
    elem.owner = id;
    user.booksIOwn.push(elem);
      })

  user.save(function(err){
    if(err){
      console.error('there was an error saving the data');
      throw err;
    }
    res.status(200).send({success:true,data:user.booksIOwn});
  })
})

}
