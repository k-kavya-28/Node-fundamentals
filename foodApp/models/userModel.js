//mongoDB

const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');


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


userSchema.pre('save',async function(){
    let salt = await bcrypt.genSalt();
    let hashedString = await bcrypt.hash(this.password,salt);
    // let hashedString = await bcrypt.hash(this.password,10);
    // console.log(hashedString);
    this.password = hashedString;
});
//bcrypt functions are asynchronous


//model
const userModel = mongoose.model('userModel',userSchema);
module.exports = userModel;