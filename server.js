// server creation

// 1. http module

const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{
    console.log('Request has been made from browser to server');
    // console.log(req.method);
    // console.log(req.url);
    //lodash
    let num = _.random(0,20);
    console.log(num);

    let greet = _.once(()=>{
        console.log('Hello');
    });

    greet();
    greet();

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
            res.statusCode=200;
            break
        case '/about':
            path+= '/about.html'
            res.statusCode=200;
            break
        case '/about-me':
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end()
            break
        default:
            path+= '/404.html'
            res.statusCode=404;
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