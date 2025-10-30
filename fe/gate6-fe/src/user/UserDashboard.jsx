import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import UserInfo from "./UserInfo";
import UserOrders from "./UserOrders";

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            // Gọi API lấy danh sách đơn hàng của user
            fetch(`http://localhost:8080/api/orders/user/${user.id}`)
                .then((res) => res.json())
                .then((data) => setOrders(data))
                .catch((err) => console.error(err));
        }
    }, [user]);

    if (!user) return <p>Bạn chưa đăng nhập!</p>;

    return (
        <div className="container mt-4">
            <h2>👤 Trang cá nhân</h2>
            <UserInfo user={user} />
            <UserOrders orders={orders} />
        </div>
    );
};

export default UserDashboard;
