package com.cs.rd.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cs.rd.entity.Transaction;
import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.Modifying;

public interface TransactionRepo extends JpaRepository<Transaction, Integer> {

    // 🔥 DASHBOARD
    List<Transaction> findAllByOrderByTidDesc();

    // 🔥 PASSBOOK
    List<Transaction> findByRidOrderByTidDesc(int rid);

    // 🔥 LAST TRANSACTION
    Optional<Transaction> findTopByOrderByTidDesc();

    // 🔥🔥 FINAL FIX (VERY IMPORTANT)
    @Transactional
    @Modifying
    void deleteByRid(int rid);
}