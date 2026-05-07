import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaUser, FaIdCard } from "react-icons/fa";

export default function Passbook({ user }) {

  const [data, setData] = useState([]);

  // ✅ LOAD DATA (FIXED API)
  const loadData = async () => {
    try {
      if (!user?.rid) return;

      const res = await axios.get(
        `http://localhost:8080/rduser/transactions/${user.rid}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥🔥 FINAL FIX (IMPORTANT)
  useEffect(() => {
    if (!user?.rid) {
      setData([]);   // 🔥 clear data when user deleted
      return;
    }

    loadData();
  }, [user?.rid]);

  return (
    <div style={main}>

      <h2 style={title}>📘 Passbook History</h2>

      {/* HEADER */}
      <div style={header}>
        <span>ID</span>
        <span>Name</span>
        <span>Account</span>
        <span>Date</span>
        <span>Amount</span>
        <span>Status</span>
      </div>

      {/* LIST */}
      <div style={listBox}>

        {data.length > 0 ? (
          data.map((t) => (
            <div
              key={t.tid}
              style={card}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >

              <span>{t.tid}</span>

              <span style={name}>
                <FaUser /> {t.name}
              </span>

              <span>
                <FaIdCard /> {t.acno}
              </span>

              <span>{t.date}</span>

              <span style={{
                ...amount,
                color: t.type === "CREDIT" ? "#22c55e" : "#ef4444"
              }}>
                {t.type === "CREDIT" ? <FaArrowUp /> : <FaArrowDown />}
                ₹ {t.amount}
              </span>

              <span>
                <span style={t.type === "CREDIT" ? credit : debit}>
                  {t.type}
                </span>
              </span>

            </div>
          ))
        ) : (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            No Transactions Found
          </div>
        )}

      </div>
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

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr",
  fontWeight: "600",
  padding: "10px",
  color: "#6b7280"
};

const listBox = {
  maxHeight: "500px",
  overflowY: "auto"
};

const card = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 2fr 2fr 2fr",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "14px",
  backdropFilter: "blur(10px)",
  background: "rgba(255,255,255,0.7)",
  boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
  transition: "0.3s",
  cursor: "pointer"
};

const name = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "#2563eb"
};

const amount = {
  fontWeight: "700"
};

const credit = {
  background: "#dcfce7",
  color: "#16a34a",
  padding: "5px 12px",
  borderRadius: "20px"
};

const debit = {
  background: "#fee2e2",
  color: "#dc2626",
  padding: "5px 12px",
  borderRadius: "20px"
};