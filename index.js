const express = require('express');
const port = 8000;
const app = express();
const jwt = require('jsonwebtoken')

app.get('/', function(req, res){
    // res.send(`<h1>Welcome to Node Js!!!</h1>`)
    res.json({
        message: "Successfully node js installed"
    })
})

app.post('/tokenGenerate', (req, res) => {
    const user= {
        id: 1,
        username: 'aprilbatch',
        email: 'april@coding.com'
    }
    jwt.sign({ foo: 'bar' }, 'secret', function(err, token) {
        if(err){
            res.status(403);
        }
        else{
            res.json({
               token
            })
        }
    });
})

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
        return;
    }
    console.log(`Server is up and running on port : ${port}`)
})