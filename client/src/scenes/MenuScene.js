import Phaser from "phaser"
import MenuButton from "../helpers/MenuButton";

export default class MenuScene extends Phaser.Scene{
    constructor() {
        super({ key: "MENU_SCENE" });
    }

    preload(){
        this.load.image("PADDLE_SPRITE", "src/assets/paddle.png");
        this.load.spritesheet("BALL_SPRITE", "src/assets/ball.png", { frameWidth: 695, frameHeight: 673 })
        this.load.image("BACKGROUND_SPRITE", "src/assets/background.png")
    }

    create() {
        const { centerX, centerY } = this.cameras.main;
        this.anims.create({
            key: 'BALL_ANIMATION',
            frames: this.anims.generateFrameNumbers('BALL_SPRITE', { frames: [0, 1, 2, 3] }),
            frameRate: 6,
            yoyo: false,
            repeat: -1
        });

        this.singlePlayer = new MenuButton(this, centerX, 300, "Single Player", () => { this.scene.start("PONG"); });
        this.doublePlayer = new MenuButton(this, centerX, 500, "Double Player", () => { this.scene.start("Pong"); });
    }

}