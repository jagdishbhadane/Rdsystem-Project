import { useState, useEffect } from "react";
import axios from "axios";

export default function RdForm({ setPage }) {

  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    name: "",
    dob: "",
    gender: "",
    occupation: "",
    address: "",
    rdDate: "",
    amount: "",
    adharno: "",
    panNo: "",
    nomineeName: "",
    nomineeAddress: "",
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setAnimate(false);
    setTimeout(() => setAnimate(true), 50);
  }, [step]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData({
      ...data,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const validateStep = () => {
    let err = {};

    if (step === 1) {
      if (!data.name) err.name = "Required";
      if (!data.dob) err.dob = "Required";
      if (!data.gender) err.gender = "Required";
      if (!data.address) err.address = "Required";
    }

    if (step === 2) {
      if (!data.amount || data.amount <= 0)
        err.amount = "Invalid amount";

      if (!data.rdDate)
        err.rdDate = "Required";

      if (!/^\d{12}$/.test(data.adharno))
        err.adharno = "12 digit Aadhar";

      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(data.panNo))
        err.panNo = "Invalid PAN";
    }

    if (step === 3) {
      if (!data.nomineeName)
        err.nomineeName = "Required";

      if (!data.agree)
        err.agree = "Accept terms";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    await axios.post("http://localhost:8080/rduser", data);
    alert("✅ User Added");
    setPage("rduser");
  };

  return (
    <div style={main}>

      <h2 style={title}>🏦 RD Registration Form</h2>

      {/* PROGRESS */}
      <div style={progress}>
        {[1,2,3].map((s,i)=>(
          <>
            <div key={s} style={{
              ...circle,
              background: step>=s?"#6366f1":"#cbd5f5"
            }}>{s}</div>
            {s<3 && <div style={line}></div>}
          </>
        ))}
      </div>

      <div style={{
        ...card,
        opacity: animate ? 1 : 0,
        transform: animate ? "translateX(0)" : "translateX(40px)",
        transition: "0.4s"
      }}>

        {/* STEP 1 */}
        {step === 1 && (
          <>
            <h3 style={sectionTitle}>Personal Details</h3>

            <Label>Name</Label>
            <Input name="name" placeholder="Enter Name" onChange={handleChange} error={errors.name}/>

            <Label>Date of Birth</Label>
            <Input type="date" name="dob" onChange={handleChange} error={errors.dob}/>

            <Label>Gender</Label>
            <select name="gender" onChange={handleChange} style={getInput(errors.gender)}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
            {errors.gender && <span style={err}>{errors.gender}</span>}

            <Label>Occupation</Label>
            <Input name="occupation" placeholder="Enter Occupation"/>

            <Label>Address</Label>
            <Input name="address" placeholder="Enter Address" onChange={handleChange} error={errors.address}/>

            <button style={btn} onClick={() => validateStep() && next()}>Next</button>
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <h3 style={sectionTitle}>RD & KYC</h3>

            <Label>Amount</Label>
            <Input name="amount" placeholder="Enter Amount" onChange={handleChange} error={errors.amount}/>

            <Label>RD Start Date</Label>
            <Input type="date" name="rdDate" onChange={handleChange} error={errors.rdDate}/>

            <Label>Aadhar</Label>
            <Input name="adharno" placeholder="12 digit Aadhar" onChange={handleChange} error={errors.adharno}/>

            <Label>PAN</Label>
            <Input name="panNo" placeholder="ABCDE1234F" onChange={handleChange} error={errors.panNo}/>

            <div>
              <button style={btn2} onClick={prev}>Back</button>
              <button style={btn} onClick={() => validateStep() && next()}>Next</button>
            </div>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <h3 style={sectionTitle}>Nominee</h3>

            <Label>Nominee Name</Label>
            <Input name="nomineeName" placeholder="Enter Name" onChange={handleChange} error={errors.nomineeName}/>

            <Label>Nominee Address</Label>
            <Input name="nomineeAddress" placeholder="Enter Address"/>

            <div style={terms}>
              <input type="checkbox" name="agree" onChange={handleChange}/>
              <span>I Agree</span>
            </div>
            {errors.agree && <span style={err}>{errors.agree}</span>}

            <div>
              <button style={btn2} onClick={prev}>Back</button>
              <button style={btn} onClick={handleSubmit}>Submit</button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}

/* COMPONENTS */

function Label({ children }) {
  return <label style={label}>{children}</label>;
}

function Input({ error, ...props }) {
  return (
    <>
      <input {...props} style={getInput(error)} />
      {error && <span style={err}>{error}</span>}
    </>
  );
}

/* STYLES */

const main = { padding: "40px", background: "#f1f5f9", minHeight: "100vh" };

const title = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "26px",
  fontWeight: "800",
  color: "#6366f1"
};

const card = {
  background: "#fff",
  padding: "30px",
  borderRadius: "12px",
  maxWidth: "500px",
  margin: "0 auto",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
};

const sectionTitle = {
  marginBottom: "15px",
  fontWeight: "700",
  color: "#1e293b"
};

const label = {
  fontSize: "13px",
  fontWeight: "600",
  marginBottom: "4px",
  display: "block"
};

const getInput = (error) => ({
  width: "100%",
  marginBottom: "14px",
  padding: "12px",
  borderRadius: "8px",
  border: error ? "1px solid red" : "1px solid #e2e8f0",
  background: "#f8fafc",
  outline: "none"
});

const btn = {
  padding: "10px 20px",
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  marginTop: "10px",
  cursor: "pointer"
};

const btn2 = {
  padding: "10px 20px",
  background: "#ccc",
  border: "none",
  borderRadius: "6px",
  marginRight: "10px"
};

const progress = {
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px"
};

const circle = {
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
};

const line = { width: "40px", height: "3px", background: "#cbd5f5" };

const terms = { marginBottom: "10px" };

const err = { color: "red", fontSize: "12px" };