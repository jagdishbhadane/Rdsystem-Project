package com.cs.rd.pdto;

import java.time.LocalDate;

public interface PassbookDTO {

    // ✅ Primary ID
    Integer getPid();

    // ✅ User Details
    String getName();
    String getAcno();

    // ✅ Transaction Details
    Integer getRdamt();   // 🔥 CHANGE Double → Integer (DB match)

    LocalDate getRddate();

    // ✅ 1 = Credit | 0 = Debit
    Integer getFlag();
}