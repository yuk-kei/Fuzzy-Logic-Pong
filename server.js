const express = require("express")();
const server = require('http').createServer(express);
const serveStatic = require('serve-static');
const port = process.env.PORT || 5000;
const cors = require('cors');
const fs = require('fs');

let players = {};
let hasPlayer = false;

const ballInit ={
    x:750,
    y:500,
    side:Math.random() < 0.5 ? 1 : -1,
    velocity: 500,
    angle: (Math.random() * (-Math.PI / 4 - Math.PI / 4) + Math.PI / 4).toFixed(2)
}

const io = require('socket.io')(server,{
    cors:{
        origin: 'http://localhost:8080',
        methods:["GET","HEAD","POST"]
    }
});

express.use(cors());
express.use(serveStatic(__dirname + "/client/dist"));


io.on('connection',function(socket){
    console.log('A user is connected: ' + socket.id);
    console.log(Object.keys(players).length);

    players[socket.id] = {
        isPlayer:false,
        opponentType: Math.floor(Math.random() * (3))
    };
//assign player
    if (!hasPlayer){
        players[socket.id].isPlayer = true;
        hasPlayer = true;
    }

//debug
    if(players[socket.id].isPlayer){
        console.log("I am the player!" )
    }

    socket.on('disconnect', function() {
        console.log("Disconnected client " + socket.id)
        if(players[socket.id].isPlayer){
            hasPlayer = false;
        }
        delete players[socket.id];
    })

    socket.paddle = {
        player:0,
        opponent:0
    }

    socket.ball = {
        x:750,
        y:500,
        side:Math.random() < 0.5 ? 1 : -1,
        velocity: 400,
        angle: (Math.random() * (-Math.PI / 4 - Math.PI / 4) + Math.PI / 4).toFixed(2)
    }

    socket.on('getInfo',function (){
        console.log("send game status");
        io.emit('sendOpponent',players[socket.id]);
        io.to(socket.id).emit('sendIsPlayer',players[socket.id]);
    });

    socket.on('paddlePosition',function (data){
        socket.paddle.player = data.player;
        socket.paddle.opponent = data.opponent;

        io.emit('paddleMove',socket.paddle);
    });

    socket.on('newRound',function(){
        console.log("new round start");
        io.emit('start',ballInit);
    });

    socket.on('choice',function (data){

        let result = {
            playerGuess: data.playerGuess,
            actuallyType: data.actuallyType,
            result: "Player VS Opponent = " + data.leftScore + " : " + data.rightScore
        }

        fs.readFile('./result.json', 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                let origin = JSON.parse(data); //now it an object
                origin.table.push(result); //add some data
                let resultJson = JSON.stringify(origin); //convert it back to json
                fs.writeFile('result.json', resultJson, 'utf8', function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                }); // write it back
            }});

    })
    //failed codes:
    // if (Object.keys(players).length > 2) {
    //     io.disconnect();
    //     console.log("disconnect");
    // }

    // socket.on('ballPosition',function (data){
    //
    //     socket.ball.velocity = data.velocity;
    //     socket.ball.angle = data.angle;
    //
    //     // socket.broadcast.emit('paddleMove',socket.paddle);
    //     io.emit('ball',socket.ball);
    // });
})

server.listen(port,() =>{
    console.log('Listening on '+ server.address().port);
});