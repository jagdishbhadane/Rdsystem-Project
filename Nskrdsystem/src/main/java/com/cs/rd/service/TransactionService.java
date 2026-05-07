package com.cs.rd.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.rd.entity.Transaction;
import com.cs.rd.repo.TransactionRepo;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepo repo;

    // ✅ GET ALL
    public List<Transaction> getAll() {
        return repo.findAll();
    }

    // ✅ GET BY USER (FIXED 🔥)
    public List<Transaction> getByUser(int rid) {
        return repo.findByRidOrderByTidDesc(rid);
    }

    // ✅ GET LAST TRANSACTION
    public Transaction getLastTransaction() {
        return repo.findTopByOrderByTidDesc().orElse(null);
    }
}