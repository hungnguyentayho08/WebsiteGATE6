import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const user = JSON.parse(localStorage.getItem("user"));

    // Nếu chưa đăng nhập
    if (!user) {
        alert("⚠️ Vui lòng đăng nhập trước!");
        return <Navigate to="/login" />;
    }

    // Nếu không phải admin
    if (user.role !== "ADMIN") {
        alert("🚫 Bạn không có quyền truy cập trang này!");
        return <Navigate to="/" />;
    }

    // Nếu là admin
    return children;
}
