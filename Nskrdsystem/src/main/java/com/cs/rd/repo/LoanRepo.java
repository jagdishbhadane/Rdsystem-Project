package com.cs.rd.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

import com.cs.rd.entity.Loan;

public interface LoanRepo extends JpaRepository<Loan, Integer> {

    List<Loan> findByStatus(String status);

    List<Loan> findByRid(int rid);

    // 🔥 DELETE ALL LOANS BY USER (IMPORTANT)
    @Transactional
    @Modifying
    void deleteByRid(int rid);
}