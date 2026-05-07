package com.cs.rd.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.cs.rd.pdto.PassbookDTO;
import com.cs.rd.repo.Passbookrepo;
@Service
public class Passbookservice {
   @Autowired
    private Passbookrepo pprepo;
    // All passbook details
    public List<PassbookDTO> getDetail() {
        return pprepo.getUserPassbookDetails();
    }
    // Passbook details by rid
    public List<PassbookDTO> getUserPassbookDetailById(int rid) {
        return pprepo.getUserPassbookDetailById(rid);
    }

}