package com.cs.rd.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cs.rd.entity.LoginUser;

public interface LoginRepo extends JpaRepository<LoginUser, Integer> {

    // 🔥 check by mobile
    LoginUser findByMobile(String mobile);
}