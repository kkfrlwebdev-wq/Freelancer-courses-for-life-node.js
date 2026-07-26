import MathOperations from "./MathOperations.mjs";

export default function handleOperation(type, a, b) {
  const mathOperations = new MathOperations();

  switch (type) {
    case "add":
      return mathOperations.add(a, b);

    case "subtract":
      return mathOperations.subtract(a, b);

    case "multiply":
      return mathOperations.multiply(a, b);

    case "divide":
      return mathOperations.divide(a, b);

    default:
      throw new Error("Unknown operation");
  }
}
