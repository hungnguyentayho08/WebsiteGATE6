package com.example.gate6be.controller;

import com.example.gate6be.model.Product;
import com.example.gate6be.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // User APIs
    // Lấy tất cả sản phẩm (User chỉ xem)
    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    // Lấy 1 sản phẩm theo id
    @GetMapping("/{id}")
    public Product getById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    // Lấy sản phẩm nổi bật
    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productService.getFeaturedProducts();
    }

    // Admin APIs 
    // Tạo sản phẩm mới (có thể kèm stock)
    @PostMapping
    public Product create(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // Cập nhật sản phẩm (có thể update stock)
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    // Xóa sản phẩm
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return "Product deleted successfully ✅";
    }

    // Toggle sản phẩm nổi bật
    @PutMapping("/toggleFeatured/{id}")
    public Product toggleFeatured(@PathVariable Long id) {
        return productService.toggleFeatured(id);
    }
}
