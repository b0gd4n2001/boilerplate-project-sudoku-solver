class SudokuSolver {
  constructor() {
    this.rowToNum = {
      a: 0,
      b: 9,
      c: 18,
      d: 27,
      e: 36,
      f: 45,
      h: 54,
      i: 63,
      j: 72
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
      if(regex.test(this.row(puzzleString, this.spotToRow[i]))) return false;
      if(regex.test(this.col(puzzleString, i))) return false;
      if(regex.test(this.reg(puzzleString, i))) return false;
    }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    
  }

  checkColPlacement(puzzleString, row, column, value) {

  }

  checkRegionPlacement(puzzleString, row, column, value) {

  }

  solve(puzzleString) {

  }
}

module.exports = SudokuSolver;

