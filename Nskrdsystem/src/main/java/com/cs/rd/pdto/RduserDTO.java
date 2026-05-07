package com.cs.rd.pdto;

public class RduserDTO {

    private int rid;
    private String name;
    private String acno;
    private Double amount;
    private String adharno;

    public int getRid() { return rid; }
    public void setRid(int rid) { this.rid = rid; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAcno() { return acno; }
    public void setAcno(String acno) { this.acno = acno; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    // ✅ ADD THIS (Missing)
    public String getAdharno() { return adharno; }
    public void setAdharno(String adharno) { this.adharno = adharno; }
}