import Phaser from "phaser"
import SocketHandler from "../helpers/SocketHandler";
import MenuButton from "../helpers/MenuButton";

export default class GameOver extends Phaser.Scene {

    constructor() {
        super({ key: "GAME_OVER" });
    }

    create(data) {
        let titleText = 'Game Over !'
        if (data.leftScore > data.rightScore) {
            titleText = 'You Win !'
        }
        this.add.text(600, 200, titleText, {
            fontFamily: "Trebuchet MS",
            fontSize: 72
        })

        this.add.text(530, 300, 'Press Space to Continue', {
            fontFamily: "Trebuchet MS",
            fontSize: 42
        })

        this.input.keyboard.once('keydown-SPACE', () => {
            data.socketHandler.disconnect();
            this.scene.start("MENU_SCENE")
        })

        this.humanPlayerButton = new MenuButton(this, 600, 600, "Human Opponent", () => { this.scene.start("PONG"); });
        this.traditionalAIButton = new MenuButton(this, 900, 600, "AI Opponent", () => { this.scene.start("PONG"); });
    }
}