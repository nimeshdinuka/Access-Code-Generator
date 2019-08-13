const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = 3000;

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/instructor.html');
});

app.get('/student', function (req, res) {
    res.sendFile(__dirname + '/student.html');
})

app.post('/compareNumber',function (req, res) {
  
    console.log("number--------")
    console.log(req.body.number)
    var input = req.body.number;

    if(input === null || input === ""){
        res.status(200).json({
            "msg": "Enter a Number Please"
        });
    }

    if(input == generatedNumber) {
        console.log('success');
        res.status(200).json({
            "msg": "Success",
            "input": input
        });
    } else {
        console.log('Wrong Input.');
        res.status(200).json({
            "msg": "You are Wrong",
            "input": input
        });
    }
})

var generatedNumber = Math.floor(100000 + Math.random() * 899999);;

generateNum()

function generateNum() {
    generatedNumber = Math.floor(100000 + Math.random() * 899999);
    console.log(generatedNumber);
}

setInterval(generateNum, 10000);

var listener = io;
listener.sockets.on('connection', function(socket){
    setInterval(function(){

    socket.emit('message', {'number': generatedNumber});
    },10000);
});


server.listen(PORT, function () {
    console.log('Server is running on port ' + PORT);
});