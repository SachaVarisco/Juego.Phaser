var player;
var stars;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;

export class Play extends Phaser.Scene {
    constructor(){
        super("play")
    }

    preload(){
       
       this.load.tilemapTiledJSON("map", "public/assets/tilemaps/nivel1.json");
       this.load.image("fondo", "public/assets/images/fondos.png");
      this.load.image("Platform", "public/assets/images/plataformas.png");
        
    }
    create(){
        const map = this.make.tilemap({ key: "map" });
        const tilesetBelow = map.addTilesetImage("fondos", "fondo");
        const tilesetPlatform = map.addTilesetImage( "plataformas", "Platform");
        
        const belowLayer = map.createLayer("Fondo", tilesetBelow, 0, 0);
        const worldLayer = map.createLayer("Plataformas", tilesetPlatform, 0, 0);
        const objectsLayer = map.getObjectLayer("Objetos");

        worldLayer.setCollisionByProperty({ collides: true });
        
        const spawnPoint = map.findObject("Objetos", (obj) => obj.name === "dude");
        
        player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");
        
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        if ((cursors = !undefined)) {
            cursors = this.input.keyboard.createCursorKeys();
        }

        star = this.physics.add.group();

        objectsLayer.objects.forEach((objData) => {
            
      
            const { x = 0, y = 0, name, type } = objData;
            switch (type) {
             case "star": { 
                    var star = stars.create(x, y, "star");
                 star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                 break;
                 }
            }
        });
        redstar = this.physics.add.group();

        objectsLayer.objects.forEach((objData) => {
            
      
            const { x = 0, y = 0, name, type } = objData;
            switch (type) {
             case "redstar": { 
                    var star = stars.create(x, y, "redstar");
                 star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
                 break;
                 }
            }
        });

        bombs = this.physics.add.group();
        scoreText = this.add.text(30, 6, "score: 0", {
            fontSize: "32px",
            fill: "#000",
        });

         
        this.physics.add.collider(player, worldLayer);
        this.physics.add.collider(stars, worldLayer);
        this.physics.add.collider(bombs, worldLayer);

        this.physics.add.overlap(player, stars, this.collectStar, null, this);

        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    
        gameOver = false;
        score = 0;

    }
    
    update (){

        if (gameOver)
        {
            return;
        }
    
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        } 
    } 
    collectStar (player, star){
        star.disableBody(true, true);
        score += 15;
            scoreText.setText('Score: ' + score);
    
            if (stars.countActive(true) === 0)
            {
                //  A new batch of stars to collect
                stars.children.iterate(function (child) {
    
                    child.enableBody(true, child.x, 250, true, true);
    
                });
    
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
                
            }
    } 

    collectredStar (player, redstar){
        redstar.disableBody(true, true);
        score += 15;
     scoreText.setText('Score: ' + score);
    
     if (redstars.countActive(true) === 0)
        {
         //  A new batch of stars to collect
            redstars.children.iterate(function (child) {
           child.enableBody(true, child.x, 250, true, true);

        });
         var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
         var bomb = bombs.create(x, 16, 'bomb');
         bomb.setBounce(1);
         bomb.setCollideWorldBounds(true);
         bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
         bomb.allowGravity = false;        
        }
    }


    hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;

        setTimeout (() => {
            this.scene.start(
                "Retry",
                {score:score}

            )

        }, 1000);
     } 
 }
