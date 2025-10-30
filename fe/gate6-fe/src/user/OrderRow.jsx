import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const OrderRow = ({ order, onCancel }) => {
    // Format ngày
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

    // Format trạng thái
    const renderStatus = (status) => {
        switch (status) {
            case "PENDING":
                return <span className="badge bg-warning text-dark">Đang xử lý</span>;
            case "COMPLETED":
                return <span className="badge bg-success">Hoàn thành</span>;
            case "CANCELLED":
                return <span className="badge bg-danger">Đã hủy</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    };

    // Gọi API hủy đơn hàng
    const handleCancel = async () => {
        if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) return;
        try {
            await axios.put(`http://localhost:8080/api/orders/${order.id}/cancel`, null, {
                params: { userId: order.userId } // cần gửi userId
            });
            if (onCancel) onCancel(order.id); // callback để FE cập nhật trạng thái
            alert("✅ Đơn hàng đã được hủy!");
        } catch (err) {
            alert("❌ Hủy đơn hàng thất bại!");
            console.error(err);
        }
    };

    return (
        <tr>
            <td>#{order.id}</td>
            <td>{formatDate(order.createdAt)}</td>
            <td>{(order.total || 0).toLocaleString("vi-VN")} ₫</td>
            <td>{renderStatus(order.status)}</td>
            <td>
                <Link
                    to={`/orders/${order.id}`}
                    className="btn btn-sm btn-outline-info me-2"
                >
                    🔎 Xem
                </Link>
                {order.status === "PENDING" && (
                    <button
                        onClick={handleCancel}
                        className="btn btn-sm btn-outline-danger"
                    >
                        ❌ Hủy
                    </button>
                )}
            </td>
        </tr>
    );
};

export default OrderRow;
