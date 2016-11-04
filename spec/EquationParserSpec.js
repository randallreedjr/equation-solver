describe('EquationParser', () => {
  // describe('isOperator', () => {
  //   let ep;
  //
  //   beforeEach(() => {
  //     ep = new EquationParser;
  //   });
  //
  //   it('returns true for arithmetic operators', () => {
  //     expect(ep.isOperator('+')).toEqual(true);
  //     expect(ep.isOperator('-')).toEqual(true);
  //     expect(ep.isOperator('*')).toEqual(true);
  //     expect(ep.isOperator('/')).toEqual(true);
  //   });
  //
  //   it('returns true for parens', () => {
  //     expect(ep.isOperator('(')).toEqual(true);
  //     expect(ep.isOperator(')')).toEqual(true);
  //   });
  //
  //   it('returns false for a number', () => {
  //     expect(ep.isOperator('1')).toEqual(false);
  //     expect(ep.isOperator('99')).toEqual(false);
  //   });
  //
  //   it('returns false for a letter', () => {
  //     expect(ep.isOperator('a')).toEqual(false);
  //     expect(ep.isOperator('word')).toEqual(false);
  //   });
  //
  //   it('returns false for a special character', () => {
  //     expect(ep.isOperator('&')).toEqual(false);
  //     expect(ep.isOperator('#')).toEqual(false);
  //     expect(ep.isOperator('[')).toEqual(false);
  //     expect(ep.isOperator(']')).toEqual(false);
  //   });
  // });

  describe('parenBalance', () => {
    it('returns true when parens are in balance', () => {
      let ep = new EquationParser('()');
      expect(ep.parenBalance()).toEqual(true);
    });
    it('returns false when left paren is unmatched', () => {
      let ep = new EquationParser('(()');
      expect(ep.parenBalance()).toEqual(false);
    });
    it('returns false when right paren is unmatched', () => {
      let ep = new EquationParser('())');
      expect(ep.parenBalance()).toEqual(false);
    });
  });

  describe('hasInvalidCharacter', () => {
    it('returns false for valid equation', () => {
      let ep = new EquationParser('1+(2*3)/4-0');
      expect(ep.hasInvalidCharacter()).toEqual(false);
    });

    it('returns true for invalid equation', () => {
      let ep = new EquationParser('hell0+w0rld');
      expect(ep.hasInvalidCharacter()).toEqual(true);
    });
  });

  describe('isValidEquation', () => {
    it('returns true when equation checks pass', () => {
      let ep = new EquationParser();
      spyOn(ep, 'hasInvalidCharacter').and.returnValue(false);
      spyOn(ep, 'parenBalance').and.returnValue(true);

      expect(ep.isValidEquation()).toEqual(true);
    });

    it('returns false when equation has invalid character', () => {
      let ep = new EquationParser();
      spyOn(ep, 'hasInvalidCharacter').and.returnValue(true);
      spyOn(ep, 'parenBalance').and.returnValue(true);

      expect(ep.isValidEquation()).toEqual(false);
    });

    it('returns false when equation has parens out of balance', () => {
      let ep = new EquationParser();
      spyOn(ep, 'hasInvalidCharacter').and.returnValue(false);
      spyOn(ep, 'parenBalance').and.returnValue(false);

      expect(ep.isValidEquation()).toEqual(false);
    });
  });

  describe('parse', () => {
    it('parses out operators and operands', () => {
      let equation = '1+(2*3)-4';
      let ep = new EquationParser(equation);

      ep.parse();
      expect(ep.operators).toEqual(['+','(','*',')','-']);
      expect(ep.operands).toEqual(['1','2','3','4']);
    });
  });
});
