
class Bouleherbe{

    constructor(scene,x,y) {
        this.scene = scene;
        this.Animations();
        const sprite = this.scene.physics.add.sprite(this.scene.player.player.x,this.scene.player.player.y,'boule').play('bouleherbe').setSize(230, 230).setDisplaySize(40, 40);
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*8,sprite.body.velocity.y*8)
        this.scene.physics.add.collider(sprite, this.scene.colliders,this.destroy,null,this);

    }

    destroy(sprite,collidersHit){
        console.log(collidersHit)
        if(collidersHit.name==='stick'){
            this.colliders = this.scene.add.rectangle(collidersHit.x-25, collidersHit.y, collidersHit.width, collidersHit.height).setOrigin(0, 0)
            this.colliders = this.scene.physics.add.existing(this.colliders)
            this.scene.colliders.add(this.colliders)
            this.scene.physics.add.overlap(this.colliders,this.scene.player.player,this.grimpe,null,this)
            this.liane=this.scene.sound.add('avecliane',{ loop: false });
            this.liane.play();
            this.liane.volume=0.6;
            console.log('stick')
        }
        else{
            this.liane=this.scene.sound.add('sansliane',{ loop: false });
            this.liane.play();
            this.liane.volume=0.1;
        }
        sprite.destroy()
    }

    grimpe(collider,player){
        player.grimpe=true;
        }

    Animations(){
        this.scene.anims.create({
            key: 'bouleherbe',
            frameRate:8 ,
            frames: this.scene.anims.generateFrameNames('boule', {start:0 , end:3 , prefix: 'Boule/herbe_',suffix:'.png'}),
            repeat: -1
        });
    }

}