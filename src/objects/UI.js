class UI extends Phaser.Scene {

    constructor() {
        super('UI');
    }

    preload(){
        this.load.image('cricri', 'assets/ui/cricri.png');
        this.load.image('PdV', 'assets/ui/PdV.png');
        this.load.image('PdT', 'assets/ui/PdToutCourt.png');
        this.load.image('Nop', 'assets/ui/DarkStar.png');
        this.load.image('Yes', 'assets/ui/Star.png');
    }

    create(){
        let me = this;
        const {width, height}= this.scale

        this.add.sprite(65,120,'cricri')
            .setDisplaySize(98,64);

        this.count1 = this.add.text(155 ,125 , objet_fragment,{
            color: '#ff8d30',
            fontFamily: 'cursive',
            fontSize : 35
        })
            .setOrigin(0.5)
            .setAlpha(1);


        //PV
        this.emitter=EventDispatcher.getInstance();
        this.groupeLife=[];
        this.life=3;
        for (let i =0;i<this.life;i++) {
            const life=this.add.image(40+i*40, 50, 'PdV')
            this.groupeLife.push(life)
        };
        this.emitter.on("toucher",this.Rlife,this);

        this.emitter.on("respawn",this.Lrespawn,this);




        //star
        this.groupeStar=[]
        this.starOK = 3;
        for (let i =0;i<this.starOK;i++) {
            const star=this.add.image(560+i*80, 70, 'Nop')
            this.groupeStar.push(star)
        }
    }


    Rlife(){
        if(this.life>=1) {
            this.life--
            this.groupeLife[this.life].setTexture('PdT')

        }
    }

    Lrespawn(){

        this.life=3
        for (let i =0;i<=this.groupeLife.length-1;i++) {
            this.groupeLife[i].setTexture('PdV')
        }
    }


    update(){
        this.count1.setText(Math.round(window.objet_fragment));

    }
}