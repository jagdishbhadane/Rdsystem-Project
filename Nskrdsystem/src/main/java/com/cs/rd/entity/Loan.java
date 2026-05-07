package com.cs.rd.entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int rid;
    private Double amount;
    private String status;
    private String reason;
    private LocalDate date;

    // 🔥 NEW RELATION (IMPORTANT)
    @ManyToOne
    @JoinColumn(name = "rid", insertable = false, updatable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private RdUser user;

    // ===== GETTERS & SETTERS =====

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public int getRid() { return rid; }
    public void setRid(int rid) { this.rid = rid; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    // 🔥 NEW GETTER
    public RdUser getUser() { return user; }
    public void setUser(RdUser user) { this.user = user; }
}