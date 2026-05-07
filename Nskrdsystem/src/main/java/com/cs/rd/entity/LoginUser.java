package com.cs.rd.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "login_user")
public class LoginUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String mobile;

    // getters & setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }
}
