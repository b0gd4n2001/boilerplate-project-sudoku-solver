const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;
let strings = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;



suite('Unit Tests', () => {
    test('validate', function () {
        assert.equal(solver.validate(strings[0][0]), true);
    });
    test('row', function () {
        assert.equal(solver.row(strings[0][0], 'a'), '1.5..2.84');
    });
    test('col', function () {
        assert.equal(solver.col(strings[0][0], '1'), '1...834.2');
    });
    test('reg', function () {
        assert.equal(solver.reg(strings[0][0], '1'), '1.5..6.2.');
    });
    test('checkRowPlacement', function () {
        assert.equal(solver.checkRowPlacement(strings[0][0], 'a', 2, 3), true);
    });
    test('checkColPlacement', function () {
        assert.equal(solver.checkColPlacement(strings[0][0], 'a', 2, 3), true);
    });
    test('checkRegionPlacement', function () {
        assert.equal(solver.checkRegionPlacement(strings[0][0], 'a', 2, 3), true);
    });
    test('solve', function () {
        assert.equal(solver.solve(strings[0][0]), strings[0][1]);
        assert.equal(solver.solve(strings[1][0]), strings[1][1]);
        assert.equal(solver.solve(strings[2][0]), strings[2][1]);
        assert.equal(solver.solve(strings[3][0]), strings[3][1]);
        assert.equal(solver.solve(strings[4][0]), strings[4][1]);
    });

});

