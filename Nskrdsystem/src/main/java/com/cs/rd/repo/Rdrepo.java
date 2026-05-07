package com.cs.rd.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cs.rd.entity.RdUser;

public interface Rdrepo extends JpaRepository<RdUser, Integer> {
}