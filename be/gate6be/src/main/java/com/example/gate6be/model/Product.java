package com.example.gate6be.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String image;
    private String category;

    // Thêm cột stock
    private int stock = 0; // mặc định 0

    // Sản phẩm nổi bật
    private boolean isFeatured = false; // mặc định false
}
