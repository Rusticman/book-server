BookUser = require('../model/book_user');

module.exports = function(req, res, next){

  const index = req.body.index;
  const id = req.body.id;

  BookUser.findById(id, (err, user) => {

    if(err){
      console.error('cannot find user in the DB');
      throw err;
    }

    user.booksIOwn.splice(index, 1);

    user.save((err) => {
      if(err){
        console.error('there was an error saving new data');
        throw err;
      }
      res.status(200).send({success:true, data:user.booksIOwn})
    })
  })
}
