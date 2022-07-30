 const express = require('express');
// we can use require here only if the package is already installed
 const app = express();
 // app is the variable name

 app.listen(3000);

app.get('/',(req, res)=>{
    res.send('D:\Github\Backend-development-with-express\views\index.html');
});

app.get('/about',(req, res)=>{
    res.sendFile('./views/about.html',{root:__dirname})
});

//redirects

app.get('/about-us',(req,res)=>{
    res.redirect('/about');
});

//404 page

app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname});
    //chai ning
});
//we use this at last d