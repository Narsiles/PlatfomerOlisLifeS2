class TableauTiled extends Tableau{

    preload() {
        super.preload();

        // ------Pers Atmo-------------
        this.load.image('avantBleu', 'assets/fond/AvantBleu.png');
        this.load.image('avantFond2', 'assets/fond/AvantFond2.png');
        this.load.image('avantFond', 'assets/fond/AvantFond.png');
        this.load.image('avantViolet', 'assets/fond/AvantViolet.png');
        this.load.image('derriere', 'assets/fond/derriere.png');
        this.load.image('Save', 'assets/Save.png');
        this.load.image('Lucioles1', 'assets/particles/ContCrist.png');

        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', 'assets/tilemaps/tilesheetFT.png');
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled.json');


        //on y trouve notre étoiles et une tête de mort
        this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
    }

    create() {
        super.create();

        //on en aura besoin...
        let ici = this;



        this.emitter=EventDispatcher.getInstance();

        this.Animation();
        this.currentSaveX = 0;
        this.currentSaveY = 0;

        console.log('Chatte')
        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({key: 'map'});
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tilesheetFT', 'tiles');

        this.cameras.main.setBounds(0,0,16500, 3200 );

        //---- ajoute les plateformes simples ----------------------------
        //this.cameras.main.zoom=0.1

        this.derriere=this.add.image(0, 0, 'derriere').setOrigin(0,0);
        this.derriere.setScrollFactor(0.05,0);

        //Perse Atmo fond
        this.avantFond2=this.add.image(0, 0, 'avantFond2').setOrigin(0,0);
        this.avantFond2.setScrollFactor(0,0);

        this.avantFond=this.add.image(0, 0, 'avantFond').setOrigin(0,0);
        this.avantFond.setScrollFactor(0,0);

        this.bleuFleur = this.map.createLayer('BleuFleur', this.tileset, 0, 0).setOrigin(0,0).setScrollFactor(0.5,1);
        this.bleu = this.map.createLayer('Bleu', this.tileset, 0, 0).setOrigin(0,0).setScrollFactor(0.5,1);

        //Perse Atmo devant bleu
        this.avantBleu=this.add.image(0, 0, 'avantBleu').setOrigin(0,0);
        this.avantBleu.setScrollFactor(0,0);

        this.violetFleur = this.map.createLayer('VioletFleur', this.tileset, 0, 0).setOrigin(0,0).setScrollFactor(0.8,1);
        this.violet = this.map.createLayer('Violet', this.tileset, 0, 0).setOrigin(0,0).setScrollFactor(0.8,1);

        //Perse Atmo devant violet
        this.avantViolet=this.add.image(0, 0, 'avantViolet').setOrigin(0,0);
        this.avantViolet.setScrollFactor(0,0);

        this.fleur = this.map.createLayer('Fleur', this.tileset, 0, 0);


        this.tuto1 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Tuto1').objects.forEach((Tuto1) => {
            this.tuto1Sprite = this.tuto1.create(Tuto1.x , Tuto1.y - Tuto1.height, 'Tuto1').setOrigin(0);
            this.tuto1Sprite.setScale(0.8)
        });

        this.tuto2 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Tuto2').objects.forEach((Tuto2) => {
            this.tuto2Sprite = this.tuto2.create(Tuto2.x , Tuto2.y - Tuto2.height, 'Tuto2').setOrigin(0);
            this.tuto2Sprite.setScale(0.8)
        });

        this.tuto3 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Tuto3').objects.forEach((Tuto3) => {
            this.tuto3Sprite = this.tuto3.create(Tuto3.x , Tuto3.y - Tuto3.height, 'Tuto3').setOrigin(0);
            this.tuto3Sprite.setScale(0.8)
        });

        this.tuto4 = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Tuto4').objects.forEach((Tuto4) => {
            this.tuto3Sprite = this.tuto3.create(Tuto4.x , Tuto4.y - Tuto4.height, 'Tuto4').setOrigin(0);
            this.tuto3Sprite.setScale(0.8)
        });


        this.TourCrist = this.add.particles('Lucioles1');
        this.TourCrist.createEmitter({
            lifespan: 300,
            speed: 150,
            quantity: 200,
            scale: { start: 0.2, end: 0 },
            on: false
        });



        /**
         * Le joueur
         * @type {Player}
         */
        this.player=new Player(this);
        this.player.player.setMaxVelocity(800,800); //évite que le player quand il tombe ne traverse des plateformes

        this.groupEnnemie=[]
        this.map.getObjectLayer('Ennemi').objects.forEach((obj) => {
            this.ennemi = new Ennemi(this,obj.x,obj.y);
            this.groupEnnemie.push(this.ennemi);
        })
        

        //collectible
        this.collect = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Collectible').objects.forEach((collect) => {
            this.collect.create(collect.x, collect.y- collect.height).play('Collectible').setOrigin(0);
            this.physics.add.overlap(this.player.player, this.points, this.collectible, null, this);

        });
        this.physics.add.overlap(this.player.player, this.collect, this.collectible, null, this);


        //---- ajoute les plateformes simples ----------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0).setOrigin(0,0);
        this.devant = this.map.createLayer('Devant', this.tileset, 0, 0).setOrigin(0,0);


        //save
        this.saves = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Save').objects.forEach((save) => {
            this.saves.create(save.x, save.y- save.height, 'Save').setOrigin(0).setVisible(false);
        });
        this.physics.add.overlap(this.player.player, this.saves, this.sauvegarde, null, this);


        // WIN
        this.End = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        this.map.getObjectLayer('Win').objects.forEach((End) => {
            this.EndSprite = this.End.create(End.x , End.y , 'end').setOrigin(0).setVisible(false);
        });
        this.physics.add.overlap(this.player.player, this.EndSprite, this.Credits, null, this);



        //on agrandit le champ de la caméra du coup
        let largeurDuTableau = this.map.widthInPixels;
        let hauteurDuTableau = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player.player, true, );



        //SA COLLIDE OU QUOI
        this.colliders = this.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        const colliderLayer = this.map.getObjectLayer('colliders')
        colliderLayer.objects.forEach(objData => {
            const {x = 0, y = 0, width = 0, height = 0} = objData
            let colliders = this.add.rectangle(x, y, width, height).setOrigin(0, 0)
            if (objData.name === 'stick') {
                colliders.name = objData.name;
            };
            if (objData.name === 'die') {
                colliders.name = objData.name;
            };
            colliders = this.physics.add.existing(colliders);
            this.colliders.add(colliders);
            this.physics.add.collider(colliders, this.player.player, this.death,null,this);
            this.physics.add.collider(colliders, this.ennemi.sprite);
        })

        this.scene.launch('UI')
    }

    Credits(){
        if (this.started){

        } else {
            this.scene.stop('UI')
            this.scene.stop('level')
            this.scene.stop('Start')
            this.scene.start('credits')
            this.started = true ;
        }
    }

    Animation(){

        this.anims.create({
            key: 'Collectible',
            frameRate:6 ,
            frames: this.anims.generateFrameNames('Collectible', {start: 0, end: 3, prefix: 'Cristale/cricri',suffix:'.png'}),
        });

        }

    collectible(player, collect) {

        this.TourCrist.emitParticleAt(collect.x,collect.y);
        collect.destroy();
        window.objet_fragment += 50;
        this.emitter.emit('Point');
    }

    sauvegarde(player, saves) {
        this.currentSaveX = player.x;
        this.currentSaveY = player.y-10;
        saves.body.enable = false;
        //console.log(this.currentSaveX)
    }

    death(colliders,player){
        if (colliders.name === 'die'){
            player.x = this.currentSaveX + 40;
            player.y = this.currentSaveY;
        }
    }

    update(){
        super.update();
        this.groupEnnemie.forEach(Dragon => Dragon.update());
    }

}

