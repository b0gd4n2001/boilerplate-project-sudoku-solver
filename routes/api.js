'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      res.send({});


    });

  app.route('/api/solve')
    .post((req, res) => {
      let puzzle = req.body?.puzzle;
      console.log(puzzle);
      if (!puzzle) return res.send({ error: 'Required field missing' });
      let validity = solver.validate(puzzle);
      console.log(validity);
      if (validity) return res.send(validity);
      let solution = solver.solve(puzzle);
      console.log(solution)
      if(!solution) return res.send({ error: 'Puzzle cannot be solved' });
      res.send({ solution: solver.solve(req.body.puzzle) });
    });
};
