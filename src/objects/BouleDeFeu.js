class BouleDeFeu{

    constructor(scene,x,y) {
        this.scene = scene;
        this.emitter=EventDispatcher.getInstance();
        this.Animations();
        const sprite = this.scene.physics.add.sprite(this.scene.player.player.x,this.scene.player.player.y, 'boule').play('boulefeu').setSize(230, 230).setDisplaySize(40, 40)
        sprite.body.setAllowGravity(false);
        sprite.body.setMaxVelocityX(8000);
        sprite.body.setMaxVelocityX(8000);
        this.scene.physics.moveTo(sprite,x,y);
        sprite.setVelocity(sprite.body.velocity.x*8,sprite.body.velocity.y*8)
        this.scene.physics.add.collider(sprite, this.scene.colliders,this.wowow,null,this)


        for(let i=0;i<=this.scene.groupEnnemie.length-1;i++) {
            this.scene.physics.add.overlap(sprite, this.scene.groupEnnemie[i].sprite, (sprite, ennemi) =>  {
                sprite.destroy();
                ennemi.destroy();
                this.emitter.emit('kill');
                ennemi.vivant = false;
                this.mortdrag=this.scene.sound.add('mortdrag',{ loop: false });
                this.mortdrag.play();
                this.mortdrag.volume=0.1;

            }, null, this)}
    }

    wowow(sprite,solides){
        sprite.destroy();
        this.impBDF=this.scene.sound.add('impactebdf',{ loop: false });
        this.impBDF.play();
        this.impBDF.volume=0.05;
    }

    Animations(){
        this.scene.anims.create({
            key: 'boulefeu',
            frameRate:8 ,
            frames: this.scene.anims.generateFrameNames('boule', {start:0 , end:3 , prefix: 'Boule/feu_',suffix:'.png'}),
            repeat: -1
        });
    }


}