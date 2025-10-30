package com.example.gate6be.service;

import com.example.gate6be.dto.OrderRequest;
import com.example.gate6be.model.Order;
import com.example.gate6be.model.OrderItem;
import com.example.gate6be.model.Product;
import com.example.gate6be.model.User;
import com.example.gate6be.repository.OrderRepository;
import com.example.gate6be.repository.ProductRepository;
import com.example.gate6be.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderService(OrderRepository orderRepository,
                        UserRepository userRepository,
                        ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // ✅ Lấy danh sách đơn hàng theo userId
    public List<Order> getOrdersByUser(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // ✅ Tạo đơn hàng mới
    public Order createOrder(OrderRequest orderRequest) {
        User user = userRepository.findById(orderRequest.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id: " + orderRequest.getUserId()));

        Order order = new Order();
        order.setUser(user);
        order.setStatus("PENDING");
        order.setCreatedAt(LocalDateTime.now());

        double total = 0;

        for (OrderRequest.OrderItemRequest itemReq : orderRequest.getItems()) {
            Product product = productRepository.findById(itemReq.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemReq.getProductId()));

            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemReq.getQuantity());
            orderItem.setPrice(itemReq.getPrice());
            orderItem.setProductName(product.getName());
            orderItem.setImageUrl(product.getImage());
            orderItem.setSize(itemReq.getSize());
            orderItem.setColor(itemReq.getColor());

            order.addItem(orderItem); // gắn vào Order

            total += itemReq.getPrice() * itemReq.getQuantity();
        }

        order.setTotal(total);
        return orderRepository.save(order);
    }

    // ✅ Lấy đơn hàng theo id
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    // ----------------- Lấy tất cả đơn hàng -----------------
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // ----------------- Cập nhật trạng thái đơn hàng -----------------
    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(status);
        return orderRepository.save(order);
    }

    // ----------------- Xóa đơn hàng -----------------
    public boolean deleteOrder(Long id) {
        if (orderRepository.existsById(id)) {
            orderRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Hủy đơn hàng (chỉ user được phép hủy đơn chưa hoàn thành) 
    public Order cancelOrder(Long orderId, Long userId) {
        // Lấy đơn hàng
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // Kiểm tra user có quyền hủy (chỉ hủy đơn của mình)
        if (!order.getUser().getId().equals(userId)) {
            throw new RuntimeException("Bạn không có quyền hủy đơn hàng này!");
        }

        // Kiểm tra trạng thái đơn hàng
        if ("Hoàn thành".equals(order.getStatus()) || "Đã hủy".equals(order.getStatus())) {
            throw new RuntimeException("Đơn hàng này không thể hủy!");
        }

        // Thay đổi trạng thái thành "Đã hủy"
        order.setStatus("Đã hủy");

        return orderRepository.save(order);
    }
}
