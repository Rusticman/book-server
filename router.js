

const BookSearch = require('./controllers/book_search_controller');//uses google book search to find books to add to books you own
const Auth0Login = require('./controllers/login_controller');
const AddBooks = require('./controllers/add_books_controller');//adding books to list you own
const AllBooks = require('./controllers/all_books_controller'); //grabs every book in the DB
const RequestBook = require('./controllers/request_book_controller');//handles book request. adds book to owner's 'confirm list' and user 'awaiting confirmation list'
const AllRequests = require('./controllers/all_requests_controller');//grabs all books the user has requested
const DeleteTradeRequest = require('./controllers/delete_trade_request_controller'); //deletes trade request from user and owner DB
const BooksAwaitingMyApproval = require('./controllers/all_books_awaiting_me_controller'); //books awaiting my approval for other user to have
const DeleteBookApprovalRequest = require('./controllers/delete_approve_trade_controller'); //denies approval to other user for book
const MyBooks = require('./controllers/my_books_controller'); //grabs all user's books
const DeleteUserBook = require('./controllers/delete_book_controller'); //deletes a single book from user's 'I own' collection
const AddDetails = require('./controllers/details_controller');//this adds email address and location which are required
const RequestApproved = require('./controllers/request_approved_controller'); //owner agrees to trade book and details of requester and owner saved in book obj
const DeleteApprovedBook = require('./controllers/delete_approved_books_controller');


const passportService = require('./services/passport');//necessary for passport to work
const passport = require('passport');

//this allows passport strategies to be used for authenticating user for protected routes (middleware)
const requireAuth = passport.authenticate('jwt',{session:false});

module.exports = function(app){

  app.get('/search/books/:book',BookSearch);
  app.post('/auth/login', Auth0Login);
  app.post('/add/books', requireAuth, AddBooks);
  app.get('/all/books',AllBooks);
  app.post('/request/book',requireAuth, RequestBook);
  app.get('/all/trade/requests/:id',requireAuth,AllRequests);
  app.get('/all/other/requests/:id',requireAuth,BooksAwaitingMyApproval);
  app.post('/delete/trade/request', DeleteTradeRequest);
  app.post('/delete/approval/request',requireAuth, DeleteBookApprovalRequest);
  app.get('/users/books/:id', MyBooks);
  app.post('/delete/users/book',requireAuth, DeleteUserBook);
  app.post('/add/details', requireAuth, AddDetails);
  app.post('/request/approved', requireAuth, RequestApproved);
  app.post('/delete/approved/book',requireAuth,DeleteApprovedBook);
}
