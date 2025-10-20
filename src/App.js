import React, { useState } from "react";

export default function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const annual = parseFloat(annualRate);
    const N = parseInt(loanTenure, 10);

    // Validation
    if (
      isNaN(P) || isNaN(annual) || isNaN(N) ||
      P <= 0 || annual <= 0 || N <= 0
    ) {
      alert("⚠️ Please enter valid positive values for Loan Amount, Interest Rate, and Tenure (months).");
      return;
    }

    const R = annual / 12 / 100; // Monthly rate
    // EMI formula
    const numerator = P * R * Math.pow(1 + R, N);
    const denominator = Math.pow(1 + R, N) - 1;
    const emiValue = numerator / denominator;

    const totalPayment = emiValue * N;
    const totalInt = totalPayment - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
  };

  const reset = () => {
    setLoanAmount("");
    setAnnualRate("");
    setLoanTenure("");
    setEmi(null);
    setTotalInterest(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>EMI Calculator</h1>

        <div style={styles.field}>
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="e.g. 500000"
            min="0"
          />
        </div>

        <div style={styles.field}>
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="e.g. 7.5"
            step="0.01"
            min="0"
          />
        </div>

        <div style={styles.field}>
          <label>Loan Tenure (months)</label>
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            placeholder="e.g. 60"
            min="1"
          />
        </div>

        <div style={styles.buttons}>
          <button onClick={calculateEMI} style={styles.calculateBtn}>Calculate EMI</button>
          <button onClick={reset} style={styles.resetBtn}>Reset</button>
        </div>

        {emi !== null && (
          <div style={styles.result}>
            <h3>Results</h3>
            <p><strong>Loan Amount:</strong> ₹{Number(loanAmount).toLocaleString()}</p>
            <p><strong>EMI:</strong> ₹{Number(emi).toLocaleString()}</p>
            <p><strong>Total Interest to be Paid:</strong> ₹{Number(totalInterest).toLocaleString()}</p>
            <p><strong>Total Payment (Principal + Interest):</strong> ₹{(Number(emi) * Number(loanTenure)).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f7f6ff",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  container: {
    width: "420px",
    background: "#ffffff",
    padding: "26px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  title: {
    marginBottom: "18px",
    textAlign: "center",
    color: "#2e2b4f"
  },
  field: {
    marginBottom: "12px",
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
    justifyContent: "center",
  },
  calculateBtn: {
    background: "#6b46c1",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  resetBtn: {
    background: "#e6e6e6",
    color: "#333",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  result: {
    marginTop: "18px",
    background: "#fbfbff",
    padding: "12px",
    borderRadius: "8px",
  }
};
