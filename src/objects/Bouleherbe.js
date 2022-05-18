
class Bouleherbe{

    constructor(scene,x,y) {
        this.scene = scene;
        const sprite = this.scene.physics.add.sprite(this.scene.player.player.x,this.scene.player.player.y,'BdH').setTexture('BdH').setDisplaySize(50,50).setDepth(2000);
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*10,sprite.body.velocity.y*10)
        this.scene.physics.add.collider(sprite, this.scene.colliders,this.destroy,null,this);
    }

    destroy(sprite,collidersHit){
        console.log(collidersHit)
        if(collidersHit.name==='stick'){
            this.colliders = this.scene.add.rectangle(collidersHit.x-50, collidersHit.y, collidersHit.width, collidersHit.height).setOrigin(0, 0)
            this.colliders = this.scene.physics.add.existing(this.colliders)
            this.scene.colliders.add(this.colliders)
            this.scene.physics.add.overlap(this.colliders,this.scene.player.player,this.grimpe,null,this)
            console.log('stick')
        }
        sprite.destroy()
    }

    grimpe(collider,player){
        player.grimpe=true;

        }


}