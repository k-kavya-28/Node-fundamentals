const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const emailValidator = require('email-validator');

const app = express();
//middleware func-> post, front->json
app.use(express.json()); //global middleware

app.listen(3000,()=>console.log("server started"))

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
const userRouter=express.Router();
const authRouter=express.Router();
//base route, router to use
app.use('/user',userRouter);
app.use('/auth',authRouter);

userRouter
.route('/')
.get(getUsers) //path specific middleware
.post(postUser)
.patch(updateUser)
.delete(deleteUser);

userRouter
.route('/:id')
.get(getUserById);

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)


async function getUsers(req,res){
    //console.log(req.query);
    //res.send(users);
    // let allUsers = await userModel.find();
    let user = await userModel.findOne({name:'Khushi Kavya'});
    res.json({message:'list of all users',
    data:allUsers});
};

function postUser(req,res){
    console.log(req.body);
    user = req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
};

async function updateUser(req,res){
    console.log('req.body-> ',req.body);
    //update data in users obj
    let dataToBeUpdated=req.body;
    let user = await userModel.findOneAndUpdate({email:'ks@gmail.com'},dataToBeUpdated);
    // for(key in dataToBeUpdated){
    //     user[key]=dataToBeUpdated[key];
    // }
    res.json({
        message:"data updated successfully",
        data:user
    })
};

async function deleteUser(req,res){
    // user={};
    // let user = await userModel.findOneAndDelete({email:'nic@gmail.com'});
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
};

function getUserById(req,res){
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
        message:"req received",
        data:obj
    })
}

function middleware1 (req,res,next){
    console.log('middleware1 encountered');
    next();
}

function middleware2 (req,res,next){
    console.log('middleware2 encountered');
    // next();
    console.log("middleware 2 ended req/res cycle");
    res.sendFile('/public/index.html',{root:__dirname});
}

function getSignUp(req,res){
    console.log('getUser called');
    next();
    // res.sendFile(path.join(__dirname,"./public/","index.html"));
}

async function postSignUp(req,res){
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    // console.log('backend',obj);
    // console.log('backend',user);
    res.json({
        message:"user signed up",
        data:user
    });
}


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


const db_link='mongodb+srv://admin:aHYzIBHbeEeCcNWX@cluster0.ihowjh3.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
//.then means promise based
.then(function(db){
    // console.log(db)
    console.log('db connected');
})
.catch(function(err){
    console.log(err);
});

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        validate:function(){
            return this.confirmPassword==this.password
        }
    }
});


//pre post hooks (save is a functionality)
//after event save occurs in db
// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc);
// });

//before event save occurs in db
// userSchema.pre('save',function(){
//     console.log('before saving in db',this);
// });

//remove -- explore on own



userSchema.pre('save',function(){
    this.confirmPassword=undefined;
});
// As the confirm password is undefined it won't get stored in the database



//model
const userModel = mongoose.model('userModel',userSchema);

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