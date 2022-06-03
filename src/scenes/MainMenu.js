import Button from "../js/button.js";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }
  create() {
    this.add
      .image(this.cameras.main.centerX, this.cameras.main.centerY, "Fondo_Menu")
      .setScale(1.1);
    this.add
    .image(
      this.cameras.main.centerX,
      this.cameras.main.centerY / 1.5,
      "game_logo"
    )
    .setScale(1.1);
    const boton = new Button(
      this.cameras.main.centerX,
      this.cameras.main.centerY + this.cameras.main.centerY / 3,
      "Jugar",
      this,
      () => {
        this.scene.start("Play");
      }
    );
  }

  
}
