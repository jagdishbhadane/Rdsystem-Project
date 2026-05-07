package com.cs.rd.cntrl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs.rd.pdto.PassbookDTO;
import com.cs.rd.repo.Passbookrepo;
import com.cs.rd.service.Passbookservice;

@RestController
@RequestMapping("/rdpassbook")
@CrossOrigin("*")
public class Passbookcntrl {

    @Autowired
    private Passbookrepo prepo;

    @Autowired
    private Passbookservice service;

    // ✅ Full Passbook
    @GetMapping("/detail")
    public List<PassbookDTO> getDetail() {
        return service.getDetail();
    }

    // ✅ User Passbook
    @GetMapping("/user/{rid}")
    public List<PassbookDTO> getUser(@PathVariable int rid) {
        return service.getUserPassbookDetailById(rid);
    }

    // ✅ Total Entries
    @GetMapping("/count")
    public Map<String, Long> count() {
        Map<String, Long> res = new HashMap<>();
        res.put("totalEntry", prepo.getTotalEntry());
        return res;
    }

    // ✅ Total Amount
    @GetMapping("/total")
    public Map<String, Long> total() {
        Map<String, Long> res = new HashMap<>();
        res.put("totalAmount", prepo.getTotalAmt());
        return res;
    }

    // ✅ Total Credit
    @GetMapping("/credit")
    public Map<String, Long> credit() {
        Map<String, Long> res = new HashMap<>();
        res.put("totalCredit", prepo.getTotalCredit());
        return res;
    }

    // ✅ Total Debit
    @GetMapping("/debit")
    public Map<String, Long> debit() {
        Map<String, Long> res = new HashMap<>();
        res.put("totalDebit", prepo.getTotalDebit());
        return res;
    }

    // ✅ User Balance
    @GetMapping("/balance/{rid}")
    public Map<String, Long> balance(@PathVariable int rid) {
        Map<String, Long> res = new HashMap<>();
        res.put("balance", prepo.getUserBalance(rid));
        return res;
    }

    // ✅ DELETE ENTRY (optional)
    @DeleteMapping("/{id}")
    public String delete(@PathVariable int id) {
        if (!prepo.existsById(id)) {
            throw new RuntimeException("Record not found ❌");
        }
        prepo.deleteById(id);
        return "Deleted Successfully ✅";
    }
}