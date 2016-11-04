describe('EquationParser', () => {
  describe('solve', () => {
    it('solves a simple addition expression', () => {
      solver = new EquationSolver('2+2');
      expect(solver.solve()).toEqual(4);
    });

    it('solves a simple subtraction expression', () => {
      solver = new EquationSolver('3-2');
      expect(solver.solve()).toEqual(1);
    });

    it('solves a simple multiplication expression', () => {
      solver = new EquationSolver('3*5');
      expect(solver.solve()).toEqual(15);
    });

    it('solves a simple division expression', () => {
      solver = new EquationSolver('12/2');
      expect(solver.solve()).toEqual(6);
    });

    it('handles extra whitespace', () => {
      solver = new EquationSolver('2 + 2');
      expect(solver.solve()).toEqual(4);
    });
  });
});
