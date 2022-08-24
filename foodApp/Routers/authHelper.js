// let flag = false; //user logged in or not
const jwt = require('jsonwebtoken');
// const JWT_KEY = 'qwertyuiopasdfghjklzxcvbnm1234567890';
const JWT_KEY = require('secrets.js');

function protectRoute(req,res,next){
    // if(req.cookies.isLoggedIn){
    if(req.cookies.login){
        console.log(req.cookies);
        let isVerified = jwt.verify(req.cookies.login,JWT_KEY); //first argument is the token and second one is the signature
        if (isVerified){
            next();
        }
        else{
            return res.json({
                message:'user not verified'
            })
        }
    }
    else{
        return res.json({
            message:'Operation not allowed'
        });
    }
}

module.exports = protectRoute;