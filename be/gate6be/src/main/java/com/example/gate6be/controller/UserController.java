package com.example.gate6be.controller;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.gate6be.model.User;
import com.example.gate6be.service.UserService;
import com.example.gate6be.dto.UserRequest;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // FE React chạy Vite
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // Đăng ký 
    @PostMapping("/register")
    public ResponseEntity<UserRequest> register(@RequestBody User user) {
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword())); // mã hóa password
            User newUser = userService.register(user);

            UserRequest dto = new UserRequest(
                    newUser.getId(),
                    newUser.getUsername(),
                    newUser.getEmail(),
                    newUser.getFullname(),
                    newUser.getPhone(),
                    newUser.getAddress(),
                    newUser.getRole()
            );
            return ResponseEntity.ok(dto);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    //  Đăng nhập 
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        return userService.login(username, password)
                .<ResponseEntity<?>>map(user -> {
                    UserRequest dto = new UserRequest(
                            user.getId(),
                            user.getUsername(),
                            user.getEmail(),
                            user.getFullname(),
                            user.getPhone(),
                            user.getAddress(),
                            user.getRole()
                    );
                    return ResponseEntity.ok(dto);
                })
                .orElse(ResponseEntity.status(401).body("❌ Sai username hoặc password!"));
    }

    // Lấy thông tin user 
    @GetMapping("/{id}")
    public ResponseEntity<UserRequest> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(user -> new UserRequest(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFullname(),
                        user.getPhone(),
                        user.getAddress(),
                        user.getRole()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Cập nhật thông tin người dùng 
    @PutMapping("/{id}")
    public ResponseEntity<UserRequest> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        return userService.updateUser(id, userRequest)
                .map(user -> new UserRequest(
                        user.getId(),
                        user.getUsername(),
                        user.getEmail(),
                        user.getFullname(),
                        user.getPhone(),
                        user.getAddress(),
                        user.getRole()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Xóa user 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully ");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
