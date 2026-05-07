import { useState, useEffect } from "react";
import axios from "axios";

import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import RdUser from "./components/RdUser";
import Passbook from "./components/Passbook";
import RdForm from "./components/RdForm";
import Approved from "./components/Approved";
import LoanApply from "./components/LoanApply";
import LoanStatus from "./components/LoanStatus";
import Complaints from "./components/Complaints";
import LoanHistory from "./components/LoanHistory";

export default function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedUser, setSelectedUserState] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // ✅ LOGIN CHECK
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setIsLogin(true);
  }, []);

  // ✅ LOAD DEFAULT USER
  useEffect(() => {
    const loadDefaultUser = async () => {
      try {
        const saved = localStorage.getItem("selectedUser");

        if (saved) {
          setSelectedUserState(JSON.parse(saved));
          return;
        }

        const res = await axios.get("http://localhost:8080/rduser");

        if (res.data?.length > 0) {
          setSelectedUserState(res.data[0]);
          localStorage.setItem("selectedUser", JSON.stringify(res.data[0]));
        }

      } catch (err) {
        console.error(err);
      }
    };

    loadDefaultUser();
  }, []);

  // ✅ HANDLE SELECT USER
  const handleSetSelectedUser = (u) => {

    if (!u) {
      setSelectedUserState(null);
      localStorage.removeItem("selectedUser");
      setPage("rduser");
    } else {
      setSelectedUserState(u);
      localStorage.setItem("selectedUser", JSON.stringify(u));
    }

    setRefresh(prev => !prev);
  };

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  if (!isLogin) return <Login setIsLogin={setIsLogin} />;

  return (
    <div style={{ display: "flex" }}>

      <Sidebar
        setPage={setPage}
        user={selectedUser}
        setIsLogin={handleLogout}
      />

      {/* 🔥🔥 FINAL FIX HERE */}
      <div style={{
        marginLeft: "240px",   // 🔥 220 → 240 (space increase)
        padding: "20px",
        width: "calc(100% - 240px)",  // 🔥 IMPORTANT
        position: "relative",
        zIndex: 1
      }}>

        {page === "dashboard" && <Dashboard />}

        {page === "rduser" && (
          <RdUser
            setPage={setPage}
            setSelectedUser={handleSetSelectedUser}
          />
        )}

        {page === "passbook" && selectedUser && (
          <Passbook
            user={selectedUser}
            refresh={refresh}
          />
        )}

        {page === "rdform" && <RdForm setPage={setPage} />}

        {page === "loanApply" && selectedUser && (
          <LoanApply
            user={selectedUser}
            refresh={refresh}
          />
        )}

        {page === "loanStatus" && (
          <LoanStatus user={selectedUser} />
        )}

        {page === "approved" && <Approved />}
        {page === "complaints" && <Complaints />}
        {page === "loanHistory" && <LoanHistory />}

      </div>
    </div>
  );
}