package com.cs.rd.cntrl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs.rd.entity.Transaction;
import com.cs.rd.repo.TransactionRepo;

@RestController
@RequestMapping("/transactions")
@CrossOrigin("*")
public class TransactionController {

    @Autowired
    private TransactionRepo repo;

    // ✅ 🔥 ADD THIS (GET ALL)
    @GetMapping
    public List<Transaction> getAll() {
        return repo.findAll();
    }

    // ✅ USER WISE
    @GetMapping("/user/{rid}")
    public List<Transaction> getByUser(@PathVariable("rid") int rid) {
        return repo.findByRidOrderByTidDesc(rid);
    }
}