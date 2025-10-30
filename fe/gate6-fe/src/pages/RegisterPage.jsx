
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        fullname: "",
        phone: "",
        address: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage("❌ Mật khẩu nhập lại không khớp!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/users/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullname: formData.fullname,
                phone: formData.phone,
                address: formData.address,
                role: "USER"
            });

            setMessage("✅ Đăng ký thành công! Chuyển sang trang đăng nhập...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);

        } catch (error) {
            if (error.response && error.response.data) {
                setMessage(`❌ ${error.response.data}`);
            } else {
                setMessage("❌ Đăng ký thất bại! Vui lòng thử lại.");
            }
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow-sm">
                        <h3 className="text-center mb-4">Đăng ký</h3>
                        {message && <p className="text-center">{message}</p>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên người dùng</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    placeholder="Nhập tên người dùng"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fullname"
                                    placeholder="Nhập họ và tên"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Địa chỉ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    placeholder="Nhập địa chỉ"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nhập lại mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Nhập lại mật khẩu"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Button variant="dark" type="submit" className="w-100">
                                Đăng ký
                            </Button>
                        </Form>
                        <p className="text-center mt-3">
                            Đã có tài khoản?{" "}
                            <Button
                                variant="link"
                                onClick={() => navigate("/login")}
                                className="p-0"
                            >
                                Đăng nhập
                            </Button>
                        </p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
