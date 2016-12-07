BookUser = require('../model/book_user');

module.exports = function(req, res, next){

  const location = req.body.location;
  const email = req.body.email;
  const id = req.body.id;

  BookUser.findById(id, (err, user) => {
    if(err){
      console.error('there was an error finding this user:', err);
      throw err;
    }

    user.email = email;
    user.location = location;

    user.save(err => {
      if(err){
        console.error('there was an error saving new user details:', err);
      }

      return res.status(200).send({success:true});
    })

  })
}
