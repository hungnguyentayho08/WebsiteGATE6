import React from "react";
import { Link } from "react-router-dom";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const stats = {
        products: 26,
        orders: 45,
        users: 30,
        revenue: "100,000,000₫",
    };

    const revenueData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Doanh thu (VNĐ)",
                data: [12000000, 15000000, 18000000, 20000000, 25000000, 30000000],
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
            },
        ],
    };

    const topProductsData = {
        labels: ["Áo thun", "Quần jeans", "Áo khoác", "Giày sneaker", "Phụ kiện"],
        datasets: [
            {
                label: "Số lượng bán",
                data: [120, 90, 75, 60, 40],
                backgroundColor: "rgba(54, 162, 235, 0.7)",
            },
        ],
    };

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
                <h4 className="text-center mb-4">Admin Panel</h4>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2">
                        <Link to="/admin/dashboard" className="nav-link text-white">
                            <i className="bi bi-speedometer2 me-2"></i>Dashboard
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/products" className="nav-link text-white">
                            <i className="bi bi-box-seam me-2"></i>Products
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/orders" className="nav-link text-white">
                            <i className="bi bi-bag-check me-2"></i>Orders
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/users" className="nav-link text-white">
                            <i className="bi bi-people me-2"></i>Users
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/categories" className="nav-link text-white">
                            <i className="bi bi-folder2-open me-2"></i>Categories
                        </Link>
                    </li>
                    <li className="nav-item mb-2">
                        <Link to="/admin/home" className="nav-link text-white">
                            <i className="bi bi-house-door me-2"></i>Home Page
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                <nav className="navbar navbar-light bg-light px-4 shadow-sm">
                    <h5 className="mb-0">Admin Dashboard</h5>
                </nav>

                <div className="p-4">
                    <h3>Welcome to Admin Dashboard 🎉</h3>

                    {/* Cards thống kê */}
                    <div className="row mb-4">
                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <i className="bi bi-box-seam fs-4 text-primary"></i>
                                    <h6 className="card-title mt-2">Sản phẩm</h6>
                                    <p className="fw-bold fs-5">{stats.products}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <i className="bi bi-bag-check fs-4 text-success"></i>
                                    <h6 className="card-title mt-2">Đơn hàng</h6>
                                    <p className="fw-bold fs-5">{stats.orders}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <i className="bi bi-people fs-4 text-warning"></i>
                                    <h6 className="card-title mt-2">Khách hàng</h6>
                                    <p className="fw-bold fs-5">{stats.users}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="card text-center shadow-sm">
                                <div className="card-body">
                                    <i className="bi bi-cash-coin fs-4 text-danger"></i>
                                    <h6 className="card-title mt-2">Doanh thu</h6>
                                    <p className="fw-bold fs-5 text-success">{stats.revenue}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Biểu đồ */}
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm p-3">
                                <h6 className="mb-3">
                                    <i className="bi bi-graph-up-arrow me-2 text-info"></i>Doanh
                                    thu theo tháng
                                </h6>
                                <Line data={revenueData} />
                            </div>
                        </div>
                        <div className="col-md-6 mb-4">
                            <div className="card shadow-sm p-3">
                                <h6 className="mb-3">
                                    <i className="bi bi-fire me-2 text-danger"></i>Top sản phẩm
                                    bán chạy
                                </h6>
                                <Bar data={topProductsData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
