import Button from "../js/button";
export class MainMenu extends Phaser.Scene {
    constructor4(){
    super("MainMenu")
    }
    create(){
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'Fondo_Menu').setScale(1.1);
        this.add.image(this.cameras.main.centerX, this.cameras.main.centerY/1.5, 'game_logo');
        const boton = new Button(this.cameras.main.centerX, this.cameras.main.centerY + this.cameras.main.centerY/3, 'Play', this, () => {
            
            this.scene.start("Play");
        });
    }

}
