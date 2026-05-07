import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser
} from "react-icons/fa";

export default function LoanStatus({ user }) {

  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      if (!user?.rid) return;

      const res = await axios.get(
        `http://localhost:8080/loan/user/${user.rid}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [user?.rid]);

  return (
    <div style={main}>

      <h2 style={title}>📊 Loan Status</h2>

      {user ? (
        <div style={card}>

          {/* USER INFO */}
          <div style={userBox}>
            <FaUser /> {user.name} ({user.acno})
          </div>

          {/* LIST */}
          <div style={list}>

            {data.length > 0 ? (
              data.map((l) => (
                <div key={l.id} style={row}>

                  <span>ID: {l.id}</span>

                  <span>₹ {l.amount}</span>

                  <span>{l.date}</span>

                  <span style={
                    l.status === "APPROVED"
                      ? approved
                      : rejected
                  }>
                    {l.status === "APPROVED" ? (
                      <>
                        <FaCheckCircle /> APPROVED
                      </>
                    ) : (
                      <>
                        <FaTimesCircle /> REJECTED
                      </>
                    )}
                  </span>

                </div>
              ))
            ) : (
              <div style={{ textAlign: "center" }}>
                No Loan Records
              </div>
            )}

          </div>

        </div>
      ) : (
        <div style={{ color: "red" }}>
          ⚠️ Please select user first
        </div>
      )}

    </div>
  );
}

/* 🎨 STYLES */

const main = {
  padding: "30px",
  background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
  minHeight: "100vh"
};

const title = {
  fontSize: "26px",
  fontWeight: "700",
  marginBottom: "20px"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "700px",
  margin: "auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const userBox = {
  fontWeight: "600",
  marginBottom: "15px",
  display: "flex",
  gap: "8px"
};

const list = {
  display: "flex",
  flexDirection: "column",
  gap: "10px"
};

const row = {
  display: "flex",
  justifyContent: "space-between",
  padding: "12px",
  background: "#f9fafb",
  borderRadius: "8px"
};

const approved = {
  color: "#16a34a",
  fontWeight: "600"
};

const rejected = {
  color: "#dc2626",
  fontWeight: "600"
};