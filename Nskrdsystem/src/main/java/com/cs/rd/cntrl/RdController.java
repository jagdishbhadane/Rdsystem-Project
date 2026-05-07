package com.cs.rd.cntrl;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs.rd.entity.RdUser;
import com.cs.rd.entity.Transaction;
import com.cs.rd.repo.Rdrepo;
import com.cs.rd.repo.TransactionRepo;
import com.cs.rd.repo.LoanRepo;   // 🔥 ADD THIS

@RestController
@RequestMapping("/rduser")
@CrossOrigin(origins = "http://localhost:5173")
public class RdController {

    @Autowired
    private Rdrepo repo;

    @Autowired
    private TransactionRepo trepo;

    @Autowired
    private LoanRepo loanRepo;   // 🔥 ADD THIS

    // ✅ GET ALL USERS
    @GetMapping
    public List<RdUser> getAll() {
        return repo.findAll();
    }

    // ✅ GET SINGLE USER
    @GetMapping("/{id}")
    public RdUser getOne(@PathVariable("id") int id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));
    }

    // ✅ ADD USER
    @PostMapping
    public RdUser save(@RequestBody RdUser p) {

        if (p.getAcno() == null || p.getAcno().isEmpty())
            p.setAcno("AC" + System.currentTimeMillis());

        if (p.getAmount() == null)
            p.setAmount(0.0);

        RdUser saved = repo.save(p);

        // 🔥 Initial Transaction
        Transaction t = new Transaction();
        t.setRid(saved.getRid());
        t.setName(saved.getName());
        t.setAcno(saved.getAcno());
        t.setType("CREDIT");
        t.setAmount(saved.getAmount());
        t.setDate(LocalDate.now());

        trepo.save(t);

        return saved;
    }

    // ✅ UPDATE USER
    @PutMapping("/{id}")
    public RdUser update(@PathVariable("id") int id, @RequestBody RdUser s) {

        RdUser u = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        if (s.getName() != null && !s.getName().isEmpty())
            u.setName(s.getName());

        if (s.getAdharno() != null && !s.getAdharno().isEmpty())
            u.setAdharno(s.getAdharno());

        if (s.getAmount() != null)
            u.setAmount(s.getAmount());

        return repo.save(u);
    }

    // 🔥🔥 FINAL DELETE (ALL DATA DELETE)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable("id") int id) {

        RdUser user = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        // 🔥 STEP 1: delete child tables
        trepo.deleteByRid(id);     // transaction delete
        loanRepo.deleteByRid(id);  // 🔥 loan delete

        // 🔥 STEP 2: delete user
        repo.delete(user);

        return "User + Loan + Transaction Deleted ✅";
    }

    // 💰 DEPOSIT
    @PutMapping("/deposit/{rid}")
    public RdUser deposit(@PathVariable("rid") int rid,
                          @RequestParam("amount") double amount) {

        RdUser user = repo.findById(rid)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        double current = user.getAmount() == null ? 0.0 : user.getAmount();

        user.setAmount(current + amount);
        repo.save(user);

        Transaction t = new Transaction();
        t.setRid(user.getRid());
        t.setName(user.getName());
        t.setAcno(user.getAcno());
        t.setType("CREDIT");
        t.setAmount(amount);
        t.setDate(LocalDate.now());

        trepo.save(t);

        return user;
    }

    // 💸 WITHDRAW
    @PutMapping("/withdraw/{rid}")
    public RdUser withdraw(@PathVariable("rid") int rid,
                           @RequestParam("amount") double amount) {

        RdUser user = repo.findById(rid)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        double current = user.getAmount() == null ? 0.0 : user.getAmount();

        if (current < amount) {
            throw new RuntimeException("Insufficient Balance ❌");
        }

        user.setAmount(current - amount);
        repo.save(user);

        Transaction t = new Transaction();
        t.setRid(user.getRid());
        t.setName(user.getName());
        t.setAcno(user.getAcno());
        t.setType("DEBIT");
        t.setAmount(amount);
        t.setDate(LocalDate.now());

        trepo.save(t);

        return user;
    }

    // 📘 PASSBOOK
    @GetMapping("/transactions/{rid}")
    public List<Transaction> getTransactions(@PathVariable("rid") int rid) {
        return trepo.findByRidOrderByTidDesc(rid);
    }

    // 📊 DASHBOARD
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {

        List<RdUser> users = repo.findAll();

        double totalBalance = users.stream()
                .mapToDouble(u -> u.getAmount() != null ? u.getAmount() : 0)
                .sum();

        double totalDebit = trepo.findAll().stream()
                .filter(t -> "DEBIT".equalsIgnoreCase(t.getType()))
                .mapToDouble(Transaction::getAmount)
                .sum();

        long activeUsers = users.stream()
                .filter(u -> u.getAmount() != null && u.getAmount() > 0)
                .count();

        List<Transaction> recent = trepo.findAllByOrderByTidDesc()
                .stream()
                .limit(5)
                .toList();

        Map<String, Object> map = new HashMap<>();
        map.put("totalUsers", users.size());
        map.put("totalBalance", totalBalance);
        map.put("totalDebit", totalDebit);
        map.put("activeUsers", activeUsers);
        map.put("recentTransactions", recent);

        return map;
    }
}