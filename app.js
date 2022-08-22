const express = require("express");
const path = require('path');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');


const app = express();
//middleware func-> post, front->json
app.use(express.json()); //global middleware

app.listen(3000,()=>console.log("server started"))
app.use(cookieParser());

// let user=[
//     {
//         'id':1,
//         'name':"Khushi"
//     },
//     {
//         'id':2,
//         'name':"Gunjan"
//     },
//     {
//         'id':3,
//         'name':"Jassika"
//     },
//     {
//         'id':4,
//         'name':"Anand"
//     }
// ];

//mini app
// const userRouter=express.Router();
const userRouter=require('./foodApp/Routers/userRouter');
// const authRouter=express.Router();
const authRouter=require('./foodApp/Routers/authRouter');
//base route, router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);



//params
// app.get('/user/:id',(req,res)=>{
//     console.log(req.params.id);

    // res.send("user id is ",req.params);
//     res.send("user id received");
// })
// app.get('/user/v2/:username',(req,res)=>{
    
//     console.log(req.params.username);
//     console.log(req.params);
//     res.send(req.params);
// })
//params: we won't make different profile for each user
//queries: to filter out data , you select->goes to url->database->filtering ->data given to user

//db is connected to the application






// (async function createUser(){
//     let user = {
//         name:'ks',
//         email:'ks@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678'
//     };
//     let data = await userModel.create(user);
//     console.log(data);
// })();
// to invoke immediately

//mongoose helps in validation and schema designing