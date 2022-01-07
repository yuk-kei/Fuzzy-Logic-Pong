import io from 'socket.io-client';

export default class SocketHandler{
    constructor(scene) {
        scene.socket = io('http://localhost:5000');

        scene.socket.on('connect', () => {
            console.log('Connected!');
            scene.socket.emit('newPlayer', scene.socket.id);
        });

        //Ask for the player information from the sever
        this.playerInfo = () => {
            scene.socket.emit('getInfo')
        }
        scene.socket.on('sendIsPlayer',(data)=>{
            scene.interact.gameStatus.isPlayer = data.isPlayer;

            console.log(data.isPlayer);
        });

        scene.socket.on('sendOpponent',(data)=>{
            scene.interact.gameStatus.opponentType = data.opponentType;

            console.log(data.opponentType);
        });

        scene.socket.on('start',(data)=>{
            scene.ball.start(data.side,data.angle,data.velocity);
        });

        //Ask for the server to start the ball
        this.ballStart = () =>{
            scene.socket.emit('newRound');
        };

        scene.socket.on('start',(data)=>{
            scene.ball.start(data.side,data.angle,data.velocity);
        });

        this.setPaddlePosition = (player,opponent) => {
            scene.socket.emit('paddlePosition',{player:player,opponent:opponent});
        };

        scene.socket.on('paddleMove',(data)=>{

            scene.playerPaddle.body.velocity.y = data.player;
            scene.opponentPaddle.body.velocity.y = data.opponent;
        })

        this.sendPlayerChoice = (choice)=>{
            scene.socket.emit('choice',{playerGuess:choice,actuallyType:opponent,leftScore:leftScore,rightScore:rightScore})
        }

        this.disconnect = () =>{
            scene.socket.disconnect();
        }

        // failed codes
        // this.setBallPos = (velocity,angle) =>{
        //     scene.socket.emit('ballPosition',{velocity:velocity,angle:angle});
        // }
        // scene.socket.on('ball',(data)=>{
        //     scene.ball.setBallPosition(data.velocity,data.angle);
        // });
    }



}