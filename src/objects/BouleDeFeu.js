class BouleDeFeu{

    constructor(scene,x,y) {
        this.scene = scene;
        const sprite = this.scene.physics.add.sprite(this.scene.player.player.x,this.scene.player.player.y,'BdF').setTexture('BdF').setDisplaySize(50,50).setDepth(2000);
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*10,sprite.body.velocity.y*10)
        this.scene.physics.add.collider(sprite, this.scene.colliders,this.wowow,null,this);



        for(let i=0;i<=this.scene.groupEnnemie.length-1;i++) {
            this.scene.physics.add.overlap(sprite, this.scene.groupEnnemie[i].sprite, (sprite, ennemi) =>  {
                sprite.destroy();
                ennemi.destroy();
                ennemi.vivant = false;
                console.log("TAMERE")

            }, null, this)}


    }

    wowow(sprite,solides){
        sprite.destroy();
    }

}