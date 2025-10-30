import React, { useEffect, useState, useContext } from "react";
import OrderRow from "./OrderRow";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // giả sử bạn lưu user login ở đây

const UserOrders = () => {
    const { user } = useContext(AuthContext); // user.id dùng để fetch đơn hàng
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user?.id) return;

        const fetchOrders = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/orders/user/${user.id}`);
                setOrders(res.data);
            } catch (err) {
                setError("❌ Lỗi khi tải đơn hàng.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user?.id]);

    if (loading) return <p>⏳ Đang tải đơn hàng...</p>;
    if (error) return <p>{error}</p>;

    if (!orders || orders.length === 0) {
        return (
            <div className="card">
                <div className="card-header">📦 Đơn hàng của tôi</div>
                <div className="card-body">
                    <p>Bạn chưa có đơn hàng nào.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-header">📦 Đơn hàng của tôi</div>
            <div className="card-body table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-light">
                        <tr>
                            <th>Mã đơn</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <OrderRow key={order.id} order={order} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserOrders;
