import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // ----------------- Fetch tất cả đơn hàng từ BE -----------------
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy đơn hàng:", err);
            alert("❌ Không thể tải danh sách đơn hàng!");
        } finally {
            setLoading(false);
        }
    };

    // ----------------- Modal -----------------
    const handleShowUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    // ----------------- Cập nhật trạng thái đơn hàng -----------------
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:8080/api/admin/orders/${id}/status`, null, {
                params: { status: newStatus },
            });
            setOrders(
                orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
            );
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái:", err);
            alert("❌ Không thể cập nhật trạng thái!");
        }
    };

    // ----------------- Xóa đơn hàng -----------------
    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) return;
        try {
            await axios.delete(`http://localhost:8080/api/admin/orders/${id}`);
            setOrders(orders.filter((o) => o.id !== id));
            alert("✅ Xóa đơn hàng thành công!");
        } catch (err) {
            console.error("Lỗi khi xóa đơn hàng:", err);
            alert("❌ Không thể xóa đơn hàng!");
        }
    };

    return (
        <div
            className="container-fluid py-4 px-4"
            style={{ minHeight: "100vh" }}
        >
            {/* Nút quay về */}
            <div className="d-flex  align-items-center mb-4">
                <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">
                    <i className="bi bi-arrow-left-circle me-1"></i>
                </Link>
                <h2 className="mb-0 fw-bold text-dark"><i className="bi bi-bag-check me-2"></i>Quản lý đơn hàng</h2>

            </div>

            {loading ? (
                <p className="text-center fs-5">⏳ Đang tải danh sách đơn hàng...</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped align-middle shadow-sm bg-white">
                        <thead className="table-dark">
                            <tr>
                                <th>Mã đơn</th>
                                <th>Khách hàng</th>
                                <th>Thông tin KH</th>
                                <th>Chi tiết sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((o) => (
                                    <tr key={o.id}>
                                        <td>#{o.id}</td>
                                        <td>{o.user?.fullname || o.user?.username}</td>
                                        <td>
                                            <button
                                                className="btn btn-info btn-sm"
                                                onClick={() => handleShowUser(o.user)}
                                            >
                                                👤 Xem
                                            </button>
                                        </td>
                                        <td>
                                            <ul className="mb-0">
                                                {o.orderItems.map((item, idx) => (
                                                    <li key={idx}>
                                                        {item.productName} - SL: {item.quantity},
                                                        Size: {item.size}, Giá:{" "}
                                                        {item.price.toLocaleString()} đ
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td>{o.total.toLocaleString()} đ</td>
                                        <td>
                                            <span
                                                className={`badge ${o.status === "Hoàn thành"
                                                    ? "bg-success"
                                                    : o.status === "Đang giao"
                                                        ? "bg-warning text-dark"
                                                        : "bg-secondary"
                                                    }`}
                                            >
                                                {o.status}
                                            </span>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-success btn-sm me-2"
                                                onClick={() =>
                                                    handleUpdateStatus(o.id, "Hoàn thành")
                                                }
                                            >
                                                ✅ Hoàn thành
                                            </button>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() =>
                                                    handleUpdateStatus(o.id, "Đang giao")
                                                }
                                            >
                                                🚚 Đang giao
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(o.id)}
                                            >
                                                ❌ Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center text-muted">
                                        Không có đơn hàng nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal hiển thị thông tin khách hàng */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>👤 Thông tin khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser ? (
                        <div>
                            <p><b>Họ tên:</b> {selectedUser.fullname}</p>
                            <p><b>Số điện thoại:</b> {selectedUser.phone}</p>
                            <p><b>Địa chỉ:</b> {selectedUser.address}</p>
                            <p><b>Email:</b> {selectedUser.email}</p>
                        </div>
                    ) : (
                        <p>Không có thông tin khách hàng</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminOrders;
