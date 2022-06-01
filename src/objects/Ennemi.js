class Ennemi {


    constructor(scene,x,y) {
        this.scene = scene;
        this.cameras = scene;
        this.Animations();
        this.sprite=this.scene.physics.add.sprite(x, y,'Idle','Dragon/dragon_1.png')
        this.sprite.play('Idle', true)
        this.scene.physics.add.collider(this.sprite,this.scene.collide);
        this.projectil=false;
        this.sprite.vivant=true;
        this.sprite.body.setAllowGravity(false);
    }
    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<500 && this.sprite.vivant===true){
            this.fire()
        }
    }
    fire(){
        if(this.projectil===false) {
            this.projectil = true
            this.drake=this.scene.sound.add('atckDrake',{ loop: false });
            this.drake.play();
            this.drake.volume=0.1;
            this.boule = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'boule').play('boule').setSize(230, 230).setDisplaySize(300, 300)
            this.boule.body.setAllowGravity(false)
            this.scene.physics.moveTo(this.boule, this.scene.player.player.x,this.scene.player.player.y)
            this.boule.setVelocityX(this.boule.body.velocity.x*5)
            this.boule.setVelocityY(this.boule.body.velocity.y*5)
            const life=this.scene.time.delayedCall(4000,()=>{
                this.boule.destroy()
                this.projectil=false
                console.log('yolo')
            })

            this.scene.physics.add.collider(this.boule, this.scene.colliders,(boule)=> {
                boule.destroy()
                life.destroy()
                this.projectil=false
            }, null,this);

            this.scene.physics.add.collider(this.boule, this.scene.player.player, (boule, player) => {
                boule.destroy()
                // player.body.enable=false
                // player.visible=false
                life.destroy()
                this.projectil=false
            }, null, this)
        }

    }
    Animations(){
        this.scene.anims.create({
            key: 'boule',
            frames: this.scene.anims.generateFrameNumbers('boule', {start: 4, end: 63}),
            frameRate: 120,
            repeat: -1
        });

        this.scene.anims.create({
          key: 'Idle',
         frameRate:4 ,
         frames: this.scene.anims.generateFrameNames('dragon', {start: 0, end: 5, prefix: 'Dragon/dragon_',suffix:'.png'}),
         });
    }
}