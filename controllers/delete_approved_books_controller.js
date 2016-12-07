BookUser = require('../model/book_user');

module.exports = (req, res, next) => {

  const id = req.body.id;
  const index = req.body.index;
  const boolean = req.body.boolean

  BookUser.findById(id, (err, user) => {
    if(err){
      console.error('there was an error finding the user in DB');
      throw err;
    }
    if(boolean){//if true, remove from booksGivenAway
      user.booksGivenAway.splice(index, 1);
    }
    else{
      user.booksIGot.splice(index, 1);
    }

      user.save(err => {
        if(err){
          console.error('there was an error saving user new details');
          throw err;
        }
        if(boolean){
          return res.status(200).send({success:true, booksGivenAway:user.booksGivenAway});
        }
        else{
          return res.status(200).send({success:true, booksIGot:user.booksIGot});
        }
      })


  })
}
