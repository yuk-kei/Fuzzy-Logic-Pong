import Phaser from 'phaser';
import Pong from "./scenes/Pong"
import logoImg from './assets/logo.png';
import MenuScene from "./scenes/MenuScene";
import GameOver from "./scenes/GameOver";

const config = {
    type: Phaser.AUTO,
    scale:{
        mode:Phaser.Scale.FIT,
        width:1500,
        height:1000
    },
    scene:[MenuScene,Pong,GameOver],
    dom: {
        createContainer: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);
