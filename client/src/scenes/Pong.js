import Phaser from 'phaser';
import UIHandler from "../helpers/UIHandler";
import BallHandler from "../helpers/BallHandler";
import SocketHandler from "../helpers/SocketHandler";
import InteractHandler from "../helpers/InteractHandler";

export default class Pong extends Phaser.Scene  {

    constructor() {
        super({ key: "PONG" });
    }

    create() {
        this.displayUI = new UIHandler(this);
        this.displayUI.buildUI();

        this.ball = new BallHandler({ scene: this, x: this.cameras.main.centerX, y: this.cameras.main.centerY, key: "BALL_SPRITE" });
        this.socketHandler = new SocketHandler(this);
        this.interact = new InteractHandler(this);
        this.interact.initGames();
    }

    update() {
        this.interact.updateGameObject();
    }

}

