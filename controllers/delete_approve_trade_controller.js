BookUser = require('../model/book_user');


module.exports = function(req, res, next){

  const index = req.body.index;
  const requestID = req.body.requestID;
  const title = req.body.title;
  const id = req.body.id;

  BookUser.findById(id, (err, user) => {

    if(err){
      console.error('there was an error finding the user in DB');
      throw err;
    }

    user.booksAwaitingMe.splice(index,1);

    user.save((err) => {
      if(err){
        console.error('there was an error saving new user data');
        throw err;
      }

      BookUser.findById(requestID, (err, requester) => {
        if(err){
          console.error('there was an error finding the requestID in DB');
          throw err;
        }

        requester.booksAwaitingOwner.forEach((elem,i) => {

          if(elem.title === title){
            requester.booksAwaitingOwner.splice(i, 1);
          }
        })

        requester.save((err) => {
          if(err){
            console.error('there was an error saving requester data');
            throw err;
          }
          return res.status(200).send({success:true, data:user.booksAwaitingMe})
        })
      })
    })
  })
}
