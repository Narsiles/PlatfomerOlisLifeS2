## 1

On rentre dans le vif du sujet, on attaque notre platfomer.

Dans ce repo vous avez une structure de projet qui fonctionne et que vous pouvez conserver et améliorerer bien entendu.
Le jeu est visible sur https://davidmarsprof.github.io/platformer. Vous noterez le petit pad qui permet de jouer sur mobile.
Ce pad n'est pas par défaut dans Phaser, c'est un petit bout de code que j'ai ajouté, on y reviendra (ou pas).

### Structure du projet

#### Les fichiers à la racine

- index.html

Le fichier qui contient votre jeu et un lien vers les ressources javascript nécessaires. 
Vous retournerez dans ce fichier chaque fois que vous voudrez ajouter une nouvelle classe (une scène, un monstre, un artefact...) à votre projet.

- main.css

Pas grand chose à dire ici car Phaser se charge de presque tout pour vous.

- main.js

C'est le fichier d'entrée de votre jeu. 
C'est ici que vous définirez **vos scènes et l'ordre dans lequel elles apparaissent**. 
Vous toucherez aussi assez souvent à la config qui vous permettra de **switcher entre le mode debug ou pas**.

#### Le répertoire `vendor`

Ce répertoire contient pour le moment uniquement le framework Phaser. Vous n'aurez pas à y toucher.

**Notes**:
*Dans la documentation, vous verrez souvent des termes comme `npm`, `yarn`, `package.json` ou `node_modules`. 
Tout ceci fait référence à ce que l'on appelle des gestionnaires de package ou de dépendances.
Si on voulait bien faire les choses, il faudrait les utiliser mais pour ne pas trop se prendre la tête dans ce cours, 
on zappe ces notions car elles ne vous apporteraient pas grand chose*

#### Le répertoire `assets`

C'est ici qu'on met les images, les sons, les vidéos et cie utilisés dans le jeu

#### Le répertoire `src`

On utilise le terme _src_ pour dire _sources_. C'est bien ici qu'on a le code source de notre jeu.

#### Le répertoire `src/scenes`

C'est ici que se trouvent les différentes scènes de votre jeu: Tableau00, Tableau01, Tableau02 etc...

#### Le répertoire `src/objects`

C'est ici qu'on met les classes des monstres, des pateformes, des décors etc... 


### Étude des tableaux 00 à 04

On va apprendre à :

- rajouter une scène (un tableau)
- jouer avec la gravité 
- positionner des éléments
- gérer nos premières collisions.
  
## 2
  
### Étude des tableaux 04 et 05

- les groupes d'étoiles
- les groupes de plateformes
- extend de tableau (de scene sur le plan technique)
- les collisions de groupe
- les mouvements de décor en tilesprite
- introdution aux tweens

### à la maison

- mise en ligne du projet via github
- évangélistes création de la listes des projets


## 3

### Étude des tableaux 06 et 07

#### Création d'un zoo

- on crée un tableau tout simple qu'on appelle zoo
   - on met une seule étoile tout à droite du tableau
   - pas de plateformes
    
- on va s'inspirer du monstre violet (Tableau06) pour créer notre propre monstre
- puis un second monstre avec design et comportement différent...à vous de jouer!

- on va rapidement jeter un oeil au Tableau07
   - quel est l'intérêt de créer des objets ?
   - comment créer des objets réutilisables ?


## 4

- Factorisation de monstres en classes

## 5

- Les décors en parallaxe


## 6

- Le parallaxe
- Les équilibrages de propriétés physiques
- Pratique




## 7

### Point sur les projets de fin d'année

- quelles compétences acquérir ?
- quelles compétences verrons-nous en cours et quelles compétences vous apprendrez par vous-même ? 

### étude d'un gros level

Maintenant que nous avons acquis pas mal de notions et que nous avons été confrontés à la réalisation d'un mini level *propre* nous allons apprendre à agencer toutes ces notions ensemble au travers d'un *worklflow*.  

- Le résultat est [visible ici](https://davidmarsprof.github.io/platformer/)
- Le code source est [visible ici](https://github.com/davidmarsprof/platformer/blob/main/src/scenes/TableauTiled.js)

Ce tableau va évoluer au fil du temps, il y a déjà beaucoup de notions à ce jour mais ce ne sera pas suffisant compte tenu de vos ambitions pour les projets de fin d'année.

### Tiled

Comment se servir de [Tiled](https://thorbjorn.itch.io/tiled), un petit logiciel qui permet de designer des levels et de les importer dans Phaser (entre autre).

Ce cours est grandement inspiré de ce tuto:
https://stackabuse.com/phaser-3-and-tiled-building-a-platformer/

Quand vous aurez acquis ces notions de base et bien compris le workflow, je vous invite à plonger dans ce tuto plus avancé, vous y découvrirez des alternatives interessantes... ou non en fonction de vos objectifs.
https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6


#### Tiled config & layers

- Télécharger [Tiled](https://thorbjorn.itch.io/tiled)
- L'installer
- Configurer une map
- Importer un tilset
- Créer des layers
- Les exporter pour Phaser

#### Dans Phaser : import, config & layers

- JSON c'est quoi ?
- importer les tiles (là normalement ça marche pas car vous avez mal nommé des calques et variables et vous râlez)
- afficher les tiles dans la scène (idem vous râlez pour les mêmes raisons)
- gérer les collisions avec `setCollisionByExclusion`
- retour dans Tiled pour créer une variable de collision
- gérer des collisions avec `setCollisionByProperty`
- On fait des modifs dans Tiled, on exporte le JSON, on recharge le jeu, ça marche ( si la console est ouverte et qu'on a bien coché l'option pour pas avoir de cache)
- On fait des modifs dans Tiled, on exporte le JSON, on recharge le jeu, ça marche !
- On fait des modifs dans Tiled, on exporte le JSON, on recharge le jeu, ça marche !
- On fait des modifs dans Tiled, on exporte le JSON, on recharge le jeu, ça marche !
- On a compris qu'on avait un workflow pour faire du level design sans écrire une ligne de code.
- On fait des modifs dans **Photoshop** sur une tile dans notre PNG, on recharge le jeu et...je vous laisse comprendre à quoi va ressembler cette fn d'année scolaire.

#### Dans Tiled : les Objects

Les layers dans Tiled servent à créer des plateformes qui ne bougent pas et qui peuvent produire des collision ou non avec les reste des éléments.
Les layers permettent aussi de jouer sur les niveaux de profondeur.

Les Objets sont des layers qui vont être utilisés afin de gérer des objets plus complèxes voire abstraits: des plateformes qui bougent, des étoiles, des monstres, des passages secrets, des bonus, des checkpoints, des effets graphiques etc...

- création d'un layer Objects
- On va y placer des étoiles (sauf que ce sera pas des étoiles dans tiled)
- On exporte

#### Dans Phaser : Créer des étoiles en fonction de cet object

- JSON, on va ragarder à quoi ressemble cet Object
- Parcourir les éléments d'un object à partir de `getObjectLayer`
- Regarder dans la console à quoi ça ressemble
- C'est parti on affiche des étoiles.
- On fait des modifs dans Tiled, on exporte le JSON, on recharge le jeu, ça marche !
- On a compris qu'on avait un workflow pour faire du level design sans écrire une ligne de code suplémentaire.

#### Des monstres?

- On fait la même chose avec des montres ?
- A vous de jouer !

#### Des plateformes qui bougent ?

- A vous de jouer !



### Les Particules

- les blend modes
- les emitters
- texture packer et atlas






