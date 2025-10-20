import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [visible, setVisible] = useState(false);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const annual = parseFloat(annualRate);
    const N = parseInt(loanTenure, 10);

    if (!P || !annual || !N || P <= 0 || annual <= 0 || N <= 0) {
      alert("⚠️ Please enter valid positive values for all fields.");
      return;
    }

    const R = annual / 12 / 100;
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalPayment = emiValue * N;
    const totalInt = totalPayment - P;

    setEmi(emiValue.toFixed(2));
    setTotalInterest(totalInt.toFixed(2));
    setVisible(true);
  };

  const reset = () => {
    setLoanAmount("");
    setAnnualRate("");
    setLoanTenure("");
    setEmi(null);
    setTotalInterest(null);
    setVisible(false);
  };

  return (
    <div className="page">
      <div className="card fade-in">
        <h1 className="title">💰 EMI Calculator</h1>

        <div className="input-group">
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="e.g. 500000"
          />
        </div>

        <div className="input-group">
          <label>Annual Interest Rate (%)</label>
          <input
            type="number"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
            placeholder="e.g. 7.5"
          />
        </div>

        <div className="input-group">
          <label>Loan Tenure (months)</label>
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            placeholder="e.g. 60"
          />
        </div>

        <div className="btn-group">
          <button className="calc-btn" onClick={calculateEMI}>
            Calculate EMI
          </button>
          <button className="reset-btn" onClick={reset}>
            Reset
          </button>
        </div>

        {visible && emi && (
          <div className="result slide-up">
            <h3>Results</h3>
            <p><strong>Loan Amount:</strong> ₹{loanAmount}</p>
            <p><strong>EMI:</strong> ₹{emi}</p>
            <p><strong>Total Interest:</strong> ₹{totalInterest}</p>
            <p><strong>Total Payment:</strong> ₹{(emi * loanTenure).toFixed(2)}</p>
          </div>
        )}
      </div>
    </div>
  );
}
