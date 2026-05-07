import { useState } from "react";
import {
  FaBars, FaHome, FaUser, FaBook,
  FaSignOutAlt, FaPlus,
  FaCheckCircle, FaMoneyBill,
  FaChartBar, FaExclamationCircle,
  FaHistory
} from "react-icons/fa";

export default function Sidebar({ setPage, user, setIsLogin }) {

  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("dashboard");

  const [profileImg, setProfileImg] = useState(
    localStorage.getItem("profileImg") || null
  );

  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const img = URL.createObjectURL(file);
      setProfileImg(img);
      localStorage.setItem("profileImg", img);
    }
  };

  return (
    <div style={{
      ...styles.sidebar,
      width: open ? "220px" : "70px"
    }}>

      <div>

        {/* TOGGLE */}
        <div style={styles.toggle} onClick={() => setOpen(!open)}>
          <FaBars />
        </div>

        {/* PROFILE */}
        <div style={styles.profile}>
          <label htmlFor="upload">
            <img
              src={
                profileImg ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="profile"
              style={styles.img}
            />
          </label>

          <input
            type="file"
            id="upload"
            style={{ display: "none" }}
            onChange={handleImage}
          />

          {open && (
            <div>
              <h4>{user?.name || "Jagdish"}</h4>
              <p style={styles.acc}>{user?.acno || "AC1023"}</p>
            </div>
          )}
        </div>

        {/* ===== MENU ===== */}

        <Menu icon={<FaHome />} text="Dashboard"
          active={active === "dashboard"} open={open}
          onClick={() => { setPage("dashboard"); setActive("dashboard"); }}
        />

        <Menu icon={<FaPlus />} text="Add RD User"
          active={active === "rdform"} open={open}
          onClick={() => { setPage("rdform"); setActive("rdform"); }}
        />

        <Menu icon={<FaUser />} text="RD User"
          active={active === "rduser"} open={open}
          onClick={() => { setPage("rduser"); setActive("rduser"); }}
        />

        <Menu icon={<FaBook />} text="Passbook"
          active={active === "passbook"} open={open}
          onClick={() => { setPage("passbook"); setActive("passbook"); }}
        />

        {/* 🔥 APPLY LOAN */}
        <Menu
          icon={<FaMoneyBill />}
          text="Apply Loan"
          active={active === "loanApply"}
          open={open}
          onClick={() => {
            setPage("loanApply");
            setActive("loanApply");
          }}
        />

        {/* 🔥 LOAN STATUS */}
        <Menu
          icon={<FaChartBar />}
          text="Loan Status"
          active={active === "loanStatus"}
          open={open}
          onClick={() => {
            setPage("loanStatus");
            setActive("loanStatus");
          }}
        />

        {/* 🔥 APPROVED */}
        <Menu
          icon={<FaCheckCircle />}
          text="Approved Loans"
          active={active === "approved"}
          open={open}
          onClick={() => {
            setPage("approved");
            setActive("approved");
          }}
        />

        {/* 🔥 COMPLAINTS */}
        <Menu
          icon={<FaExclamationCircle />}
          text="Complaints Report"
          active={active === "complaints"}
          open={open}
          onClick={() => {
            setPage("complaints");
            setActive("complaints");
          }}
        />

        {/* 🔥 FINAL: LOAN HISTORY */}
        <Menu
          icon={<FaHistory />}
          text="Loan History"
          active={active === "loanHistory"}
          open={open}
          onClick={() => {
            setPage("loanHistory");
            setActive("loanHistory");
          }}
        />

      </div>

      {/* LOGOUT */}
      <div style={styles.logout} onClick={handleLogout}>
        <FaSignOutAlt />
        {open && <span style={styles.text}>Logout</span>}
      </div>

    </div>
  );
}

/* MENU */
function Menu({ icon, text, active, open, onClick }) {
  return (
    <div
      style={{
        ...styles.menu,
        background: active ? "#6366f1" : "transparent",
        color: active ? "#fff" : "#cbd5e1"
      }}
      onClick={onClick}
    >
      {icon}
      {open && <span style={styles.text}>{text}</span>}
    </div>
  );
}

/* STYLES */
const styles = {
  sidebar: {
    height: "100vh",
    background: "#1e293b",
    color: "#fff",
    position: "fixed",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  toggle: { padding: "15px", cursor: "pointer" },
  profile: { display: "flex", gap: "10px", padding: "10px" },
  img: { width: "50px", borderRadius: "50%" },
  acc: { fontSize: "12px", color: "#94a3b8" },
  menu: {
    padding: "12px",
    margin: "5px 10px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    gap: "10px"
  },
  text: { marginLeft: "5px" },
  logout: {
    padding: "12px",
    margin: "10px",
    background: "#dc2626",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    gap: "10px"
  }
};