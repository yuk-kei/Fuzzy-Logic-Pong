import Phaser from "phaser"
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
        this.add.text(560, 200, titleText, {
            fontFamily: "Trebuchet MS",
            fontSize: 72
        })

        this.add.text(530, 300, 'Press Space to Continue', {
            fontFamily: "Trebuchet MS",
            fontSize: 42
        })

        this.input.keyboard.once('keydown-SPACE', () => {
            this.backToMenu();
        })

        this.humanPlayerButton = new MenuButton(this, 600, 600, "Human Opponent", () => {
            let opponentName = this.opponentName(data.opponentType);
            data.socketHandler.sendPlayerChoice('Human Opponent',opponentName);

            this.backToMenu();
        });

        this.traditionalAIButton = new MenuButton(this, 900, 600, "AI Opponent", () => {
            let opponentName = this.opponentName(data.opponentType);
            data.socketHandler.sendPlayerChoice('AI Opponent',opponentName);

            this.backToMenu();
        });

        this.backToMenu = () =>{
            data.socketHandler.disconnect();
            this.scene.start("MENU_SCENE");
        }
    }

    opponentName(opponentType){
        switch (opponentType){
            case 0 : return 'Human Opponent';
            case 1 : return 'Traditional AI';
            case 2 : return 'Fuzzy AI';
            default: return 'AI Opponent';
        }
    }

}