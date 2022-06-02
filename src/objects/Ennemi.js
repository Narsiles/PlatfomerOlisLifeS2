class Ennemi {


    constructor(scene,x,y) {
        this.scene = scene;
        this.cameras = scene;
        this.Animations();
        this.sprite=this.scene.physics.add.sprite(x, y,'Idle','Dragon/drag1.png')
        this.sprite.play('Idle', true)
        this.sprite.setDisplaySize(150,150)
        this.sprite.body.setSize(80, 80);
        this.sprite.body.setOffset(35,35);
        this.scene.physics.add.collider(this.sprite,this.scene.collide);
        this.projectil=false;
        this.sprite.vivant=true;
        this.sprite.body.setAllowGravity(false);
        this.emitter=EventDispatcher.getInstance()
    }
    update(){
        if(Phaser.Math.Distance.Between(this.scene.player.player.x,this.scene.player.player.y,this.sprite.x,this.sprite.y)<500 && this.sprite.vivant===true){
            this.fire()
        }
    }
    fire(){
        if(this.projectil===false) {
            this.projectil = true
            this.drake = this.scene.sound.add('atckDrake', {loop: false});
            this.drake.play();
            this.drake.volume = 0.1;
            this.scene.time.delayedCall(1150,()=>{
                this.boule = this.scene.physics.add.sprite(this.sprite.x, this.sprite.y, 'boule').play('boule').setSize(230, 230).setDisplaySize(60, 60)
                this.boule.body.setAllowGravity(false)
                this.scene.physics.moveTo(this.boule, this.scene.player.player.x, this.scene.player.player.y)
                this.boule.setVelocityX(this.boule.body.velocity.x * 5)
                this.boule.setVelocityY(this.boule.body.velocity.y * 5)
                const life = this.scene.time.delayedCall(4000, () => {
                    this.boule.destroy()
                    this.projectil = false
                    console.log('yolo')
                })

                this.scene.physics.add.collider(this.boule, this.scene.colliders, (boule) => {
                    boule.destroy()
                    life.destroy()
                    this.projectil = false
                }, null, this);

                this.scene.physics.add.collider(this.boule, this.scene.player.player, (boule, player) => {
                    player.life-=1
                    boule.destroy()
                    life.destroy()
                    this.emitter.emit("toucher")
                    this.projectil = false
                }, null, this)
            })
        }
    }

    Animations(){
        this.scene.anims.create({
            key: 'boule',
            frameRate: 6,
            frames: this.scene.anims.generateFrameNames('boule', {start: 0, end: 4, prefix: 'Boule/gel_',suffix:'.png'}),
            repeat: -1
        });

        this.scene.anims.create({
            key: 'Idle',
            frameRate:6 ,
            frames: this.scene.anims.generateFrameNames('dragon', {start: 1, end: 6, prefix: 'Dragon/drag',suffix:'.png'}),
            repeat: -1
         });
    }
}