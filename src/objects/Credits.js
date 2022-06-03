class credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload(){

        this.load.image('credit', 'assets/ui/logoanto.png');
        this.load.image('Credits', 'assets/Start/Credit.png');

    }

    create() {

        const back = this.add.image(-80, 0, 'credit').setOrigin(0, 0);

        const buttonNextSprite = this.add.image(1000, 600, 'Credits')
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0.7)
            .setVisible(true);
        back.setScale(1.1)


        this.buttonNext = this.add.rectangle(buttonNextSprite.x, buttonNextSprite.y,350,150,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {
                this.scene.start('Start')
            })
            .on('pointerover',function(){
                buttonNextSprite.setAlpha(1);
            })
            .on('pointerout',function(){
                buttonNextSprite.setAlpha(0.7);
            })


    }
}