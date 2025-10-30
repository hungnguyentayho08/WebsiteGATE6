package com.example.gate6be.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.gate6be.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
	boolean existsByUsername(String username);
	boolean existsByEmail(String email);
	boolean existsByPhone(String phone);
	
}
