const express = require("express");
const authRouter = express.Router();
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('secrets.js');

authRouter
.route('/signup')
.get(middleware1,getSignUp,middleware2)
.post(postSignUp)

authRouter
.route('/login')
.post(loginUser)


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

async function loginUser(req,res){
    try{
        // let {email,password} = req.body;
        let data = req.body;
        if(data.email){
            let user = await userModel.findOne({email:data.email});
            if(user){
                //bcrypt -> compare
                //we'll do it later that's why we are commenting the salt part in the userModel.js file
                if(user.password==data.password){
                    let uid = user['_id']; //payload-uid
                    let token = jwt.sign({payload:uid},JWT_KEY); //default HMAC algo will be used otherwise we will be having to specify it, can refer npm jsonwebtoken for it
                    // res.cookie('isLoggedIn',true,{httpOnly:true});
                    res.cookie('login',token,{httpOnly:true});
                    return res.json({
                        message:'User has logged in',
                        userDetails:data
                    })
                }
                else{
                    return res.json({
                        message:'wrong credentials'
                    })
                }
            }
            else{
                return res.json({
                    message:'user not found'
                })
            }
        }
        else{
            return res.json({
                message:'Empty field found'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

module.exports=authRouter;