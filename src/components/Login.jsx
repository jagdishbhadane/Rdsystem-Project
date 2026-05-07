import { useState } from "react";
import axios from "axios";

export default function Login({ setIsLogin }) {

  const [mobile, setMobile] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // 🔹 validation
    if (!/^[0-9]{10}$/.test(mobile)) {
      alert("Enter valid mobile number");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/login", {
        mobile,
      });

      alert(res.data.message || "Login Success");

      if (typeof setIsLogin === "function") {
        setIsLogin(true);
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div style={styles.container}>

      <form onSubmit={handleLogin} style={styles.card}>
        
        <h2 style={styles.title}>RD Banking System</h2>
        <p style={styles.subtitle}>Secure Login</p>

        {/* MOBILE INPUT */}
        <div style={styles.inputBox}>
          <span style={styles.prefix}>+91</span>
          <input
            type="text"
            placeholder="Enter mobile"
            value={mobile}
            maxLength={10} // 🔥 max 10 digit
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // 🔥 only number
              setMobile(value);
            }}
            style={styles.input}
          />
        </div>

        {/* 🔥 HINT */}
        <p style={styles.hint}>
          Enter 10 Digit Mobile Number
        </p>

        {/* LOGIN BUTTON */}
        <button type="submit" style={styles.button}>
          Login
        </button>

        {/* FORGET */}
        <p
          style={styles.forget}
          onMouseEnter={(e)=> e.target.style.textDecoration="underline"}
          onMouseLeave={(e)=> e.target.style.textDecoration="none"}
          onClick={() => alert("Recovery / Support")}
        >
          Forget number?
        </p>

        {/* FOOTER */}
        <p style={styles.footer}>
          Secure banking system • Trusted service
        </p>

      </form>

    </div>
  );
}

/* 🎨 STYLES */

const styles = {

  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #5f2c82, #ff4b2b)",
    fontFamily: "Arial, sans-serif",
  },

  card: {
    background: "#f5f5f5",
    padding: "45px",
    borderRadius: "14px",
    width: "380px",
    minHeight: "300px",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
  },

  title: {
    margin: 0,
    color: "#2c3e50",
    fontWeight: "700",
    fontSize: "22px",
  },

  subtitle: {
    fontSize: "13px",
    color: "#888",
    marginBottom: "20px",
    marginTop: "5px",
  },

  inputBox: {
    display: "flex",
    border: "1px solid #ccc",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "10px",
    background: "#fff",
  },

  prefix: {
    background: "#eaeaea",
    padding: "10px",
    fontSize: "14px",
    color: "#444",
  },

  input: {
    border: "none",
    padding: "10px",
    width: "100%",
    outline: "none",
  },

  hint: {
    fontSize: "12px",
    color: "#888",
    textAlign: "left",
    marginBottom: "15px"
  },

  button: {
    width: "100%",
    padding: "14px",
    background: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
  },

  forget: {
    marginTop: "12px",
    fontSize: "13px",
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500"
  },

  footer: {
    fontSize: "11px",
    color: "#777",
    marginTop: "15px",
  },
};