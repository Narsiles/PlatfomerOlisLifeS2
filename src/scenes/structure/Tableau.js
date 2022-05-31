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
        this.load.image('sky', 'assets/fond/Fond.png');
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
        this.sky.setScrollFactor(0,0);


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