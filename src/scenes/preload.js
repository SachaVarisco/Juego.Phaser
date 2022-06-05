export class Preload extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    this.load.image("game_logo", "public/assets/images/Main_logo.png");
    this.load.image("gameover_logo", "public/assets/images/over_logo.png");
    this.load.image("Win_logo", "public/assets/images/Win_logo.png");
    this.load.image("Fondo_Menu", "public/assets/images/menu.jpg");
    this.load.image("Fondo_Over", "public/assets/images/fondo_over.jpg");
    this.load.image("Fondo_Win", "public/assets/images/fondo_menu2.jpg");
    this.load.image("sky", "public/assets/images/fondo2.jpg");
    this.load.image("ground", "public/assets/images/platform2.png");
    this.load.image("star", "public/assets/images/greenapple.png");
    this.load.image("redstar", "public/assets/images/redapple.png");
    this.load.image("cactus", "public/assets/images/cactus.png");
    this.load.image("aloe", "public/assets/images/aloe.png");
    this.load.image("bomb", "public/assets/images/bomb2.png");
    this.load.spritesheet("dude", "public/assets/images/dude2.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.start("MainMenu");
  }
}
