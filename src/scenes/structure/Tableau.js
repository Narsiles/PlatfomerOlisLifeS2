/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */

class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('blood', 'assets/blood.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('ennemy', 'assets/monster-violet.png');

        this.load.spritesheet('boule', 'assets/particles/Bouledefeu.png',{ frameWidth: 1024, frameHeight: 1024 });
        this.load.atlas ( 'player', 'assets/anim/runSaut.png', 'assets/anim/runSaut.json');
        this.load.image('BdF', 'assets/BouleDeFeuu.png');
        this.load.image('BdH', 'assets/gege.png');
    }
    create(){
        Tableau.current=this;

        this.input.mouse.disableContextMenu();

        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0).setDepth(-1);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);

        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this);
        this.ennemi = new Ennemi(this);
        this.player.player.setMaxVelocity(800,800); //évite que le player quand il tombe ne traverse des plateformes
        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood");
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

    }

    update(){
        super.update();
        this.player.move();
        this.player.player.grimpe=false;
        this.ennemi.update();
    }



    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(){
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Quand on a gagné
     */
   //win(){}

}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;