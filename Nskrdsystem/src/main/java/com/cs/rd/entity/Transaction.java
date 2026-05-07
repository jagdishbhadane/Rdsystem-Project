package com.cs.rd.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transaction")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int tid;

    private int rid;
    private String name;
    private String acno;

    // ✅ FIXED (Wrapper class)
    private Double amount;

    private String type; // CREDIT / DEBIT
    private LocalDate date;

    // ===== GETTERS & SETTERS =====

    public int getTid() { return tid; }
    public void setTid(int tid) { this.tid = tid; }

    public int getRid() { return rid; }
    public void setRid(int rid) { this.rid = rid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAcno() { return acno; }
    public void setAcno(String acno) { this.acno = acno; }

    // 🔥 FIXED (Double → Double)
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}