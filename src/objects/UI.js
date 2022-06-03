class UI extends Phaser.Scene {

    constructor() {
        super('UI');
    }

    preload(){
        this.load.image('cricri', 'assets/ui/cricri.png');
        this.load.image('PdV', 'assets/ui/PdV.png');
        this.load.image('PdT', 'assets/ui/PdToutCourt.png');
        this.load.image('Nop', 'assets/ui/NoStar.png');
        this.load.image('One', 'assets/ui/OneStar.png');
        this.load.image('Two', 'assets/ui/TwoStar.png');
        this.load.image('Three', 'assets/ui/ThreeStar.png');
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
        this.star = this.add.image(640, 70,'Nop');
        this.emitter.on("kill",this.Star,this);
        this.emitter.on("Point",this.Star,this);
    }


    Star(){
        if(objet_fragment === 800) {
            this.oneStar = this.add.image(640, 70,'One');
            this.star.setVisible(false);
        }
        else if(objet_fragment === 3000) {
            this.TwoStar =this.add.image(640, 70,'Two');
            this.oneStar.setVisible(false);
        }
        else if(objet_fragment === 4000) {
            this.add.image(640, 70,'Three');
            this.TwoStar.setVisible(false);
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