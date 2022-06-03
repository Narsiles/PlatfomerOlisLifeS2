class Player{
    constructor(scene) {
        console.log('player');
        this.scene = scene;
        this.player = this.scene.physics.add.sprite(50, 2900, 'attack').setOrigin(0, 0);
        this.player.body.setSize(40, 95);
        this.player.body.setOffset(14,10);

        this.d = 1;
        this.lockDash=0;
        this.spaceDown=false;
        this.shiftDown=false;
        this.qDown=false;
        this.dDown=false;
        this.zDown=false;
        this.sDown=false;
        this.lock=false;
        this.player.life=3;
        this.player.grimpe=false;
        this.animation();
        this.initKeyboardQWERTY();
        this.direction='right';
        this.initKeyboard();
        window.objet_fragment = this.player.collect;
        window.objet_fragment = 0;
        this.emitter=EventDispatcher.getInstance();
        this.emitter.on('kill',()=>{
            window.objet_fragment += 100;
            console.log(this.player.collect);
        },this)
        this.emitter.on("toucher",this.checklife,this)




        this.scene.input.on('pointerdown', (pointer)=> {
            if (pointer.leftButtonDown() && this.player.grimpe === false){
            new BouleDeFeu(this.scene,pointer.worldX,pointer.worldY);
                this.bdfson=this.scene.sound.add('bdfson',{ loop: false });
                this.bdfson.play();
                this.bdfson.volume=0.05;

            }
        });

        this.scene.input.on('pointerdown', (pointer)=> {
            if (pointer.rightButtonDown() && this.player.grimpe === false){
                this.BouleHerbe = new Bouleherbe(this.scene,pointer.worldX,pointer.worldY);
                this.sort2=this.scene.sound.add('sort2',{ loop: false });
                this.sort2.play();
                this.sort2.volume=0.07;
                console.log("Pute")
            }
        });

    }

    animation(){

        this.scene.anims.create({
            key: 'run',
            frameRate:6 ,
            frames: this.scene.anims.generateFrameNames('player', {start: 0, end: 6, prefix: 'Marche/Marche_',suffix:'.png'}),
        });

        this.scene.anims.create({
            key: 'saut',
            frameRate:8 ,
            frames: this.scene.anims.generateFrameNames('player', {start:0 , end:2 , prefix: 'Saut/Saut_',suffix:'.png'}),
        });

        this.scene.anims.create({
            key: 'idle',
            frameRate:8 ,
            frames: this.scene.anims.generateFrameNames('player', {start:0 , end:5 , prefix: 'Idle/Idle_',suffix:'.png'}),
        });



    }

    checklife(){
        if (this.player.life===0){
            this.player.x=this.scene.currentSaveX + 40;
            this.player.y=this.scene.currentSaveY;
            this.player.life=5

            this.emitter.emit("respawn")
        }
    }

    //ICI ON MET NOS RACCOURCIS !
    dashR(){
        if(this.dDown && this.shiftDown) {
            if (this.lockDash == 0) {
                this.lockDash = 1;
                this.dash=this.scene.sound.add('dash',{ loop: false });
                this.dash.play();
                this.dash.volume=0.05;
                let me = this;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    d: '+=10',
                    ease: 'Circ.easeInOut',
                    duration: 250,
                    onComplete: function () {
                        me.d = 1;
                        me.shiftDown = false;
                        me.lockDash = 0;
                    }
                });
            }
        }
        console.log('dash');
    }
    dashL() {
        if (this.qDown && this.shiftDown) {
            if (this.lockDash == 0) {
                this.lockDash = 1;
                this.dash=this.scene.sound.add('dash',{ loop: false });
                this.dash.play();
                this.dash.volume=0.05;
                let me = this;
                this.tween = this.scene.tweens.add({
                    targets: this,
                    d: '+=10',
                    ease: 'Circ.easeInOut',
                    duration: 250,
                    onComplete: function () {
                        me.d = 1;
                        me.shiftDown = false;
                        me.lockDash = 0;
                    }
                });
            }
            console.log('dash');
        }
    }

    initKeyboard() {
        let me = this;

        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown = true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.zDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.sDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=true;
                    break;
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=false;
                    me.lock=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SHIFT:
                    me.shiftDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.zDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.sDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=false;
                    break;
            }
        });
    }
    initKeyboardQWERTY() {
        let me = this;
        this.scene.input.on('pointerup', function (pointer) {
            if (pointer.leftButtonReleased()) {

                me.leftMouseDown = true;

            }
        });
    }

    //TOUTES LES FONCTIONS JUSQU'A **MOVE** CONCERNENT LES DEPLACEMENTS !


    //SAUT
    jump() {
        this.canJump = false;
        this.player.play('saut',true);
        this.player.setVelocityY(-460);
        //son
        this.saut=this.scene.sound.add('saut',{ loop: false });
        this.saut.play()
        this.saut.volume=0.3
        console.log('jump');
    }

    //DEPLACEMENT VERS LA DROITE
    moveRight() {

        this.player.setVelocityX(250*this.d);
        this.player.setFlipX(false);

        if (this.player.body.onFloor()) {

            // this.player.play('walk', true)
        }
    }

    moveRightRelease() {
        // ralenti droite
        switch (true) {
            case this.flagright:
                // fais rien
                break;
            case !this.dDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagright = true;
                break;
            default:
                break;
        }
    }


    //DEPLACEMENT VERS LA GAUCHE
    moveLeft() {
        this.player.setVelocityX(-250*this.d);
        this.player.setFlipX(true)
        if (this.player.body.onFloor()) {
            // this.player.play('walk', true)
        }
        this.player.setFlipX(true);
    }

    moveLeftRelease() {
        // ralenti gauche
        switch (true) {
            case this.flagleft:
                // fais rien
                break;
            case !this.qDown && !this.player.body.onFloor():
                this.player.setVelocityX(this.player.body.velocity.x * 0.6);
                this.flagleft = true;
                break;
            default:
                break;
        }
    }

    //CETTE FONCTION SERT A ARRETER LE JOUEUR QUAND ON VA VERS LA DROITE/GAUCHE. SINON ON COURS SANS S'ARRETER QUAND ON KEYUP.
    stop() {
        this.player.setVelocityX(0);

        if (this.player.body.onFloor()) {
            this.player.play('idle',true)
        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.6);
            this.player.setVelocityY(this.player.body.velocity.y * 0.6);
        }
    }


    //CETTE FONCTION SERT A ARRETER LE JOUEUR QUAND ON VA VERS LA DROITE/GAUCHE. SINON ON COURS SANS S'ARRETER QUAND ON KEYUP.
    stop() {
        if (this.player.body.onFloor()) {
            this.player.setVelocityX(0);
            if(this.canJump) {
                this.player.play('idle', true)
            }

        } else {
            this.player.setVelocityX(this.player.body.velocity.x * 0.6);
            this.player.setVelocityY(this.player.body.velocity.y * 0.6);
        }
    }

    //CETTE FONCTION INITIALISE TOUS LES DEPLACEMENTS
    move() {

        if(this.player.body.onFloor()){
            this.canJump=true
        }
        if (this.spaceDown && this.player.body.onFloor() && this.canJump) {
            this.jump();
            this.flag = false;
        }

        if (this.qDown && this.shiftDown){
            this.dashL();
        }
        if (this.dDown && this.shiftDown) {
            this.dashR();
        }

        if(this.zDown === true && this.player.grimpe === true){
           this.player.setVelocityY(-200);
        }

        if(this.sDown === true && this.player.grimpe === true){
            this.player.setVelocityY(200);
        }

        switch (true) {
            case this.qDown:
                if(this.canJump === true){
                    this.player.play('run', true)
                }
                this.moveLeft()
                this.direction='left'
                this.flagleft = false;
                break;
            case this.dDown:
                if(this.canJump === true){
                    this.player.play('run', true)
                }
                this.moveRight();
                this.direction='right'
                this.flagright = false;
                break;
            case this.player.body.onFloor():
                this.stop();
                break;
            case this.player.body.onFloor(false):
                break;
        }
        this.moveRightRelease();
        this.moveLeftRelease();
    }

    update(){

    }


}