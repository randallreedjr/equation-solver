class EquationParser {
  constructor(equation) {
    this.equation = equation;
    this.operators = [];
    this.operands = [];
    this.operatorRegex = /[\+\-\*\/\(\)]/;
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
    return !hasInvalidCharacter() && this.parenBalance();
  }

  hasInvalidCharacter() {
    // Non-numeric and not an operator or empty parens
    return !!(this.equation.match(/[^0-9\*\-\(\)\+\/]/) || this.equation.match(/\(\)/));
  }

  parse() {
    if(!this.isValidEquation()) {
      return false;
    }

    this.operands = this.equation.split(this.operatorRegex).filter(function(n) { return n !== ""});
    this.operators = this.equation.split('').filter(function(n) { return !n.match(/\d/) })

    return true;
  }
}
