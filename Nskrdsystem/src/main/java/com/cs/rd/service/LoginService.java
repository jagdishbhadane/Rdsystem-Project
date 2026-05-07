package com.cs.rd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.rd.entity.LoginUser;
import com.cs.rd.repo.LoginRepo;

@Service
public class LoginService {

    @Autowired
    private LoginRepo repo;

    public LoginUser login(String mobile) {

        LoginUser user = repo.findByMobile(mobile);

        if (user == null) {
            throw new RuntimeException("User not found ❌");
        }

        return user;
    }
}