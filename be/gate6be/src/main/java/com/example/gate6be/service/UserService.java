package com.example.gate6be.service;

import com.example.gate6be.model.User;
import com.example.gate6be.repository.UserRepository;
import com.example.gate6be.dto.UserRequest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

 // Đăng ký
    public User register(User user) {
        if(userRepository.existsByUsername(user.getUsername())) {
            throw new RuntimeException("⚠️ Username đã tồn tại!");
        }
        if(userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("⚠️ Email đã tồn tại!");
        }
        if(userRepository.existsByPhone(user.getPhone())) {
            throw new RuntimeException("⚠️ Số điện thoại đã tồn tại!");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        if(user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("USER");
        }

        return userRepository.save(user);
    }


    // Đăng nhập
    public Optional<User> login(String username, String rawPassword) {
        if(username == null || rawPassword == null) return Optional.empty();
        Optional<User> userOpt = userRepository.findByUsername(username.trim());
        if(userOpt.isPresent()) {
            User user = userOpt.get();
            if(passwordEncoder.matches(rawPassword.trim(), user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }


    // Lấy user theo ID 
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Lấy tất cả user 
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Cập nhật thông tin người dùng 
    public Optional<User> updateUser(Long id, UserRequest userRequest) {
        return userRepository.findById(id).map(user -> {
            user.setFullname(userRequest.getFullname());
            user.setEmail(userRequest.getEmail());
            user.setPhone(userRequest.getPhone());
            user.setAddress(userRequest.getAddress());
            // Không set username, password, role
            return userRepository.save(user);
        });
    }

    //  Xóa user 
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
