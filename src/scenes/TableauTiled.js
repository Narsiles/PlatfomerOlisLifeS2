class TableauTiled extends Tableau{

    preload() {
        super.preload();
        // ------pour TILED-------------
        // nos images
        this.load.image('tiles', 'assets/tilemaps/tilesheetFT.png');
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled.json');

        // -----et puis aussi-------------
        this.load.image('monster-fly', 'assets/monster-fly.png');
        this.load.image('night', 'assets/night.jpg');
        //on y trouve notre étoiles et une tête de mort
        this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
    }

    create() {
        super.create();

        //on en aura besoin...
        let ici = this;

        console.log('Chatte')
        //--------chargement de la tile map & configuration de la scène-----------------------

        //notre map
        this.map = this.make.tilemap({key: 'map'});
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tilesheetFT', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau = this.map.widthInPixels;
        let hauteurDuTableau = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player.player, true, 1, 1);

        //---- ajoute les plateformes simples ----------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        this.devant = this.map.createLayer('devant', this.tileset, 0, 0);

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
                colliders.name = objData.name
            }
            ;
            colliders = this.physics.add.existing(colliders)
            this.colliders.add(colliders)
            this.physics.add.collider(colliders, this.player.player)
            this.physics.add.collider(colliders, this.ennemi.sprite)
        })


    }


    update(){
        super.update();

    }

}

