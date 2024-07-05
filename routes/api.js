'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) return res.send({ error: 'Required field(s) missing' });
      let [row, column] = [coordinate.toLowerCase()[0], Number(coordinate[1])];
      let response = {};
      let conflict = [];
      if (!(/^[A-I][1-9]$/.test(coordinate))) return res.send({ error: 'Invalid coordinate'});
      if (!(/^[1-9]$/.test(value))) return res.send({ error: 'Invalid value'});
      let validity = solver.validate(puzzle);
      if (validity) return res.send(validity);
      if (!solver.checkRowPlacement(puzzle, row, column, value)) conflict.push('row')
      if (!solver.checkColPlacement(puzzle, row, column, value)) conflict.push('column')
      if (!solver.checkRegionPlacement(puzzle, row, column, value)) conflict.push('region')
      if (conflict.length != 0) {
        response.valid = false;
        response.conflict = conflict;
      } else {
        response.valid = true;
      }
      res.send(response);
    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body?.puzzle;
      if (!puzzle) return res.send({ error: 'Required field missing' });
      let validity = solver.validate(puzzle);
      if (validity) return res.send(validity);
      let solution = solver.solve(puzzle);
      if (!solution) return res.send({ error: 'Puzzle cannot be solved' });
      res.send({ solution: solver.solve(req.body.puzzle) });
    });
};
