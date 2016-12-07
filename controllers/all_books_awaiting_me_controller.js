const BookUser = require('../model/book_user');


module.exports = function(req, res, next){

const id = req.params.id; //user's id

BookUser.findById(id, function(err,user){//find book owner
  if(err){
    console.error('there was an error finding the owner of the books.')
    throw err;
  }

return res.status(200).send({success:true, data:user.booksAwaitingMe});
})
}
