tailwind.config = {
  theme: {
    extend: {
      colors: {
        purple: "#BDB2C9",
        paper: "#F8FBF8",
        pink: "#DCABD2",
        darkBlue: "#343A46",
        yellow: "#D8FC4A",
      },
    },
  },
};

const sr = ScrollReveal({
  reset: true, // Reset the animation when scrolling past the element
  distance: '100px', // Distance the element moves during the animation
  duration: 1000, // Duration of the animation (in milliseconds)
  easing: 'ease-out', // Easing function applied to the animation
  viewFactor: 0.2, // Percentage of the element's visibility required to trigger the animation
});

sr.reveal('.animated', {
  origin: 'top', // Starting position of the element
  delay: 100, // Delay before the animation starts (in milliseconds)
});


const form = document.getElementById("calculator-form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const paymentAmount = parseFloat(
    document.getElementById("payment-amount").value
  );
  const paymentFrequency = document.getElementById("payment-frequency").value;
  const interestRate = parseFloat(
    document.getElementById("interest-rate").value
  );
  const loanTerm = parseFloat(document.getElementById("loan-term").value);
  const downPayment = parseFloat(document.getElementById("down-payment").value);

  let loanAmount;

  loanAmount = calculateLoanAmount(
    paymentAmount,
    interestRate / 100,
    loanTerm,
    paymentFrequency
  );

  const affordablePurchasePrice = calculateAffordablePurchasePrice(
    loanAmount,
    downPayment
  );

  const options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  const formattedAffordablePurchasePrice =
    affordablePurchasePrice.toLocaleString("en-US", options);
  const formattedLoanAmount = loanAmount.toLocaleString("en-US", options);
  const resultDiv = document.getElementById("result");
  const affordablePurchasePriceElement = document.getElementById(
    "affordablePurchasePrice"
  );
  const loanAmountElement = document.getElementById("loanAmount");
  const downpaymentPercentageElement = document.getElementById(
    "downpaymentPercentage"
  );

  affordablePurchasePriceElement.textContent = `$${formattedAffordablePurchasePrice}`;
  loanAmountElement.textContent = `$${formattedLoanAmount}`;
  downpaymentPercentageElement.textContent = `${(
    (downPayment / affordablePurchasePrice) *
    100
  ).toFixed(2)}%`;

});

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

function calculateAffordablePurchasePrice(loanAmount, downPayment) {
  console.log(loanAmount, downPayment);
  const affordablePurchasePrice = loanAmount + downPayment;

  return affordablePurchasePrice;
}


