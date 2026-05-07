import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {

  const [flip, setFlip] = useState(false);

  const [dash, setDash] = useState({
    totalUsers: 0,
    totalBalance: 0,
    totalDebit: 0,
    activeUsers: 0,
    recentTransactions: []
  });

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    loadDashboard();

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:8080/rduser/dashboard");
      setDash(res.data || {});
    } catch (err) {
      console.error("Dashboard Error 👉", err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning ☀️";
    if (hour < 18) return "Good Afternoon 🌤️";
    return "Good Evening 🌙";
  };

  // ✅ SAFE %
  const percent = dash.totalBalance
    ? (dash.totalBalance / 50000) * 100
    : 0;

  return (
    <div style={styles.main}>

      <h2 style={styles.title}>Umang Finance System</h2>

      <div style={styles.container}>

        {/* CARD */}
        <div
          style={styles.flipCard}
          onMouseEnter={() => setFlip(true)}
          onMouseLeave={() => setFlip(false)}
        >
          <div style={{
            ...styles.inner,
            transform: flip ? "rotateY(180deg)" : "rotateY(0deg)"
          }}>

            <div style={styles.front}>
              <div style={styles.top}>
                <span>Umang Finance</span>
                <span><b>VISA</b></span>
              </div>

              <div style={styles.middle}>
                <div>
                  <div style={styles.chip}></div>
                  <p style={styles.number}>4321 8910 5432 2026</p>
                  <small>Card Holder</small>
                  <p>Jagdish</p>
                </div>

                <div>
                  <small>Balance</small>
                  <h4>₹ {dash.totalBalance || 0}</h4>
                  <small>Valid</small>
                  <p>12/30</p>
                </div>
              </div>
            </div>

            <div style={styles.back}>
              <div style={styles.strip}></div>
              <div style={styles.cvv}>123</div>
            </div>

          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>

          <div style={styles.cardRow}>

            <div style={styles.card}>
              💸 Total Debit
              <h3>₹ {dash.totalDebit || 0}</h3>
            </div>

            <div style={styles.card}>
              💰 Total Balance
              <h3>₹ {dash.totalBalance || 0}</h3>
            </div>

            <div style={styles.cardLight}>
              📈 Active Users
              <h3>{dash.activeUsers || 0}</h3>
            </div>

          </div>

          {/* TOP */}
          <div style={styles.topPanel}>

            <div style={styles.goalCard}>
              <h4>🎯 Monthly Target</h4>
              <p>₹ {dash.totalBalance || 0} / ₹50000</p>

              <div style={styles.progressBar}>
                <div
                  style={{
                    ...styles.progressFill,
                    width: `${percent}%`   // ✅ FIXED
                  }}
                ></div>
              </div>

              <small>{Math.floor(percent)}% Completed</small>
            </div>

            <div style={styles.alertCard}>
              <h3>{getGreeting()}, Jagdish 👋</h3>
              <p>🕒 {time.toLocaleTimeString()}</p>
              <p>📅 {time.toLocaleDateString()}</p>
              <p style={{ color: "#00ff88" }}>🟢 System Active</p>
            </div>

          </div>

        </div>

      </div>

      {/* TRANSACTIONS */}
      <div style={styles.extra}>
        <div style={styles.sideCard}>

          <h4>Recent Transactions</h4>

          <div style={styles.txnHeader}>
            <div>Date</div>
            <div>Type</div>
            <div style={{ textAlign: "right" }}>Amount</div>
          </div>

          {(dash.recentTransactions || []).map((t, i) => (
            <div key={i} style={styles.txnRow}>
              <div>{t.date}</div>
              <div style={{ color: t.type === "CREDIT" ? "green" : "red" }}>
                {t.type}
              </div>
              <div style={{ textAlign: "right" }}>
                ₹ {t.amount}
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}

/* STYLES */
const styles = {
  main: { padding: "25px", background: "#f8fafc" },
  title: { fontSize: "28px", fontWeight: "900" },
  container: { display: "flex", gap: "30px" },
  right: { flex: 1, display: "flex", flexDirection: "column", gap: "20px" },
  cardRow: { display: "flex", gap: "20px" },

  card: {
    flex: 1,
    background: "#6366f1",
    color: "#fff",
    padding: "18px",
    borderRadius: "14px"
  },

  cardLight: {
    flex: 1,
    background: "#fff",
    padding: "18px",
    borderRadius: "14px"
  },

  topPanel: { display: "flex", gap: "20px" },

  goalCard: {
    flex: 1,
    background: "#fff",
    padding: "20px",
    borderRadius: "14px"
  },

  alertCard: {
    flex: 1,
    background: "#6366f1",
    color: "#fff",
    padding: "20px",
    borderRadius: "14px"
  },

  progressBar: {
    height: "10px",
    background: "#e5e7eb",
    borderRadius: "10px"
  },

  progressFill: {
    height: "100%",
    background: "#22c55e"
  },

  extra: { marginTop: "25px" },

  sideCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "14px"
  },

  txnHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    fontWeight: "700"
  },

  txnRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    padding: "10px"
  },

  flipCard: { width: "320px", height: "180px", perspective: "1000px" },

  inner: {
    width: "100%",
    height: "100%",
    transition: "0.5s",
    transformStyle: "preserve-3d",
    position: "relative"
  },

  front: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#3b82f6",
    color: "#fff",
    padding: "15px",
    borderRadius: "12px",
    backfaceVisibility: "hidden"
  },

  back: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "#111",
    color: "#fff",
    borderRadius: "12px",
    transform: "rotateY(180deg)",
    backfaceVisibility: "hidden"
  },

  strip: { height: "40px", background: "#000", marginTop: "20px" },
  cvv: { textAlign: "right", padding: "10px" },
  chip: { width: "40px", height: "30px", background: "gold" },
  number: { letterSpacing: "2px" },
  middle: { display: "flex", justifyContent: "space-between" },
  top: { display: "flex", justifyContent: "space-between" }
};