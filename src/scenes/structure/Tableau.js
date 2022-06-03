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
        super('level');
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        //Les sons
        this.load.audio('music',['assets/son/musiqueJeu.wav']);
        this.load.audio('ambiance',['assets/son/ambiance.wav']);
        this.load.audio('saut',['assets/son/jump.wav']);
        this.load.audio('dash',['assets/son/dash.wav']);
        this.load.audio('bdfson',['assets/son/bouledefeu.wav']);
        this.load.audio('impactebdf',['assets/son/impactBouledefeu.wav']);
        this.load.audio('sort2',['assets/son/sort2.wav']);
        this.load.audio('mortdrag',['assets/son/mortdragon.wav']);
        this.load.audio('sansliane',['assets/son/sansliane.wav']);
        this.load.audio('avecliane',['assets/son/avecliane.wav']);
        this.load.audio('atckDrake',['assets/son/attaqueDrake.wav']);

        //les images et anim
        this.load.image('sky', 'assets/fond/Fond.png');
        this.load.image('ennemy', 'assets/monster-violet.png');
        this.load.atlas ( 'player', 'assets/anim/runSaut.png', 'assets/anim/runSaut.json');
        this.load.atlas('dragon', 'assets/anim/dragon.png', 'assets/anim/dragon.json');
        this.load.atlas('boule', 'assets/anim/boule.png', 'assets/anim/boule.json');
        this.load.atlas('Collectible', 'assets/anim/Cristale.png', 'assets/anim/Cristale.json');
        this.load.image('BdF', 'assets/BouleDeFeuu.png');
        this.load.image('BdH', 'assets/gege.png');
    }
    create(){
        Tableau.current=this;

        this.input.mouse.disableContextMenu();

        //toutes les musiques

        //Musique principale
        this.bt=this.sound.add('music',{ loop: true });
        this.bt.play()
        this.bt.volume=1

        //Son d'ambiance
        this.amb=this.sound.add('ambiance',{ loop: true });
        this.amb.play()
        this.amb.volume=0.5


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