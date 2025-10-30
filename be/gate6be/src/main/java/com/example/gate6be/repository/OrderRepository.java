package com.example.gate6be.repository;

import com.example.gate6be.model.Order;
import com.example.gate6be.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    // Tổng doanh thu
    @Query("SELECT SUM(o.total) FROM Order o")
    Double sumTotalRevenue();

    // Doanh thu theo tháng
    @Query("SELECT NEW map(FUNCTION('DATE_FORMAT', o.createdAt, '%Y-%m') as month, SUM(o.total) as revenue) " +
           "FROM Order o GROUP BY month ORDER BY month")
    List<Map<String, Object>> getRevenueByMonth();

    // Top sản phẩm bán chạy
    @Query("SELECT NEW map(p.name as name, SUM(oi.quantity) as quantity) " +
           "FROM OrderItem oi JOIN oi.product p " +
           "GROUP BY p.id, p.name ORDER BY quantity DESC")
    List<Map<String, Object>> getTopSellingProducts();
}
