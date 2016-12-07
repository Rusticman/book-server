const BookUser = require('../model/book_user');


module.exports = function(req, res, next){
const ownerID = req.body.ownerID;//book owner's id
const id = req.body.id; //user's id
const book = req.body.book; //book obj

BookUser.findById(id, (err, user) => {
  if(err){
    console.error('there was an error finding the current user in the DB')
    res.status(500).send({success:false})
    throw err;
  }


  book.requestID = id; //ensures we know who wants the book

  user.booksAwaitingOwner.push(book);

  user.save((err) => {
    if(err){
      console.error('there was an error saving user info in DB');
      res.status(500).send({success:false})
      throw err;
    }

    BookUser.findById(ownerID, function(err,owner){//find book owner
      if(err){
        console.error('there was an error finding the owner of the book.')
        res.status(500).send({success:false})
        throw err;
      }

    owner.booksAwaitingMe.push(book);//push book into 'awaiting my approval' array

    owner.save((err) => {
      if(err){
        console.error('there was an error saving new user info')
        res.status(500).send({success:false})
        throw err;
      }

      return res.status(200).send({success:true, data:user.booksAwaitingOwner})
    })


    })


  })
})





}
