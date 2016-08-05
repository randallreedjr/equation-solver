class EquationParser {
  constructor(equation) {
    this.equation = equation;
    this.operators = [];
    this.operands = [];
    this.hasInvalidCharacter = false;
    this.operatorRegex = /[\+\-\*\/\(\)]/;
  }

  isNumber(character) {
    return !!character.match(/[0-9]+/);
  }

  isOperator(character) {
    return !!character.match(this.operatorRegex);
  }

  parenBalance() {
    const openParens = this.equation.match(/\(/g);
    const closeParens = this.equation.match(/\)/g);
    const openCount = openParens ? openParens.length : 0;
    const closeCount = closeParens ? closeParens.length : 0;
    return openCount === closeCount;
  }

  isValidEquation() {
    // Non-numeric and not an operator or empty parens
    const hasInvalidCharacter = !!(this.equation.match(/[^0-9\*\-\(\)\+\/]/) || this.equation.match(/\(\)/));
    // Unbalanced parens
    return !hasInvalidCharacter && this.parenBalance();
  }

  parse() {
    if(!this.isValidEquation()) {
      return false;
    }

    this.operands = this.equation.split(this.operatorRegex).filter(function(n) { return n !== ""});
    this.operators = this.equation.split('').filter(function(n) { return !n.match(/\d/) })

    return true;
  }

  solve() {
    let operators = this.operators;
    let numbers = this.operands;

    let operand;
    let operator;
    let result;

    // Simple case
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
    // TODO: Call recursively for every set of parens
  }
}

ep = new EquationParser('1+(2*3)-4');
if(ep.parse()) {
  console.log(ep.solve());
} else {
	console.log('Invalid equation!');
}
