const BookUser  = require('../model/book_user');

module.exports = function(req,res,next){

  const id = req.body.id;
  const index = req.body.index;
  const bookName = req.body.title;
  const ownerID = req.body.ownerID;

  BookUser.findById(id, function(err, user){

    if(err){
      console.error('there was an error finding user in DB');
      throw err;
    }

    user.booksAwaitingOwner.splice(index, 1);

    user.save((err) => {

      if(err){
        console.error('there was an error saving DB changes')
        throw err;
      }

      BookUser.findById(ownerID, function(err, owner){

        if(err){
          console.error('there was an error finding book owner')
          throw err;
        }

        owner.booksAwaitingMe.forEach((elem,i) => {

          if(elem.title === bookName){
            owner.booksAwaitingMe.splice(i, 1);
          }
        })

        owner.save((err) => {

          if(err){
            console.error('there was an error saving DB changes')
            throw err;
          }

          res.status(200).send({success:true, data:user.booksAwaitingOwner})
        })
      })
    })

  })
}
