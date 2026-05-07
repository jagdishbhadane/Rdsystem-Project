package com.cs.rd.entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "rduser")
public class RdUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rid;

    private String name;

    private String acno;

    @Column(name = "adharno")
    private String adharno;

    private Double amount = 0.0;

    @Column(name = "rdamt")
    private Double rdamt = 0.0;

    @Column(name = "addr")
    private String address = "NA";

    private String gender = "NA";

    // ✅ FIX spelling but map to old column
    @Column(name = "accupation")
    private String occupation = "NA";

    private LocalDate dob;

    @Column(name = "rddate")
    private LocalDate rdDate;

    @Column(name = "panno")
    private String panNo = "NA";

    @Column(name = "nname")
    private String nomineeName = "NA";

    @Column(name = "naddr")
    private String nomineeAddress = "NA";

    @Column(name = "nadharno")
    private String nomineeAadhar = "NA";

    @Column(name = "npanno")
    private String nomineePan = "NA";

    private boolean agree = true;

    // 🔥 AUTO ACCOUNT NO
    @PrePersist
    public void generateAcno() {
        if (this.acno == null || this.acno.isEmpty()) {
            this.acno = "AC" + System.currentTimeMillis();
        }
    }

    // ===== GETTERS & SETTERS =====

    public int getRid() { return rid; }
    public void setRid(int rid) { this.rid = rid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAcno() { return acno; }
    public void setAcno(String acno) { this.acno = acno; }

    public String getAdharno() { return adharno; }
    public void setAdharno(String adharno) { this.adharno = adharno; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public Double getRdamt() { return rdamt; }
    public void setRdamt(Double rdamt) { this.rdamt = rdamt; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }

    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }

    public LocalDate getRdDate() { return rdDate; }
    public void setRdDate(LocalDate rdDate) { this.rdDate = rdDate; }

    public String getPanNo() { return panNo; }
    public void setPanNo(String panNo) { this.panNo = panNo; }

    public String getNomineeName() { return nomineeName; }
    public void setNomineeName(String nomineeName) { this.nomineeName = nomineeName; }

    public String getNomineeAddress() { return nomineeAddress; }
    public void setNomineeAddress(String nomineeAddress) { this.nomineeAddress = nomineeAddress; }

    public String getNomineeAadhar() { return nomineeAadhar; }
    public void setNomineeAadhar(String nomineeAadhar) { this.nomineeAadhar = nomineeAadhar; }

    public String getNomineePan() { return nomineePan; }
    public void setNomineePan(String nomineePan) { this.nomineePan = nomineePan; }

    public boolean isAgree() { return agree; }
    public void setAgree(boolean agree) { this.agree = agree; }
}