function calculateLoanAmount(
    paymentAmount,
    interestRate,
    loanTerm,
    paymentFrequency
  ) {
    if (paymentFrequency === "biweekly") {
      const biweeklyInterestRate = interestRate / 26.0;
      const loanTermBiweekly = loanTerm * 26;
      return (
        (paymentAmount * ((1 + biweeklyInterestRate) ** loanTermBiweekly - 1)) /
        (biweeklyInterestRate * (1 + biweeklyInterestRate) ** loanTermBiweekly)
      );
    } else {
      const loanTermMonths = loanTerm * 12;
      const monthlyInterestRate = interestRate / 12.0;
      return (
        (paymentAmount * ((1 + monthlyInterestRate) ** loanTermMonths - 1)) /
        (monthlyInterestRate * (1 + monthlyInterestRate) ** loanTermMonths)
      );
    }
  }
  


module.exports = calculateLoanAmount;
