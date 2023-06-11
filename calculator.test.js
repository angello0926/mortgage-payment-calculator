// Import the function to be tested
const calculateLoanAmount = require("./calculator");
// Test cases
describe("calculateLoanAmount", () => {
  it("calculates the principal loan amount correctly", () => {
    // Test case 1: Monthly payment of $1000, interest rate of 5% (0.05), loan term of 10 years (120 months)
    expect(calculateLoanAmount(1199.1, 0.06, 30, "monthly")).toBeCloseTo(
      200000,
      -2
    );

    expect(calculateLoanAmount(966.89, 0.06, 10, "monthly")).toBeCloseTo(
      87091.54,
      -2
    );

    expect(calculateLoanAmount(599.55, 0.06, 30, "monthly")).toBeCloseTo(
      100000.0,
      -2
    );
  });
});
