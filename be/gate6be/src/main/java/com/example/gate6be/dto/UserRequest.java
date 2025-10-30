package com.example.gate6be.dto;

public class UserRequest {
    private Long id;
    private String username;
    private String password; // client gửi password, trả về null
    private String email;
    private String fullname;
    private String phone;
    private String address;
    private String role;

    public UserRequest() {}

    // Constructor trả về (output)
    public UserRequest(Long id, String username, String email, String fullname, String phone, String address, String role) {
        this.id = id;
        this.username = username;
        this.password = null; // không lộ password
        this.email = email;
        this.fullname = fullname;
        this.phone = phone;
        this.address = address;
        this.role = role;
    }

    // Getters / Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}
