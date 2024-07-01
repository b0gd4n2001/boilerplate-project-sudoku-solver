let strings = require('./puzzle-strings.js').puzzlesAndSolutions

class SudokuSolver {
  constructor() {
    this.rowToNum = {
      a: 0,
      b: 9,
      c: 18,
      d: 27,
      e: 36,
      f: 45,
      g: 54,
      h: 63,
      i: 72
    }
    this.rowToSpot = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      i: 9
    }
    this.spotToRow = {
      1: 'a',
      2: 'b',
      3: 'c',
      4: 'd',
      5: 'e',
      6: 'f',
      7: 'g',
      8: 'h',
      9: 'i'
    }
    this.regToNum = {
      1: 0,
      2: 3,
      3: 6,
      4: 27,
      5: 30,
      6: 33,
      7: 54,
      8: 57,
      9: 60
    }
    this.regToColRow = {
      1: 'abc123',
      2: 'abc456',
      3: 'abc789',
      4: 'def123',
      5: 'def456',
      6: 'def789',
      7: 'ghi123',
      8: 'ghi456',
      9: 'ghi789'
    }
  }

  row(puzzleString, row) {
    let rowNum = this.rowToNum[row]
    return puzzleString.slice(rowNum, rowNum + 9);
  }

  col(puzzleString, col) {
    let str = '';
    for (let i = col - 1; i < 81; i += 9) {
      str += puzzleString[i];
    }
    return str;
  }

  reg(puzzleString, reg) {
    reg = this.regToNum[reg];
    let str = '';
    str += puzzleString[reg];
    str += puzzleString[reg + 1];
    str += puzzleString[reg + 2];
    str += puzzleString[reg + 9];
    str += puzzleString[reg + 10];
    str += puzzleString[reg + 11];
    str += puzzleString[reg + 18];
    str += puzzleString[reg + 19];
    str += puzzleString[reg + 20];
    return str;
  }

  validate(puzzleString) {
    if (!(puzzleString.match(/^[1-9\.]+$/)[0].length == 81)) return false;
    let regex = /([1-9]).*\1/
    for (let i = 0; i < 9; i++) {
      if (regex.test(this.row(puzzleString, this.spotToRow[i]))) return false;
      if (regex.test(this.col(puzzleString, i))) return false;
      if (regex.test(this.reg(puzzleString, i))) return false;
    }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    value = `${value}`;
    let str = this.row(puzzleString, row).split('');
    str[column - 1] = '.';
    return !(str.includes(value));
  }

  checkColPlacement(puzzleString, row, column, value) {
    value = `${value}`;
    let str = this.col(puzzleString, column).split('');
    str[this.rowToSpot[row] - 1] = '.';
    return !(str.includes(value));
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    value = `${value}`
    let puzzleArray = puzzleString.split('');
    let region;
    puzzleArray[this.rowToNum[row] + column - 1] = '.';
    for (let i = 1; i <= 9; i++) {
      if (!(this.regToColRow[i].includes(row))) continue;
      if (!(this.regToColRow[i].includes(`${column}`))) continue;
      region = i;
      break;
    };
    return !(this.reg(puzzleArray.join(''), region).includes(value));
  }

  solve(puzzleString) {
    if (!puzzleString.includes('.')) return puzzleString
    let puzzleArray = puzzleString.split('');
    let posible;
    let lastIndex;
    for (let i = 0; i < 81; i++) {
      if (puzzleString[i] != '.') continue;
      posible = [];
      let row = this.spotToRow[Math.ceil((i + 1) / 9)];
      let column = (i % 9) + 1;
      for (let value = 1; value <= 9; value++) {
        if (!(this.checkRowPlacement(puzzleString, row, column, value))) continue;
        if (!(this.checkColPlacement(puzzleString, row, column, value))) continue;
        if (!(this.checkRegionPlacement(puzzleString, row, column, value))) continue;
        posible.push(value);
      }
      if (posible.length == 0) return null;
      lastIndex = i;
      if (posible.length == 1) {
        puzzleArray[i] = posible[0];
        return this.solve(puzzleArray.join(''));
      }
    }
    for (let j of posible) {
      puzzleArray[lastIndex] = j;
      let maybe = this.solve(puzzleArray.join(''));
      if (maybe) return maybe;
    };

  }
}

let solver = new SudokuSolver;

module.exports = SudokuSolver;

