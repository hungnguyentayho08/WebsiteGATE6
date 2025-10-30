import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
    const location = useLocation();

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
                <h4 className="text-center mb-4">Admin Panel</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/admin/dashboard" className="nav-link text-white">
                            📊 Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/products" className="nav-link text-white">
                            📦 Quản lý sản phẩm
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/orders" className="nav-link text-white">
                            🛒 Quản lý đơn hàng
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/users" className="nav-link text-white">
                            👥 Quản lý người dùng
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/categories" className="nav-link text-white">
                            🏷️ Quản lý danh mục
                        </Link>
                    </li>

                    <li className="nav-item mb-2">
                        <Link to="/admin/home" className="nav-link text-white">
                            🏠 Home Page
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main content */}
            <div className="flex-grow-1">
                {/* Header */}
                <nav className="navbar navbar-light bg-light px-3">
                    <span className="navbar-brand mb-0 h5">Trang quản trị</span>
                    <div>
                        <span className="me-3">👋 Xin chào, Admin</span>
                        <button className="btn btn-outline-danger btn-sm">Đăng xuất</button>
                    </div>
                </nav>

                {/* Nội dung trang con */}
                <div className="p-4">
                    {location.pathname === "/admin" ? (
                        <div className="card shadow-sm border-0 p-4 text-center">
                            <h3 className="mb-3">🎉 Chào mừng bạn đến với trang quản trị!</h3>
                            <p className="text-muted">
                                Hãy chọn một mục ở sidebar để bắt đầu quản lý cửa hàng 🚀
                            </p>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
