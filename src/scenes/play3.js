var player;
var cactus;
var star;
var aloe;
var bombs;
var cursors;
var score;
var gameOver;
var scoreText;
var scoreTime;
var scoreTimeText;
var timedEvent;

export class Play3 extends Phaser.Scene {
    constructor() {
      super("Play3");
    }
    init(data) {
      score = data.score;
    }
    
    preload() {
        this.load.tilemapTiledJSON("map3", "public/assets/tilemaps/nivel3.json");
        this.load.image("fondo3", "public/assets/images/fondos.png");
        this.load.image("platform3", "public/assets/images/plataformas.png");
    }
    onSecond() {
      if (! gameOver)
      {       
          scoreTime = scoreTime - 1; // One second
          scoreTimeText.setText('Time: ' + scoreTime);
          if (scoreTime == 0) {
              timedEvent.paused = true;
              this.scene.start(
                "Retry",
                { score: score } // se pasa el puntaje como dato a la escena RETRY
              );
       }            
      }
    }

    create() {
      timedEvent = this.time.addEvent({ 
        delay: 1000, 
        callback: this.onSecond, 
        callbackScope: this, 
        loop: true 
      });
        const map = this.make.tilemap({ key: "map3" });
        const tilesetBelow = map.addTilesetImage("fondos", "fondo3");
        const tilesetPlatform = map.addTilesetImage("plataformas", "platform3");

        const belowLayer = map.createLayer("fondos", tilesetBelow, 0, 0);
        const worldLayer = map.createLayer("plataformas", tilesetPlatform, 0, 0);
        const objectsLayer = map.getObjectLayer("objetos");

        worldLayer.setCollisionByProperty({ collides: true });

        const spawnPoint = map.findObject("objetos", (obj) => obj.name === "dude");

        player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "dude");


        player.setBounce(0);
        player.setCollideWorldBounds(true);

        if ((cursors = !undefined)) {
            cursors = this.input.keyboard.createCursorKeys();
        }

        cactus = this.physics.add.group();
        objectsLayer.objects.forEach((objData) => {
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "cactus": {
              var star = cactus.create(x, y, "cactus");
              star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              break;
            }
          }
        });
    
        aloe = this.physics.add.group();
        objectsLayer.objects.forEach((objData) => {
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "aloe": {
              var star = aloe.create(x, y, "aloe");
              star.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
              break;
            }
          }
        });

        bombs = this.physics.add.group();
        objectsLayer.objects.forEach((objData) => {
          const { x = 0, y = 0, name, type } = objData;
          switch (type) {
            case "bomb": {
              var bomb = bombs.create(x, 16, 'bomb');
             bomb.setBounce(1);
              bomb.setCollideWorldBounds(true);
              bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
              bomb.allowGravity = false;
            }
          }
        })
        scoreText = this.add.text(30, 6, "Score:" +score, {
          backgroundcolor: "#FFFF",
          fontSize: "32px",
          fill: "#000",
        });
        scoreTime = 120;
        scoreTimeText = this.add.text(500, 6, "Time:" +scoreTime, {
          fontSize: "32px",
          fill: "#FFFFFF",
        });

        this.physics.add.collider(player, worldLayer);

        this.physics.add.collider(cactus, worldLayer);
        this.physics.add.collider(aloe, worldLayer);
    
        this.physics.add.collider(bombs, worldLayer);
    

        this.physics.add.overlap(player, cactus, this.collectcactus, null, this);
        this.physics.add.overlap(player, aloe, this.collectaloe, null, this);
    
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    
        gameOver = false;
               
    }

    update() {
       

       if (score == 415) {
            this.scene. start("Win", { score: score });  
          }
        if (gameOver) {

          return;
        }
        
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
      
            player.anims.play("left", true);
          } else if (cursors.right.isDown) {
            player.setVelocityX(160);
      
            player.anims.play("right", true);
          } else {
            player.setVelocityX(0);
      
            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.blocked.down) {
            player.setVelocityY(-330);
         }
        
    }

    collectcactus(player, cactus) {
        cactus.disableBody(true, true);
    
        // Estaria bueno diferenciar lospuntajes de ambas manzanas
        score += 10;
        scoreText.setText("Score: " + score);
    
    }
    
    collectaloe (player, aloe) {
        aloe.disableBody(true, true);
        score += 15;
        scoreText.setText("Score: " + score);
    
    }

    hitBomb(player, bomb) {
        this.physics.pause();
    
        player.setTint(0xff0000);
    
        player.anims.play("turn");
    
        gameOver = true;
    
        setTimeout(() => {
          this.scene.start("Retry", { score: score });
        }, 1000);
    }

}
 