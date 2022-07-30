const express = require("express");

const app = express();
//middleware func-> post, front->json
app.use(express.json());

app.listen(3000)

let user = {};

app.get('/user',(req,res)=>{
    res.send(user);
});

app.post('/user',(req,res)=>{
    console.log(req.body);
    user = req.body;
    res.json({
        message:"data received successfully",
        user:req.body
    });
});

//update -> patch
app.patch('/user',(req,res)=>{
    console.log('req.body-> ',req.body);
    //update data in users obj
    let dataToBeUpdated=req.body;
    for(key in dataToBeUpdated){
        user[key]=dataToBeUpdated[key];
    }
    res.json({
        message:"data updated successfully"
    })
});

//to delete a data
app.delete('/user',(req,res)=>{
    user={};
    res.json({
        message:"data has been deleted"
    });
});