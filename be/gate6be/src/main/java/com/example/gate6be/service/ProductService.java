package com.example.gate6be.service;

import com.example.gate6be.model.Product;
import com.example.gate6be.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final String[] validCategories = {"Áo", "Quần", "Giày Dép", "Phụ kiện"};

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(Product product) {
        validateCategory(product.getCategory());
        product.setId(null); // ensure create
        if (product.getStock() < 0) product.setStock(0); // đảm bảo stock >=0
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product product) {
        Product existing = getProductById(id);
        validateCategory(product.getCategory());
        existing.setName(product.getName());
        existing.setPrice(product.getPrice());
        existing.setCategory(product.getCategory());
        existing.setImage(product.getImage());
        if (product.getStock() >= 0) {
            existing.setStock(product.getStock()); // cập nhật stock
        }
        return productRepository.save(existing);
    }

    public void deleteProduct(Long id) {
        getProductById(id); // check tồn tại
        productRepository.deleteById(id);
    }

    private void validateCategory(String category) {
        for(String c : validCategories) {
            if(c.equals(category)) return;
        }
        throw new RuntimeException("Category không hợp lệ");
    }

    // Toggle sản phẩm nổi bật
    public Product toggleFeatured(Long id) {
        Product product = getProductById(id);
        product.setFeatured(!Boolean.TRUE.equals(product.isFeatured()));
        return productRepository.save(product);
    }

    public List<Product> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrue();
    }
}
