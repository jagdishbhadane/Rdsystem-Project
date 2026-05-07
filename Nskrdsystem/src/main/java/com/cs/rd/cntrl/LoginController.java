package com.cs.rd.cntrl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs.rd.entity.LoginUser;
import com.cs.rd.service.LoginService;

@RestController
@RequestMapping("/login")
@CrossOrigin("*")
public class LoginController {

    @Autowired
    private LoginService service;

    @PostMapping
    public Map<String, Object> login(@RequestBody Map<String, String> req) {

        String mobile = req.get("mobile");

        LoginUser user = service.login(mobile);

        Map<String, Object> res = new HashMap<>();
        res.put("message", "Login Success ✅");
        res.put("user", user);

        return res;
    }
}
