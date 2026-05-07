package com.cs.rd.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cs.rd.entity.Rdpassbook;
import com.cs.rd.pdto.PassbookDTO;

public interface Passbookrepo extends JpaRepository<Rdpassbook, Integer>{

    // ✅ Total Entry
    @Query(value="SELECT COUNT(*) FROM rdpassbook", nativeQuery=true)
    Long getTotalEntry();

    // ✅ Total Amount
    @Query(value="SELECT SUM(rdamt) FROM rdpassbook", nativeQuery=true)
    Long getTotalAmt();

    // ✅ Total Credit
    @Query(value="SELECT SUM(rdamt) FROM rdpassbook WHERE flag = 1", nativeQuery=true)
    Long getTotalCredit();

    // ✅ Total Debit
    @Query(value="SELECT SUM(rdamt) FROM rdpassbook WHERE flag = 0", nativeQuery=true)
    Long getTotalDebit();

    // ✅ User Balance
    @Query(value="SELECT SUM(CASE WHEN flag=1 THEN rdamt ELSE -rdamt END) FROM rdpassbook WHERE rid = :rid", nativeQuery=true)
    Long getUserBalance(@Param("rid") int rid);

    // ✅ All Passbook Details
    @Query(value="SELECT name, pid, acno, rdpassbook.rdamt, rdpassbook.rddate, rdpassbook.flag " +
            "FROM rduser INNER JOIN rdpassbook ON rduser.rid = rdpassbook.rid",
            nativeQuery=true)
    List<PassbookDTO> getUserPassbookDetails();
    
    // ✅ Passbook By RID
    @Query(value="SELECT name, pid, acno, rdpassbook.rdamt, rdpassbook.rddate, rdpassbook.flag " +
            "FROM rduser INNER JOIN rdpassbook ON rduser.rid = rdpassbook.rid " +
            "WHERE rdpassbook.rid = :rid",
            nativeQuery=true)
    List<PassbookDTO> getUserPassbookDetailById(@Param("rid") int rid);
}