import Phaser from 'phaser';

export default class BackgroundHandler extends Phaser.GameObjects.Sprite {
	constructor(config) {
		super(config.scene, 0, 0, config.key);
		this.setDepth(-1);
		this.setOrigin(0, 0);
		this.setScale(1)
		this.scene.add.existing(this);
	}
}