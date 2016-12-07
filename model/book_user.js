const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//define model
const bookUser = new Schema({
  userName:String,
  location:String,
  email:String,
  booksIOwn:[],
  booksAwaitingOwner:[],
  booksAwaitingMe:[],
  booksIGot: [],
  booksGivenAway: [],
  facebook : {
      "id"    : String
            },
    twitter : {
        "id"   : String
      },
  messages:{}
})


const ModelClass = mongoose.model('bookUser',bookUser);

module.exports = ModelClass;
