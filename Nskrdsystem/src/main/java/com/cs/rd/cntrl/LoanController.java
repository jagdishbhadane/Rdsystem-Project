package com.cs.rd.cntrl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs.rd.entity.Loan;
import com.cs.rd.entity.RdUser;
import com.cs.rd.repo.LoanRepo;
import com.cs.rd.repo.Rdrepo;

@RestController
@RequestMapping("/loan")
@CrossOrigin("*")
public class LoanController {

    @Autowired
    private LoanRepo repo;

    @Autowired
    private Rdrepo userRepo;

    // 🔥 APPLY LOAN
    @PostMapping("/apply/{rid}")
    public Loan applyLoan(@PathVariable("rid") int rid) {
        Optional<RdUser> optionalUser = userRepo.findById(rid);

        if (!optionalUser.isPresent()) {
            throw new RuntimeException("User not found with id: " + rid);
        }

        RdUser user = optionalUser.get();

        Loan loan = new Loan();
        loan.setRid(rid);
        loan.setDate(LocalDate.now());

        // ✅ BUSINESS LOGIC
        if (user.getAmount() != null && user.getAmount() >= 10000) {
            loan.setStatus("APPROVED");
            loan.setAmount(user.getAmount() * 0.5);
        } else {
            loan.setStatus("REJECTED");
            loan.setReason("Minimum balance 10000 required");
            loan.setAmount(0.0); // ✅ Double value
        }

        return repo.save(loan);
    }

    // 🔥 ALL LOANS
    @GetMapping
    public List<Loan> getAll() {
        return repo.findAll();
    }

    // 🔥 APPROVED
    @GetMapping("/approved")
    public List<Loan> approved() {
        return repo.findByStatus("APPROVED");
    }

    // 🔥 REJECTED
    @GetMapping("/rejected")
    public List<Loan> rejected() {
        return repo.findByStatus("REJECTED");
    }

    // 🔥 USER LOAN
    @GetMapping("/user/{rid}")
    public List<Loan> getUserLoans(@PathVariable("rid") int rid) {
        return repo.findByRid(rid);
    }
}