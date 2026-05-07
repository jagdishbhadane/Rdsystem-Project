import { useEffect, useState } from "react";
import axios from "axios";
import { FaTimesCircle, FaUser } from "react-icons/fa";

export default function Complaints() {

  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/loan/rejected"
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={main}>

      <h2 style={title}>❌ Loan Complaints</h2>

      <div style={card}>

        {/* HEADER */}
        <div style={header}>
          <span>ID</span>
          <span>Name</span>
          <span>Date</span>
          <span>Reason</span>
          <span>Status</span>
        </div>

        {/* DATA */}
        <div style={list}>
          {data.length > 0 ? (
            data.map((l, i) => (
              <div
                key={l.id}
                style={{
                  ...row,
                  background: i % 2 === 0 ? "#fff5f5" : "#ffffff"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 10px rgba(0,0,0,0.05)";
                }}
              >

                <span>{l.id}</span>

                {/* 🔥 USER NAME FIX */}
                <span style={user}>
                  <FaUser />
                  <b>{l.user?.name || "N/A"}</b>
                </span>

                <span>{l.date}</span>

                <span style={reason}>
                  {l.reason}
                </span>

                <span style={status}>
                  <FaTimesCircle /> REJECTED
                </span>

              </div>
            ))
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              No Complaints Found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* 🎨 STYLES */

const main = {
  padding: "30px",
  background: "linear-gradient(135deg,#fee2e2,#f8fafc)",
  minHeight: "100vh"
};

const title = {
  fontSize: "28px",
  fontWeight: "800",
  marginBottom: "20px",
  color: "#dc2626"
};

const card = {
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)"
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 3fr 2fr",
  fontWeight: "700",
  color: "#64748b",
  padding: "10px"
};

const list = {
  maxHeight: "400px",
  overflowY: "auto"
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 3fr 2fr",
  padding: "14px",
  marginBottom: "10px",
  borderRadius: "12px",
  transition: "0.3s",
  cursor: "pointer"
};

const user = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
  color: "#2563eb",
  fontWeight: "600"
};

const reason = {
  color: "#dc2626",
  fontWeight: "600"
};

const status = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
  color: "#dc2626",
  fontWeight: "700"
};