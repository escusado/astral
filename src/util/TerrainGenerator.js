class TerrainGenerator {
  constructor() {
    console.log("wat");
  }

  generate() {
    console.log("generate");
    return [];
  }
}

export default TerrainGenerator;

// Class("Mountain")({
//   prototype: {
//     init: function (config) {
//       Object.keys(config || {}).forEach(function (property) {
//         this[property] = config[property];
//       }, this);
//       this._generate();
//     },

//     _generate: function () {
//       var resolution = this.resolution; // e.g. 2 ^ 3 + 1 = 9x9 matrix;
//       var randomness = this.randomness;
//       var size = Math.pow(2, resolution) + 1;
//       var middle = Math.floor(size / 2);

//       var seed = this.seed;

//       var grid = [];
//       for (var y = 0; y < size; y++) {
//         grid[y] = [];
//         for (var x = 0; x < size; x++) {
//           grid[y][x] = null;
//         }
//       }

//       /* Assign the center and the corners. This will be the seed */
//       grid[0][0] = grid[0][size - 1] = grid[size - 1][0] = grid[size - 1][
//         size - 1
//       ] = 0;
//       grid[middle][middle] = seed;
//       grid[0][middle] = grid[middle][0] = grid[size - 1][middle] = grid[middle][
//         size - 1
//       ] = 0;

//       var expand = function (coords) {
//         var result = [];
//         coords.forEach(function (y) {
//           coords.forEach(function (x) {
//             result.push([y, x]);
//           });
//         });
//         return result;
//       };

//       var get = function (x, y) {
//         if (x < 0 || x >= grid.length || y < 0 || y >= grid.length) {
//           return undefined;
//         }

//         return grid[y][x];
//       };

//       var getDiamondCoords = function (resolution, currentIter) {
//         var size = Math.pow(2, resolution);
//         var step = size / Math.pow(2, currentIter);
//         var g = [];
//         for (var y = 0; y <= size; y += step) {
//           for (var x = 0; x <= size; x += step) {
//             if (grid[y][x] === null) {
//               g.push([y, x]);
//             }
//           }
//         }
//         return g;
//       };

//       var getSquareCoords = function (resolution, currentIter) {
//         var size = Math.pow(2, resolution);

//         var numberOfDivisions = Math.pow(2, currentIter);
//         var step = size / numberOfDivisions;
//         var g = [];
//         // console.log("Size, step: ", size, step)
//         for (var y = 0; y < size; y += step) {
//           for (var x = 0; x < size; x += step) {
//             g.push([y + step / 2, x + step / 2]);
//           }
//         }
//         return g;
//       };

//       var average = function (array) {
//         return (
//           _.reduce(array, function (mem, n) {
//             return mem + n;
//           }) / array.length
//         );
//       };

//       var squareCheckSize, diamondCheckSize;
//       for (var i = 1; i <= resolution; i++) {
//         // console.log("Iteration: ", i);

//         // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
//         // console.log("Getting Diamonds");
//         var diamonds = getDiamondCoords(resolution, i);
//         // console.log("Diamonds:")
//         diamondCheckSize = Math.pow(2, resolution - i);
//         // console.log("Diamond check size = ", diamondCheckSize);
//         diamonds.forEach(function (coord) {
//           var dX = coord[0],
//             dY = coord[1];

//           var values = [
//             [0, -diamondCheckSize],
//             [diamondCheckSize, 0],
//             [0, diamondCheckSize],
//             [-diamondCheckSize, 0],
//           ].map(function (deltaCoord) {
//             return get(dX + deltaCoord[0], dY + deltaCoord[1]);
//           });

//           var vals = _.filter(values, function (v) {
//             return typeof v !== "undefined";
//           });

//           var result = average(vals) + Math.random() * (randomness / i);

//           // console.log("Values for diamond:", vals, result);

//           grid[dY][dX] = result;
//         });
//         // console.log("Diamonds: ", diamonds);

//         // console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv");

//         if (i !== resolution) {
//           // console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
//           // console.log("Getting squares");

//           // console.log("Squares:")
//           var squares = getSquareCoords(resolution, i);
//           squareCheckSize = Math.pow(2, resolution - i - 1);
//           // console.log("squareCheckSize : ", squareCheckSize)
//           squares.forEach(function (coord) {
//             var dX = coord[0],
//               dY = coord[1];

//             var values = [
//               [-squareCheckSize, -squareCheckSize],
//               [squareCheckSize, -squareCheckSize],
//               [squareCheckSize, squareCheckSize],
//               [-squareCheckSize, squareCheckSize],
//             ].map(function (deltaCoord) {
//               return get(dX + deltaCoord[0], dY + deltaCoord[1]);
//             });

//             var vals = _.filter(values, function (v) {
//               return typeof v !== "undefined";
//             });

//             var result = average(vals) + Math.random() * (randomness / i);

//             // console.log("Values for square:", vals, result);

//             grid[dY][dX] = result;
//           });
//           // console.log("Squares: ", squares);

//           // console.log("]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]]");
//         }
//       }

//       this._grid = grid;
//       return grid;
//     },
//   },
// });
