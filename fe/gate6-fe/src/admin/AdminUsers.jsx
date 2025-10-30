import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/admin/users");
            setUsers(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
            try {
                await axios.delete(`http://localhost:8080/api/admin/users/${id}`);
                setUsers(users.filter((user) => user.id !== id));
                alert("✅ Xóa thành công!");
            } catch (err) {
                console.error("Lỗi khi xóa user:", err);
                alert("❌ Không thể xóa user!");
            }
        }
    };

    const handleView = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="container-fluid px-4 py-3">
            <div className="d-flex  align-items-center mb-4">
                <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">
                    <i className="bi bi-arrow-left-circle me-1"></i>
                </Link>
                <h2 className="mb-0 fw-bold text-dark"><i className="bi bi-people me-2"></i>Quản lý người dùng</h2>

            </div>


            {loading ? (
                <p>⏳ Đang tải danh sách người dùng...</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Tên người dùng</th>
                            <th>Email</th>
                            <th>Vai trò</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fullname || user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${user.role === "ADMIN" ? "bg-primary" : "bg-secondary"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleView(user)}
                                        >
                                            👁️ Xem
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(user.id)}
                                        >
                                            Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Không có người dùng nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Modal hiển thị thông tin user */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedUser && (
                        <>
                            <p><strong>Họ tên:</strong> {selectedUser.fullname}</p>
                            <p><strong>Username:</strong> {selectedUser.username}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>SĐT:</strong> {selectedUser.phone}</p>
                            <p><strong>Địa chỉ:</strong> {selectedUser.address}</p>
                            <p><strong>Vai trò:</strong> {selectedUser.role}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminUsers;
