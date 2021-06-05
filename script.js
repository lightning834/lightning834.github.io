var gamewidth = 800;
var gameheight = 600;

var config = {
    type: Phaser.AUTO,
    width: gamewidth,
    height: gameheight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var round = 0;
var roundtext;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    this.add.image(400, 300, 'sky');

    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
       key: 'star',
    repeat: 8,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group({
        allowGravity: false,
        debugShowVelocity: true
    });

    roundtext = this.add.text(16, 16, 'round: 0', { fontSize: '32px', fill: '#000' });
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
   // this.physics.add.collider(bombs, platforms);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-200);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(200);

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

function collectStar (player, star)
{
    star.disableBody(true, true);
    //score += 1;
    

    if (stars.countActive(true) === 0)
    {
        stars.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);
            roundtext.setText('Round: ' + round++);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        //var bomb = bombs.create(x, 16, 'bomb');
        //bomb.setBounce(1);
        //bomb.setCollideWorldBounds(false);
        //bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        //this.allowgravitybombs.false

        //bombs = this.physics.add.group({
        //    key: 'bomb',
        //    repeat: 12,
        //});

        var bombX = Math.random() * gamewidth;
        var bombY = Math.random() * gameheight;

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);

        var bomb = bombs.create(bombX, bombY, 'bomb');
        bomb.setVelocityX( Math.random() * 300 - 150);
        bomb.setVelocityY( Math.random() * 300 - 150);
    }
}

function allowgravity()
{

}

function hitBomb (player, bomb)
{
    this.physics.pause();
    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
