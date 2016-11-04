class EquationSolver {
  constructor(equation) {
    this.ep = new EquationParser(equation);
    if(this.ep.parse()) {
      this.operators = this.ep.operators;
      this.operands = this.ep.operands;
    } else {
      this.operators = [];
      this.operands = [];
    }
    // equationParser = new EquationParser;
    // [this.operators, this.operands] = equationParser.parse(equation);
  }

  solve(equationHash = { operators: this.operators, operands: this.operands }) {
    let operators = equationHash.operators;
    let numbers = equationHash.operands;
    let operand;
    let operator;
    let result;

    if(operators.filter(function(n) {return n === '('}).length > 0) {
      // to go from outside in, consider switching indexOf and lastIndexOf?
      const openParenIndex = operators.indexOf('(');
      const closeParenIndex = operators.lastIndexOf(')');
      const interiorOperators = operators.slice(openParenIndex + 1, closeParenIndex);
      const interiorOperands = numbers.slice(openParenIndex, closeParenIndex);

      // cut out operators enclosed in parens
      operators = operators.slice(0, openParenIndex).concat(operators.slice(closeParenIndex + 1));
      // replace numbers with solution to nested equation
      numbers = numbers.slice(0, openParenIndex).concat(this.solve({operators: interiorOperators, operands: interiorOperands}), numbers.slice(closeParenIndex));
    }

    while (operators.length > 0) {
      operator = operators.shift();

      if(result === undefined) {
        // when would this happen?
        result = parseInt(numbers.shift());
      }

      // polymorphsim
      switch(operator) {
        case '+':
          operand = parseInt(numbers.shift());
          result = result + operand;
          break;
        case '-':
          operand = numbers.shift();
          result = result - operand;
          break;
        case '*':
          operand = numbers.shift();
          result = result * operand;
          break;
        case '/':
          operand = numbers.shift();
          result = result / operand;
          break;

        default:
          result = result;
      }
    }

    return result;
    // TODO: Handle order of operations
  }
}

es = new EquationSolver('1+(2*3)-4');


console.log(es.solve());
