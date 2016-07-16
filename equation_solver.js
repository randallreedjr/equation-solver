
class EquationParser {
  constructor(equation) {
    this.equation = equation;
    this.operators = [];
    this.numbers = [];
    this.hasInvalidCharacter = false;
  }

  isNumber(character) {
    return !!character.match(/[0-9]/);
  }

  isOperator(character) {
    return !!character.match(/[\+\-\*\/\(\)]/);
  }

  parse() {
    let parenBalance = 0;
    let character = "";

    for (let i = 0; i < this.equation.length; i++) {
      character = this.equation[i];
      if(this.isNumber(character)){
        this.numbers.push(parseInt(character));
      } else if(this.isOperator(character)) {
        this.operators.push(character);
        if(character === '(') {
          parenBalance += 1;
        } else if(character === ')') {
          parenBalance -= 1;
        }
      } else {
        this.hasInvalidCharacter = true;
      }
    }

    this.hasInvalidCharacter = this.hasInvalidCharacter || (parenBalance !== 0);

    return !this.hasInvalidCharacter;
  }

  solve() {
    let operators = this.operators;
    let numbers = this.numbers;

    let operand;
    let operator;
    let result;

    // Simple case
    while (operators.length > 0) {
      operator = operators.shift();

      if(result === undefined) {
        result = numbers.shift();
      }

      switch(operator) {
        case '+':
          operand = numbers.shift();
          result = result + operand;
          break;
        case '*':
          operand = numbers.shift();
          result = result * operand;
          break;
        default:
          result = result;
      }
    }

    return result;
    // Call recursively for every set of parens
  }
}

ep = new EquationParser('2*4*2+8');
if(ep.parse()) {
  console.log(ep.solve());
}
