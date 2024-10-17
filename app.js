const config = {
    width : window.innerWidth,
    height : window.innerHeight,
    type: Phaser.AUTO,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:750},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
}


var game = new Phaser.Game(config)
let chevalier;
let cursors;
let background;
let ground;
let IsSmall = false;

function preload(){
    this.load.image('chevalier', 'assets/image/chevalier.png')
    this.load.image('background', 'assets/image/neige.jpg')
    this.load.audio('musicfont', 'assets/music/MusiqueFont.mp3')
    this.load.image('vampire', 'assets/image/vampire.png')
    //this.load.spritesheet('chevalier', 'assets/image/animation/chevalier.png')
    
}

function create()
{

    
    var music = this.sound.add('musicfont')
    music.play({
        loop: true,
        volume: 1
    });


    let background = this.add.image(750, 310, 'background');
        background.setDisplaySize(1540, 730);


        chevalier = this.physics.add.image(100 , 450, 'chevalier')
        chevalier.body.collideWorldBounds=true;
        chevalier.setBounce(0.2);
        chevalier.setScale(0.4);
        chevalier.body.setSize(150, 210);

        

        vampire = this.physics.add.image(1310, 380, 'vampire')
        vampire.body.collideWorldBounds=true;
        vampire.setScale(0.25);
        vampire.body.setSize(250,300);
        
        ground = this.physics.add.staticGroup();

    let groundSprite = ground.create(750, 530, 'ground');
        groundSprite.displayWidth = this.scale.width;
        groundSprite.refreshBody();

    let ground1 = ground.create(1120, 470, 'ground');
        ground1.displayWidth = 300;
        ground1.refreshBody();

    let ground2 = ground.create(1395, 365, 'ground')
        ground2.setScale(2.2);
        ground2.displayWidth = 300;
        ground2.refreshBody();

    let ground3 = ground.create(470, 360, 'ground')
        ground3.setScale(2.2);
        ground3.displayWidth = 430;
        ground3.refreshBody();

    let ground4 = ground.create(810, 270, 'ground')
        ground4.setScale(2.2);
        ground4.displayWidth = 250;
        ground4.refreshBody();

    let ground5 = ground.create(85, 275, 'ground')
        ground5.setScale(2.2)
        ground5.displayWidth = 175;
        ground5.refreshBody();
        
        ground.setAlpha(0);

    

    
    this.physics.add.collider(chevalier, ground);
    this.physics.add.collider(vampire, ground);
    this.physics.world.setBoundsCollision(true, true, false, false);
    

    cursors = this.input.keyboard.createCursorKeys()
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
}

function update(){
    chevalier.setVelocityX(0)
    if(cursors.right.isDown){
        chevalier.setFlipX(true)
        chevalier.setVelocityX(300)
    }
    if(cursors.left.isDown){
        chevalier.setFlipX(false)
        chevalier.setVelocityX(-300)
    }

    let isGrounded = chevalier.body.touching.down;
    if (cursors.up.isDown && isGrounded ) {
        chevalier.setVelocityY(-600);
    
    }
    
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)){
        if(IsSmall) {
            chevalier.setVelocityY(-210);
            chevalier.setScale(0.4);
            IsSmall = false;

        }
        else{
            chevalier.body.setSize(30,200);
            chevalier.setScale(0.2);
            IsSmall = true;
        }
    }

}
