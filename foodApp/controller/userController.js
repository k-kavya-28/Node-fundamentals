const userModel = require('../models/userModel');

module.exports.getUsers = async function getUsers(req,res){
    // comment inside comment -> console.log(req.query);
    // comment inside comment -> res.send(users);
    let allUsers = await userModel.find();
    // let user = await userModel.findOne({name:'Khushi Kavya'});
    res.json({message:'list of all users',
    data:allUsers});
};

module.exports.postUser = function postUser(req,res){
    console.log(req.body);
    user = req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
};

module.exports.updateUser = async function updateUser(req,res){
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

module.exports.deleteUser = async function deleteUser(req,res){
    // user={};
    // let user = await userModel.findOneAndDelete({email:'nic@gmail.com'});
    let dataToBeDeleted = req.body;
    let user = await userModel.findOneAndDelete(dataToBeDeleted);
    res.json({
        message:"data has been deleted",
        data:user
    });
};

module.exports.getUserById = function getUserById(req,res){
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


// function setCookies(req,res){
//     comment inside comment -> res.setHeader('Set-Cookie','isLoggedIn=true'); //isLoggedIn=true is the key-value pair i.e. cookie name and value
//     // res.cookie('isLoggedIn',false);
//     res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24, secure:true, httpOnly:true});
//     res.cookie('isPrimeMember',true);
//     res.send('Cookies has been set');
// }
//expires-session-until the tab is closed

// function getCookies(req,res){
//     // let cookies = req.cookies;
//     let cookies = req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send('cookies received');
// }