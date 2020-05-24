const SIZE = 30;
const GENERATIONDELAY = 100;

export default {
  name: "conway",

  schema: {
    size: { type: "number" },
    generationDelay: { type: "number" },
  },

  init: function () {
    this.size = this.data.size || window.CONWAY_GRID_SIZE;
    this.width = this.size;
    this.height = this.size;

    this.generationDelay = this.data.generationDelay || GENERATIONDELAY;
    this.present = [];
    this.future = [];

    this.seedLife();

    this.randomizeColors();
    document.body.onkeyup = (e) => {
      if (e.keyCode == 32) {
        this.seedLife();
        this.randomizeColors();
      }
    };
  },

  randomizeColors: function () {
    const darkColors = ["#990044", "#005544", "#003399", "#666600"];
    const brightColors = ["#ff0044", "#FFff00", "#0033ff", "#33aa44"];
    this.darkColor = darkColors[Math.floor(Math.random() * darkColors.length)];
    this.brightColor =
      brightColors[Math.floor(Math.random() * brightColors.length)];
  },

  seedLife: function () {
    this.present = new Array(this.width).fill(null);

    for (let i = 0; i < this.width; i++) {
      if (this.present[i] === null) {
        this.present[i] = new Array(this.height).fill(null);
        this.future[i] = new Array(this.height).fill(null);
      }
      for (let j = 0; j < this.height; j++) {
        this.present[i][j] = Math.round(Math.random());
      }
    }
    // console.table(this.present);
    this.calculateGeneration();
  },

  amIAlive: function (id) {
    return this.present[id.x][id.y];
  },

  calculateGeneration: function () {
    setTimeout(() => {
      this.calculateGeneration();
    }, this.generationDelay);

    // ported from: geeksforgeeks.org/program-for-conways-game-of-life
    for (let l = 0; l < this.width; l++) {
      for (let m = 0; m < this.height; m++) {
        // finding no Of Neighbours
        // that are alive
        let aliveNeighbours = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            let x = l + i;
            let y = m + j;

            // mirror edges
            if (x < 0) {
              x = this.width + i;
            }
            if (y < 0) {
              y = this.height + j;
            }

            if (x === this.width) {
              x = 0;
            }
            if (y === this.height) {
              y = 0;
            }

            aliveNeighbours += this.present[x][y];
          }
        }

        // The cell needs to be subtracted
        // from its neighbours as it was
        // counted before
        aliveNeighbours -= this.present[l][m];

        // Implementing the Rules of Life

        // Cell is lonely and dies
        if (this.present[l][m] == 1 && aliveNeighbours < 2) {
          this.future[l][m] = 0;
        }

        // Cell dies due to over population
        else if (this.present[l][m] == 1 && aliveNeighbours > 3) {
          this.future[l][m] = 0;
        }

        // A new cell is born
        else if (this.present[l][m] == 0 && aliveNeighbours == 3) {
          this.future[l][m] = 1;
        }

        // Remains the same
        else {
          this.future[l][m] = this.present[l][m];
        }
      }
    }

    this.present = JSON.parse(JSON.stringify(this.future));
  },
};
