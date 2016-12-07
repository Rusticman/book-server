BookUser = require('../model/book_user');

module.exports = (req, res, next) => {
  const id = req.body.id;
  const index = req.body.index;console.log('id',id, 'index',index);

  BookUser.findById(id, (err, user) => {
    if(err){
      console.error('there was an error finding the user in the DB');
      throw err;
    }//stuff

    const userBook = user.booksAwaitingMe[index];
    const requesterBook = user.booksAwaitingMe[index];//create same book obj
    const bookTitle = user.booksAwaitingMe[index].title;

    user.booksAwaitingMe.splice(index, 1);//remove book obj awaiting approval

    const requesterID = userBook.requestID;

    BookUser.findById(requesterID, (err, requester) => {//find requester
      if(err){
        console.error('there was an error finding the requester');
        throw err;
      }console.log('requester',requester);

      requester.booksAwaitingOwner.forEach((elem,i) => {
        if(bookTitle === elem.title && id === elem.owner){
          requester.booksAwaitingOwner.splice(i, 1);
        }
      })

      userBook.requesterEmail = requester.email;
      userBook.requesterLocation = requester.location;
      userBook.requesterName = requester.userName;
      user.booksGivenAway.push(userBook);//add requester details to book and push

      requesterBook.ownerEmail = user.email;
      requesterBook.ownerLocation = user.location;
      requesterBook.ownerName = user.userName;
      requester.booksIGot.push(requesterBook);//add owner details and push into new owners array

      user.save(err => {
        if(err){
          console.error('there was an error saving user details');
          throw err;
        }

        requester.save(err =>  {
          if(err){
            console.error('there was an error saving the requesters details');
            throw err;
          }
        return res.status(200).send({success:true, booksAwaitingApproval:user.booksAwaitingMe, booksGivenAway:user.booksGivenAway})
        })
      })

    })

//save later maybe

  })

}
