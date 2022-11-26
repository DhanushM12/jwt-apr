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
    jwt.sign(user, 'secret',{expiresIn: '60s'}, function(err, token) {
        if(err){
            res.sendStatus(403);
        }
        else{
            res.json({
               token
            })
        }
    });
})

app.post('/verifyToken', extractToken, (req, res) => {
    jwt.verify(req.token, 'secret', function(err, data) {
        if(err){
            res.sendStatus(403);
        }
        else{
            // res.send('index.ejs', user)
            res.json({
                message: 'user access granted',
                data
            })
        }
});
})

function extractToken(req, res, next){
    const bearerHeader = req.headers['authorization'];// Bearer token
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ');// [bearer, token]
        const bearerToken = bearer[1]; // token
        req.token = bearerToken;
        next();
    }
    else{
        res.sendStatus(403);
    }
}
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${err}`)
        return;
    }
    console.log(`Server is up and running on port : ${port}`)
})