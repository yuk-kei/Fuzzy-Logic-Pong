import Phaser from 'phaser';

export default class BallHandler extends Phaser.GameObjects.Sprite {

	constructor(config) {

		super(config.scene, config.x, config.y, config.key)
		this.side = 0.5;
		this.angle = Phaser.Math.FloatBetween(-Math.PI / 4, Math.PI / 4);
		this.velocity = 300;

		this.scene.physics.world.enable(this);
		this.scene.add.existing(this);
		this.body.setCollideWorldBounds(true);
		this.body.setBounce(1);
		this.setScale(0.08)
		this.play("BALL_ANIMATION");
		this.anims.create({
			key: 'BALL_ANIMATION',
			frames: this.anims.generateFrameNumbers('BALL_SPRITE', { frames: [0, 0, 0, 1, 2, 3] }),
			frameRate: 20,
			yoyo: false,
			repeat: -1
		});
		this.reset();
	}
	reset() {
		const { centerX, centerY } = this.scene.cameras.main;
		this.setPosition(centerX, centerY);
		this.body.setVelocity(0, 0);
		this.body.setAngularVelocity(40);
		this.isMoving = false;
	}

	start(side,angle,velocity) {

		this.body.setVelocity(side * velocity * Math.cos(angle), side * velocity * Math.sin(angle));
		this.isMoving = true;
	}

}

