class EquationSolver {
  constructor(equation) {
    this.ep = new EquationParser(equation);
    this.operators = [];
    this.operands = [];
  }

  solve(equationHash = { operators: null, operands: null }) {
    if(!this.ep.parse()) {
      console.log('Invalid equation!');
      return;
    } else {
      this.operators = this.ep.operators;
      this.operands = this.ep.operands;
    }

    let operators = equationHash.operators || this.operators;
    let numbers = equationHash.operands || this.operands;
    let operand;
    let operator;
    let result;

    if(operators.filter(function(n) {return n === '('}).length > 0) {
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
        result = parseInt(numbers.shift());
      }

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
