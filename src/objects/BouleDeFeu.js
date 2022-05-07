class BouleDeFeu{

    constructor(scene,x,y) {
        this.scene = scene;
        const sprite = this.scene.physics.add.sprite(this.scene.player.player.x,this.scene.player.player.y,'BdF').setTexture('BdF').setDisplaySize(50,50).setDepth(2000);
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*5,sprite.body.velocity.y*5)
        this.scene.physics.add.collider(sprite, this.scene.solides,this.destroy,null,this);
    }

    destroy(sprite,solides){
        sprite.destroy()
    }

}