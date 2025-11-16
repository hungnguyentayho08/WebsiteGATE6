import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import axios from "axios";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setMessage("❌ Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/users/login",
                {
                    username: username.trim(),
                    password: password.trim()
                },
                { headers: { "Content-Type": "application/json" } }
            );

            const userData = response.data;
            localStorage.setItem("user", JSON.stringify(userData));

            if (userData.role === "ADMIN") {
                setMessage("✅ Đăng nhập Admin thành công!");
                setTimeout(() => navigate("/admin/dashboard"), 1000);
            } else {
                setMessage("✅ Đăng nhập thành công!");
                setTimeout(() => navigate("/user/dashboard"), 1000);
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage("❌ Sai username hoặc password!");
            } else {
                setMessage("❌ Đăng nhập thất bại! Vui lòng thử lại.");
            }
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
            <Card style={{ width: "400px" }} className="p-4 shadow">
                <h3 className="text-center mb-3">Đăng nhập</h3>
                {message && <p className="text-center">{message}</p>}
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Tên người dùng</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mật khẩu</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </Form.Group>
                    <Button variant="dark" type="submit" className="w-100">Đăng nhập</Button>
                </Form>
                <div className="text-center mt-3">
                    <span>Bạn chưa có tài khoản? </span>
                    <Link to="/register">Đăng ký ngay</Link>
                </div>
            </Card>
        </Container>
    );
}
