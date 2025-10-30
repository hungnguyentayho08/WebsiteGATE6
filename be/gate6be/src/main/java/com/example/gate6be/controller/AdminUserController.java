package com.example.gate6be.controller;

import com.example.gate6be.model.User;
import com.example.gate6be.service.UserService;
import com.example.gate6be.dto.UserRequest;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminUserController {

    private final UserService userService;

    public AdminUserController(UserService userService) {
        this.userService = userService;
    }

    // Lấy danh sách toàn bộ user 
    @GetMapping
    public ResponseEntity<List<UserRequest>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        List<UserRequest> dtos = users.stream()
                .map(u -> new UserRequest(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getFullname(),
                        u.getPhone(),
                        u.getAddress(),
                        u.getRole()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    // Lấy user theo ID
    @GetMapping("/{id}")
    public ResponseEntity<UserRequest> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(u -> new UserRequest(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getFullname(),
                        u.getPhone(),
                        u.getAddress(),
                        u.getRole()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    //  Admin thêm user 
    @PostMapping
    public ResponseEntity<UserRequest> createUser(@RequestBody User user) {
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
    }

    //  Admin cập nhật user 
    @PutMapping("/{id}")
    public ResponseEntity<UserRequest> updateUser(@PathVariable Long id, @RequestBody UserRequest userRequest) {
        return userService.updateUser(id, userRequest)
                .map(u -> new UserRequest(
                        u.getId(),
                        u.getUsername(),
                        u.getEmail(),
                        u.getFullname(),
                        u.getPhone(),
                        u.getAddress(),
                        u.getRole()
                ))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin xóa user 
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok("User deleted successfully ✅");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
