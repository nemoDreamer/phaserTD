/* globals __DEV__ */

import stampit from 'stampit'
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Pathfinding from '../pathfinding/pathfinding'

import base_level from './base_level'

import Prefab from '../prefabs/prefab'
import Player from '../prefabs/player'
import {Cursor, Brush} from '../ui/cursors'

export default class extends base_level {
  init () {
    this.blah = true
    this.prefab_classes = {
        "player": Player
    };

    this.level_data = this.cache.getJSON('level1');

    this.globalOffset = {
      x: 0,
      y: 16
    }

    let tileset_index, tile_dimensions, map;
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;
    
    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;

    // create map and set tileset
    // debugger
    map = this.level_data.map
    this.map = this.game.add.tilemap('level1');
    this.map.tilesets.forEach(function (tileset, i) {
        this.map.addTilesetImage(tileset.name, map.tilesets[i]);
    }, this);

    // this.buildBrush();
    

    // initialize pathfinding
    tile_dimensions = new Phaser.Point(this.map.tileWidth, this.map.tileHeight);
    this.pathfinding = this.game.plugins.add(Pathfinding, this.map.layers[1].data, [-1, 25], tile_dimensions);

    this.signals = {
      playerMove: new Phaser.Signal()
    }
  }

  create () {
    let group_name, object_layer, collision_tiles, tile_dimensions, layerObj;

    this.layers = {}
    this.groups = {
      board: this.game.add.group()
    }

    this.map.layers.forEach((layer) => {
      layerObj = this.map.createLayer(layer.name);
      this.layers[layer.name] = layerObj
      this.groups.board.addChild(layerObj)
      this.layers[layer.name].fixedToCamera = false;
    }, this);

    this.baseLayer = this.layers[this.map.layer.name]
    
    // create groups
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    let data = this.map.objects.objects[0];
    data.y = this.globalOffset.y
    
    this.groups.board.addChild(this.create_object(data))
    

    // // add user input to move player

    // this.createTileSelector()

    this.cursor = Cursor({p:this})
    this.brush = Brush({p:this, paints: [9]})
    // this.buildAndBind_cursor()
    this.maskBoard()


    this.game.input.onDown.add(this.onClick, this);
    window.g = this.game
    window.t = this
    
    this.groups.board.y = this.globalOffset.y
  }

  maskBoard (){
    let rect
    this.mask = game.add.graphics(0, 0);
    this.mask.beginFill(0xffffff);

    game.stage.updateTransform();

    rect = this.layers.background.getBounds()
    this.mask.drawRect(rect.x, rect.y, 320,320);
    this.groups.board.mask = this.mask
  }

  createTileSelector() {
    //  Our tile selection window
    let tileSelector = this.game.add.group();
    this.tileSelector = tileSelector
    let tileSelectorBackground = this.game.make.graphics();
    tileSelectorBackground.beginFill(0x000000, 0.5);
    tileSelectorBackground.drawRect(288, 0, 32, 16);
    tileSelectorBackground.endFill();

    tileSelector.add(tileSelectorBackground);
  }

  

  onClick (point, event){
    // this.setTile.apply(this, arguments)
    this.move_player.apply(this,arguments)
  }
  

  move_player () {
    // console.log('mp', this.getPointFrom('mouse'))
    this.signals.playerMove.dispatch(this.getPointFrom('mouse'))
  }
}
