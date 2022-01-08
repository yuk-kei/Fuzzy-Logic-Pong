import Phaser from 'phaser';
import FuzzySet from "../utils/FuzzySet";

export default class PaddleHandler extends Phaser.GameObjects.Sprite {
	constructor(config) {

		super(config.scene, config.x, config.y, config.key)
		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setImmovable(true);

		this.setOrigin(0, 0.5);
	}
	update(keys) {
		if (keys.up.isDown) {
			this.body.setVelocityY(-200);
		} else if (keys.down.isDown) {
			this.body.setVelocityY(200);
		}
		else {
			this.body.setVelocityY(0);
		}
	}


	traditionalAI(ballPositionY){

		const diff = ballPositionY - this.body.y;
		const aiSpeed = 5
		if (Math.abs(diff) < 10) {
			return
		}

		if (diff < 0) {
			// ball is above the paddle
			this.body.setVelocityY(-aiSpeed) ;
			if (this.body.velocity.y < -10) {
				this.body.setVelocityY(-10)
			}
		} else if (diff > 0) {
			// ball is below the paddle
			this.body.setVelocityY(aiSpeed);
			if (this.body.velocity.y < 10) {
				this.body.setVelocityY(10);
			}
		}

		this.body.y += this.body.velocity.y;

	}
	/**
	 * downSet: [-1000,-20] keepSet[-20,20], upSet[20,1000]
	 * @param ballPositionY send the current Y position of ball

	 */
	fuzzyAI(ballPositionY){
		const diff = ballPositionY - this.body.y;
		let aiSpeed = 0;

		let speedUpSet = new FuzzySet(50,50,1000);
		let speedDownSet = new FuzzySet(-50,-1000,50);
		let keepSet = new FuzzySet(0,-50,50);

		let upSpeed = 20 * speedUpSet.rightShoulderDom(diff);
		let downSpeed = -20 * speedDownSet.leftShoulderDom(diff);
		//calculate desirability, it omit the unnecessary calculation including keepSeed and divide the sum of fuzzySet DOMs
		aiSpeed += downSpeed + upSpeed;

		this.body.setVelocityY(aiSpeed);
		this.body.y += this.body.velocity.y;

	}

}