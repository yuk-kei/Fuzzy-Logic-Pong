import Phaser from "phaser";
import PaddleHandler from "./PaddleHandler";


export default class InteractHandler {
    constructor(scene) {

        this.gameStatus = {
            isPlayer: false,
            opponentType: 1,
            leftScore: 0,
            rightScore: 0
        };

        scene.keys = {
            leftPaddle: {
                up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
                down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
            },
            rightPaddle: {
                up: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
                down: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
            },

            start: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
            pause: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P)
        };
        // this.paddle
        // 0: human, 1: traditional AI, 2: fuzzy AI
        this.initGames = () => {
            scene.socketHandler.playerInfo();
            this.assignPaddles();
            this.enablePhysics();
        }

        // this.setGameStatus = (isPlayer,type) => {
        //     console.log("I am used");
        //     this.gameStatus.isPlayer = isPlayer;
        //     this.gameStatus.opponentType = type;
        //     console.log("GameState: " + this.gameStatus.isPlayer + " " + this.gameStatus.opponentType);
        // }

        // this.assignPaddles = () =>{
        //     scene.playerPaddle = new HumanPaddle({ scene: scene, x: 20, y: 300, key: "PADDLE_SPRITE" });
        //     // scene.opponentPaddle = new PaddleHandler({ scene: scene, x: scene.game.config.width - 46, y: 300, key: "PADDLE_SPRITE" });
        //      console.log(this.gameStatus.opponentType);
        //
        //     switch (this.gameStatus.opponentType){
        //         case 0 : scene.opponentPaddle = new HumanPaddle({ scene: scene, x: scene.game.config.width - 46, y: 300, key: "PADDLE_SPRITE" });break;
        //         case 1 : scene.opponentPaddle = new AIPaddle({ scene: scene, x: scene.game.config.width - 46, y: 300, key: "PADDLE_SPRITE" });break;
        //         case 2 : scene.opponentPaddle = new AIPaddle({ scene: scene, x: scene.game.config.width - 46, y: 300, key: "PADDLE_SPRITE" });break;
        //         default: scene.opponentPaddle = new HumanPaddle({ scene: scene, x: scene.game.config.width - 46, y: 300, key: "PADDLE_SPRITE" });break;
        //     }
        //
        // }

        this.assignPaddles = () => {
            scene.playerPaddle = new PaddleHandler({scene: scene, x: 20, y: 500, key: "PADDLE_SPRITE"});
            scene.opponentPaddle = new PaddleHandler({
                scene: scene,
                x: scene.game.config.width - 46,
                y: 500,
                key: "PADDLE_SPRITE"
            });
        }
        this.enablePhysics = () => {
            scene.physics.world.setBoundsCollision(false, false, true, true);
            //what happens when ball touches paddles
            scene.physics.add.collider(scene.ball, [scene.opponentPaddle, scene.playerPaddle], function (paddle, ball) {
            }, null, this);
        }

        this.updatePaddles = () => {

            if (this.gameStatus.isPlayer) {
                scene.playerPaddle.update(scene.keys.leftPaddle);
                // scene.socketHandler.setPaddlePosition(scene.playerPaddle.body.velocity.y,scene.opponentPaddle.body.velocity.y);
            }

            switch (this.gameStatus.opponentType) {

                case 0 :
                    scene.opponentPaddle.update(scene.keys.rightPaddle);
                    break;
                case 1 :
                    scene.opponentPaddle.traditionalAI(scene.ball.y);
                    break;
                case 2 :
                    scene.opponentPaddle.fuzzyAI(scene.ball.y);
                    break;
                default:
                    scene.opponentPaddle.traditionalAI(scene.ball.y);
                    break;
            }
            scene.socketHandler.setPaddlePosition(scene.playerPaddle.body.velocity.y, scene.opponentPaddle.body.velocity.y);
        }


        this.checkInput = () => {
            if (scene.keys.start.isDown && !scene.ball.isMoving) {
                scene.socketHandler.ballStart();
                console.log("space is pressed");
            }
        }

        this.updateScore = () => {
            if (scene.ball.x < 0) {
                console.log("right score");
                this.gameStatus.rightScore += 1;
                scene.ball.reset();
            }
            if (scene.ball.x > 1500) {
                console.log("left score");
                this.gameStatus.leftScore += 1;
                scene.ball.reset();
            }
            scene.displayUI.changeScoreText(this.gameStatus.leftScore, this.gameStatus.rightScore);
        }

        this.checkGameOver = () => {
            if (this.gameStatus.leftScore === 3 || this.gameStatus.rightScore === 3) {
                scene.ball.active = false;
                scene.scene.start("GAME_OVER", {
                    opponentType: this.gameStatus.opponentType,
                    leftScore: this.gameStatus.leftScore,
                    rightScore: this.gameStatus.rightScore,
                    socketHandler: scene.socketHandler
                })
                this.gameStatus.leftScore = 0;
                this.gameStatus.rightScore = 0;

            }
        }

        this.updateGameObject = () => {
            this.updatePaddles();
            this.checkInput();
            this.updateScore();
            this.checkGameOver();
        }
    }
}