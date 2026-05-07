package com.cs.rd.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.rd.entity.RdUser;   // 🔥 FIXED
import com.cs.rd.entity.Transaction;
import com.cs.rd.pdto.RduserDTO;
import com.cs.rd.repo.Rdrepo;
import com.cs.rd.repo.TransactionRepo;

@Service
public class RdService {

    @Autowired
    private Rdrepo repo;

    @Autowired
    private TransactionRepo transactionRepo;

    // 🔁 ENTITY → DTO
    private RduserDTO mapToDTO(RdUser u) {
        RduserDTO dto = new RduserDTO();
        dto.setRid(u.getRid());
        dto.setName(u.getName());
        dto.setAcno(u.getAcno());
        dto.setAmount(u.getAmount());
        dto.setAdharno(u.getAdharno());
        return dto;
    }

    // 🔁 DTO → ENTITY
    private RdUser mapToEntity(RduserDTO dto) {
        RdUser u = new RdUser();

        u.setRid(dto.getRid());
        u.setName(dto.getName());
        u.setAcno(dto.getAcno());
        u.setAmount(dto.getAmount() == null ? 0.0 : dto.getAmount());
        u.setAdharno(dto.getAdharno());

        // Default values
        u.setRdDate(LocalDate.now());
        u.setDob(LocalDate.now());
        u.setAddress("NA");
        u.setGender("NA");
        u.setOccupation("NA");
        u.setPanNo("NA");
        u.setNomineeName("NA");
        u.setNomineeAddress("NA");
        u.setNomineeAadhar("NA");
        u.setNomineePan("NA");
        u.setAgree(true);

        return u;
    }

    // ✅ GET ALL USERS
    public List<RduserDTO> getAllUsers() {
        return repo.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // ✅ SAVE USER
    public RduserDTO saveUser(RduserDTO dto) {
        return mapToDTO(repo.save(mapToEntity(dto)));
    }

    // ✅ UPDATE USER
    public RduserDTO updateUser(int id, RduserDTO dto) {

        RdUser u = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        if (dto.getName() != null && !dto.getName().isEmpty()) {
            u.setName(dto.getName());
        }

        if (dto.getAdharno() != null && !dto.getAdharno().isEmpty()) {
            u.setAdharno(dto.getAdharno());
        }

        return mapToDTO(repo.save(u));
    }

    // ✅ DELETE
    public void deleteUser(int id) {
        repo.deleteById(id);
    }

    // 💰 DEPOSIT
    public RduserDTO deposit(int id, Double amount) {

        if (amount == null || amount <= 0) {
            throw new RuntimeException("Invalid amount ❌");
        }

        RdUser u = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        Double current = u.getAmount() == null ? 0.0 : u.getAmount();
        u.setAmount(current + amount);

        repo.save(u);

        Transaction t = new Transaction();
        t.setRid(id);
        t.setName(u.getName());   // 🔥 added
        t.setAcno(u.getAcno());   // 🔥 added
        t.setAmount(amount);
        t.setType("CREDIT");      // 🔥 FIXED uppercase
        t.setDate(LocalDate.now());

        transactionRepo.save(t);

        return mapToDTO(u);
    }

    // 💸 WITHDRAW
    public RduserDTO withdraw(int id, Double amount) {

        if (amount == null || amount <= 0) {
            throw new RuntimeException("Invalid amount ❌");
        }

        RdUser u = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found ❌"));

        Double current = u.getAmount() == null ? 0.0 : u.getAmount();

        if (current < amount) {
            throw new RuntimeException("Insufficient Balance ❌");
        }

        u.setAmount(current - amount);

        repo.save(u);

        Transaction t = new Transaction();
        t.setRid(id);
        t.setName(u.getName());
        t.setAcno(u.getAcno());
        t.setAmount(amount);
        t.setType("DEBIT");   // 🔥 FIXED
        t.setDate(LocalDate.now());

        transactionRepo.save(t);

        return mapToDTO(u);
    }
}