package com.example.gate6be.config;

import com.example.gate6be.model.User;
import com.example.gate6be.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
 
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("123456")); // mã hóa mật khẩu
            admin.setRole("ADMIN");
            admin.setEmail("admin@gate6.vn");
            userRepository.save(admin);
            System.out.println(" Đã tạo tài khoản admin mặc định: admin / 123456");
        } else {
            System.out.println(" Admin đã tồn tại, bỏ qua tạo mới.");
        }
    }
}
