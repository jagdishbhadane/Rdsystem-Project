import { useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaInfoCircle
} from "react-icons/fa";

export default function LoanApply({ user }) {

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const applyLoan = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8080/loan/apply/${user.rid}`
      );
      setResult(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error applying loan");
      setLoading(false);
    }
  };

  return (
    <div style={main}>

      <h2 style={title}>🏦 Loan Apply</h2>

      {/* 🔷 TERMS */}
      <div style={termsCard}>
        <h3 style={termsTitle}>
          <FaInfoCircle /> Terms & Conditions
        </h3>

        <ul style={termsList}>
          <li>Loan is allowed only after sufficient RD balance.</li>
          <li>Minimum 45 days account age required.</li>
          <li>Maximum loan = <b>40% of RD balance</b>.</li>
          <li>₹5000 → ₹2000 | ₹10000 → ₹4000</li>
          <li>Incorrect details may lead to rejection.</li>
        </ul>
      </div>

      {/* 🔵 LOAN CARD */}
      <div
        style={loanCard}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
          e.currentTarget.style.boxShadow = "0 25px 60px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.08)";
        }}
      >

        {user ? (
          <>
            <div style={userBox}>
              <FaUser />
              <span>{user.name}</span>
              <span>({user.acno})</span>
            </div>

            <div style={balance}>
              Balance: ₹ {user.amount}
            </div>

            <button
              style={btn}
              onClick={applyLoan}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 12px 30px rgba(59,130,246,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(59,130,246,0.4)";
              }}
            >
              {loading ? "Processing..." : "Apply Loan"}
            </button>

            {result && (
              <div style={resultBox}>
                {result.status === "APPROVED" ? (
                  <div style={approved}>
                    <FaCheckCircle /> Approved ₹ {result.amount}
                  </div>
                ) : (
                  <div style={rejected}>
                    <FaTimesCircle /> {result.reason}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div style={{ color: "red" }}>
            ⚠️ Please select user first
          </div>
        )}

      </div>

    </div>
  );
}

/* 🎨 STYLES */

const main = {
  padding: "30px",
  minHeight: "100vh",
  background: "linear-gradient(135deg,#eef2ff,#f8fafc)"
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "20px"
};

const termsCard = {
  background: "linear-gradient(135deg, #d1fae5, #ccfbf1)",
  padding: "22px",
  borderRadius: "16px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
  marginBottom: "30px",
  border: "1px solid #a7f3d0"
};

const termsTitle = {
  marginBottom: "12px",
  display: "flex",
  gap: "8px",
  fontWeight: "700",
  color: "#065f46"
};

const termsList = {
  paddingLeft: "20px",
  lineHeight: "1.9",
  color: "#064e3b"
};

const loanCard = {
  background: "#fff",
  padding: "35px",
  borderRadius: "18px",
  maxWidth: "520px",
  margin: "auto",
  boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
  textAlign: "center",
  transition: "all 0.35s ease"
};

const userBox = {
  display: "flex",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "700",
  fontSize: "16px",
  marginBottom: "12px"
};

const balance = {
  marginBottom: "20px",
  color: "#16a34a",
  fontWeight: "800",
  fontSize: "18px"
};

const btn = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(45deg,#3b82f6,#6366f1)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "16px",
  boxShadow: "0 8px 20px rgba(59,130,246,0.4)",
  transition: "all 0.3s ease"
};

const resultBox = {
  marginTop: "18px"
};

const approved = {
  color: "#16a34a",
  fontWeight: "800",
  fontSize: "18px"
};

const rejected = {
  color: "#dc2626",
  fontWeight: "800",
  fontSize: "18px"
};