var globals = {
  globalOffset: {
    x: 0,
    y: 16
  },
  height: 11,
  width: 11,
  tx: 16,
  ty: 16,
  grid_dimensions: {
    row: this.height, 
    column: this.width
  },
  entrance: {
    row: 0,
    column: 2
  },
  exit: {
    row: 5
  },
  acceptableTiles: [-1,25,30,31,32],
  brushMap: {
    brownWall: 34,
    straightDownA: 30,
    straightDownB: 31
  },
  fancyBrushes: [
    { 
      sprite: ['brownWall','brownWall','brownWall',
               'brownWall','straightDownB','straightDownA',
               'brownWall','straightDownB' ,'brownWall'],
      size: [3,3],
      name: 'NS'
    },
    {
      sprite: ['brownWall','brownWall','brownWall',
               'straightDownB','straightDownB','straightDownA',
               'brownWall','brownWall','brownWall'],
      size: [3,3],
      name: 'EW'
    },
    {
      sprite: ['brownWall','brownWall','brownWall',
               'straightDownA','straightDownB','brownWall',
               'brownWall','straightDownB' ,'brownWall'],
      size: [3,3],
      name: 'NS'
    },
    {
      sprite: ['brownWall','straightDownA','brownWall',
               'brownWall','straightDownB','brownWall',
               'brownWall','straightDownB' ,'brownWall'],
      size: [3,3],
      name: 'NS'
    },
    {
      sprite: ['brownWall','straightDownB','brownWall',
               'brownWall','straightDownB','straightDownA',
               'brownWall','brownWall','brownWall'],
      size: [3,3],
      name: 'downRight90'
    },
    {
      sprite: ['brownWall','straightDownA','brownWall',
               'brownWall','straightDownB','brownWall',
               'brownWall','straightDownB' ,'brownWall'],
      size: [3,3],
      name: 'NS'
    },
    {
      sprite: ['brownWall','straightDownB','brownWall',
               'brownWall','straightDownB','straightDownA',
               'brownWall','brownWall','brownWall'],
      size: [3,3],
      name: 'downRight90'
    },
    {
      sprite: ['brownWall','brownWall','brownWall',
               'straightDownB','straightDownB','straightDownA',
               'brownWall','brownWall','brownWall'],
      size: [3,3],
      name: 'EW'
    },
    {
      sprite: ['brownWall','straightDownB','brownWall',
               'straightDownA','straightDownB','brownWall',
               'brownWall','brownWall','brownWall'],
      size: [3,3],
      name: 'upRight90'
    }
  ]
}

const tempGlobalsExit = {
  column: globals.width - 1,
  rowPX: globals.exit.row * globals.ty
}
Object.assign(globals.exit, tempGlobalsExit)

const tempGlobalsExit2 = {
  columnPX: globals.exit.column * globals.ty
}
Object.assign(globals.exit, tempGlobalsExit2)

const tempGlobalsEntrance = {
  rowPX: globals.entrance.row * globals.ty,
  columnPX: globals.entrance.column * globals.ty
}
Object.assign(globals.entrance, tempGlobalsEntrance)

export default globals