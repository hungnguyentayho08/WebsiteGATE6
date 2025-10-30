import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const OrderDetail = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/orders/${id}`);
                setOrder(res.data);
            } catch (err) {
                setError("❌ Không tìm thấy đơn hàng hoặc lỗi server.");
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        return date.toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) return <p>⏳ Đang tải đơn hàng...</p>;
    if (error) return <p>{error}</p>;
    if (!order) return null;

    return (
        <div className="container mt-4">
            <h2>📦 Chi tiết đơn hàng #{order.id}</h2>
            <p><strong>Ngày đặt:</strong> {formatDate(order.created_at)}</p>
            <p><strong>Tổng tiền:</strong> {(order.total || 0).toLocaleString("vi-VN")} ₫</p>
            <p><strong>Trạng thái:</strong> {order.status}</p>

            <h4>🛒 Sản phẩm</h4>
            <table className="table table-striped">
                <thead>
                    <tr>

                        <th>Ảnh</th> {/* thêm cột hình ảnh */}
                        <th>Tên sản phẩm</th>
                        <th>Màu</th>
                        <th>Kích thước</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {order.orderItems && order.orderItems.length > 0 ? (
                        order.orderItems.map((item) => (
                            <tr key={item.id}>

                                <td>
                                    {item.product.image ? (
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        "–"
                                    )}
                                </td>
                                <td>{item.product.name}</td>
                                <td>{item.color || "-"}</td>
                                <td>{item.size || "-"}</td>
                                <td>{item.quantity}</td>
                                <td>{(item.price || 0).toLocaleString("vi-VN")} ₫</td>
                                <td>{((item.price || 0) * item.quantity).toLocaleString("vi-VN")} ₫</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Chưa có sản phẩm nào trong đơn hàng.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            <Link to="/user/dashboard" className="btn btn-secondary mt-3">
                ⬅️ Quay lại
            </Link>
        </div>
    );
};

export default OrderDetail;
