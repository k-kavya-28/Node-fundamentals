// server creation

// 1. http module

const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    console.log('Request has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);

    // methods in response object
    // res.setHeader('Content-Type','text/plain');
    // res.write('<h1>Helloooo :) </h1>');
    // res.write('<h2>How you doin ? </h2>');
    // res.end();
    res.setHeader('Content-Type','text/html');
    let path='./views';
    switch(req.url){
        case '/':
            path+= '/index.html'
            break
        case '/about':
            path+= '/about.html'
            break
        default:
            path+= '/404.html'
    };

    // fs.readFile('./views/index.html',(err,fileData)=>{
    fs.readFile(path,(err,fileData)=>{
        if(err){
            console.log(err);
        }
        else{
            // res.write(fileData);
            res.end(fileData);
        }
    })
})

//syntax : (port number, host[default:localhost -from where the request is coming,need not mention], callback function)
server.listen(3000, 'localhost', ()=>{
    console.log('Server is listening on port 3000');
});
// ctrl + C (to stop the server which is listening already)