BookUser = require('../model/book_user');


module.exports = function(req, res, next){

  const id = req.params.id;

  BookUser.findById(id, (err, user) => {

    if(err){
      console.error("there was an error retrieving your data");
      throw err;
    }

    return res.status(200).send({success:true,
                                 myBooks:user.booksIOwn,
                                 booksIGot:user.booksIGot,
                                 booksGivenAway:user.booksGivenAway
                               });
  })
}
