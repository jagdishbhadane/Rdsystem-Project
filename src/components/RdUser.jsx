import { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:8080/rduser";

export default function RdUser({ setSelectedUser, setPage }) {

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    rid: "",
    name: "",
    adharno: "",
    amount: ""
  });

  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("");

  // ✅ LOAD USERS
  const loadUsers = async () => {
    try {
      const res = await axios.get(API);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // 🔥🔥 FINAL DELETE (PERFECT)
  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete user?")) return;

      await axios.delete(`${API}/${id}`);

      // 🔥 UI से तुरंत हटाओ
      setData(prev => prev.filter(u => u.rid !== id));

      // 🔥 selected user clear
      setSelectedUser(prev =>
        prev && prev.rid === id ? null : prev
      );

      // 🔥 page reset
      setPage("rduser");

      alert("User + All Data Deleted ✅");

    } catch (err) {
      console.error(err);
      alert("Delete Failed ❌");
    }
  };

  // ✅ OPEN MODAL
  const openModal = (user, t) => {
    setForm({
      rid: user.rid,
      name: user.name,
      adharno: user.adharno,
      amount: ""
    });
    setType(t);
    setShowModal(true);
  };

  // ✅ UPDATE OPEN
  const openUpdate = (user) => {
    setForm({
      rid: user.rid,
      name: user.name,
      adharno: user.adharno,
      amount: user.amount
    });
    setType("update");
    setShowModal(true);
  };

  // ✅ UPDATE
  const handleUpdate = async () => {
    try {
      await axios.put(`${API}/${form.rid}`, {
        name: form.name,
        adharno: form.adharno
      });

      alert("Updated ✅");

      setSelectedUser(prev => ({
        ...prev,
        name: form.name,
        adharno: form.adharno
      }));

      setShowModal(false);
      loadUsers();

    } catch (err) {
      console.error(err);
      alert("Update Failed ❌");
    }
  };

  // ✅ DEPOSIT
  const handleDeposit = async () => {
    try {
      await axios.put(
        `${API}/deposit/${form.rid}?amount=${form.amount}`
      );

      const res = await axios.get(API);
      const freshUser = res.data.find(u => u.rid === form.rid);

      setSelectedUser(freshUser);

      alert("Deposit Success ✅");

      setShowModal(false);
      setPage("passbook");

    } catch (err) {
      console.error(err);
      alert("Deposit Failed ❌");
    }
  };

  // ✅ WITHDRAW
  const handleWithdraw = async () => {
    try {
      await axios.put(
        `${API}/withdraw/${form.rid}?amount=${form.amount}`
      );

      const res = await axios.get(API);
      const freshUser = res.data.find(u => u.rid === form.rid);

      setSelectedUser(freshUser);

      alert("Withdraw Success ✅");

      setShowModal(false);
      setPage("passbook");

    } catch (err) {
      console.error(err);
      alert("Withdraw Failed ❌");
    }
  };
  

  return (
    <div style={main}>

      <h2 style={title}>👥 RD Users</h2>

      <div style={cardBox}>

        <div style={header}>
          <span>ID</span>
          <span>Name</span>
          <span>Account</span>
          <span>Amount</span>
          <span>Actions</span>
        </div>

        {data.map((u) => (
          <div key={u.rid} style={row}>

            <span>{u.rid}</span>

            <span
              style={name}
              onClick={() => {
                setSelectedUser(u);
                setPage("passbook");
              }}
            >
              👤 {u.name}
            </span>

            <span>💳 {u.acno}</span>

            <span style={amount}>₹ {u.amount}</span>

            <span style={actions}>

              <button style={btnBlue}
                onClick={() => openModal(u, "deposit")}>
                Deposit
              </button>

              <button style={btnOrange}
                onClick={() => openModal(u, "withdraw")}>
                Withdraw
              </button>

              <button style={btnGreen}
                onClick={() => openUpdate(u)}>
                Update
              </button>

              <button style={btnRed}
                onClick={() => handleDelete(u.rid)}>
                Delete
              </button>

            </span>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div style={overlay}>
          <div style={modal}>

            <h3>{type.toUpperCase()}</h3>

            {type === "update" ? (
              <>
                <input
                  style={input}
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                <input
                  style={input}
                  value={form.adharno}
                  onChange={(e) =>
                    setForm({ ...form, adharno: e.target.value })
                  }
                />
              </>
            ) : (
              <input
                style={input}
                type="number"
                placeholder="Enter Amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({ ...form, amount: e.target.value })
                }
              />
            )}

            <div style={btnRow}>

              {type === "deposit" &&
                <button style={btnBlue} onClick={handleDeposit}>Confirm</button>}

              {type === "withdraw" &&
                <button style={btnOrange} onClick={handleWithdraw}>Confirm</button>}

              {type === "update" &&
                <button style={btnGreen} onClick={handleUpdate}>Update</button>}

              <button style={btnRed} onClick={() => setShowModal(false)}>
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

/* 🎨 STYLES SAME */

/* STYLES SAME */

/* 🎨 STYLES */

const main = {
  padding: "30px",
  background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
  minHeight: "100vh"
};

const title = {
  fontSize: "24px",
  fontWeight: "700",
  marginBottom: "20px"
};

const cardBox = {
  background: "#fff",
  borderRadius: "14px",
  padding: "20px"
};

const header = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 2fr 3fr",
  fontWeight: "600",
  marginBottom: "10px"
};

const row = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr 2fr 2fr 3fr",
  padding: "15px",
  marginBottom: "10px",
  borderRadius: "10px",
  background: "#f9fafc"
};

const name = { color: "#2563eb", cursor: "pointer" };
const amount = { color: "#16a34a", fontWeight: "700" };

const actions = { display: "flex", gap: "8px" };

const btnBlue = { background: "#2563eb", color: "#fff", padding: "6px", border: "none" };
const btnOrange = { background: "#f59e0b", color: "#fff", padding: "6px", border: "none" };
const btnGreen = { background: "#10b981", color: "#fff", padding: "6px", border: "none" };
const btnRed = { background: "#ef4444", color: "#fff", padding: "6px", border: "none" };

const overlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modal = {
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  width: "300px"
};

const input = {
  width: "100%",
  padding: "8px",
  marginTop: "10px"
};

const btnRow = {
  marginTop: "15px",
  display: "flex",
  justifyContent: "space-between"
};