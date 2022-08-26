const express = require("express");
const userRouter=express.Router();
const protectRoute = require('./authHelper');
// const {getUsers, getUserById, postUser, updateUser, deleteUser}=require('../controller/userController');
const {getUser, getAllUser, updateUser, deleteUser}=require('../controller/userController');
const { application } = require("express");

//user ke pas options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)


//profile page
app.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)



//admin specific func
application.use(isAuthorised(['admin']));
userRouter
.route('')
.get(getAllUsers)











// userRouter
// .route('/')
// .get(protectRoute,getUsers) //path specific middleware
// .post(postUser)
// .patch(updateUser)
// .delete(deleteUser);

// userRouter
// .route("/getCookies")
// .get(getCookies);

// userRouter
// .route("/setCookies")
// .get(setCookies);

// userRouter
// .route('/:id')
// .get(getUserById); 



module.exports=userRouter;