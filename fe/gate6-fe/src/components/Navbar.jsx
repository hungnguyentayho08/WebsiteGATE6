import { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Gate6Navbar() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Khi load lại trang, lấy user từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Hàm xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold">
                    GATE6
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="gate6-navbar" />
                <Navbar.Collapse id="gate6-navbar">
                    <Nav className="ms-auto gap-2">
                        <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                        <Nav.Link as={Link} to="/products">Sản phẩm</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Giỏ hàng</Nav.Link>

                        {user ? (
                            <>
                                {/* Nếu là admin thì hiển thị link đến admin dashboard */}
                                {user.role === "ADMIN" ? (
                                    <Nav.Link as={Link} to="/admin/dashboard">
                                        🛠 Quản trị
                                    </Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/user/dashboard">
                                        👤 Trang cá nhân
                                    </Nav.Link>
                                )}

                                <Navbar.Text className="me-2">
                                    👋 Xin chào, <b>{user.username}</b>
                                </Navbar.Text>

                                <Button
                                    variant="outline-light"
                                    size="sm"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </Button>
                            </>
                        ) : (
                            <Nav.Link as={Link} to="/login">Đăng nhập</Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
