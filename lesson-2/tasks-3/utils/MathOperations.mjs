export default class MathOperations {
  add(a, b) {
    return parseInt(a) + parseInt(b);
  }

  subtract(a, b) {
    return parseInt(a) - parseInt(b);
  }

  multiply(a, b) {
    return parseInt(a) * parseInt(b);
  }

  divide(a, b) {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }

    return parseInt(a) / parseInt(b);
  }
}
