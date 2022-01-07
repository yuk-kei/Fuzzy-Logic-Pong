import BackgroundHandler from "./BackgroundHandler";

export default class UIHandler{
    constructor(scene) {
        this.changeScoreText = (left,right) =>{
            scene.dealScoreLeft.setText("Player 1 Score: " + left);
            scene.dealScoreRight.setText("Player 2 Score: " + right);
        }
        this.buildGameText = () => {
            scene.dealTexts = scene.add.text(scene.cameras.main.centerX-150,50,"Pong Games").setFontSize(72).setFontFamily("Trebuchet MS").setColor("#ff4700");
            scene.explainTexts = scene.add.text(scene.cameras.main.centerX-100,10,"Press 'SPACE' to start").setFontSize(32).setFontFamily("Bold");
        }

        this.buildScoreText = () =>{
            scene.dealScoreLeft = scene.add.text(scene.cameras.main.centerX-600,50,"Player 1 Score: " + 0).setFontSize(72).setFontSize(50).setFontFamily("electronicFont").setColor("#ffA500");
            scene.dealScoreRight = scene.add.text(scene.cameras.main.centerX+320,50,"Player 2 Score: " + 0).setFontSize(72).setFontSize(50).setFontFamily("electronicFont").setColor("#ffA500");
        }

        this.buildUI = () =>  {
            scene.background = new BackgroundHandler({ scene: scene, key: "BACKGROUND_SPRITE" })
            this.buildGameText();
            this.buildScoreText();
        }

    }
}