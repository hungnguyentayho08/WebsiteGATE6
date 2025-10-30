import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import axios from "axios";

export default function ProductDetail() {
    const { addToCart } = useContext(CartContext);
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    // Gọi API lấy 1 sản phẩm theo id
    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/${id}`)
            .then(res => {
                setProduct(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Lỗi khi load sản phẩm:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" /> Đang tải sản phẩm...
            </Container>
        );
    }

    if (!product) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">Không tìm thấy sản phẩm!</Alert>
            </Container>
        );
    }

    // Xác định danh sách size dựa trên category
    let availableSizes = [];
    if (product.category === "Áo" || product.category === "Quần") {
        availableSizes = ["S", "M", "L", "XL"];
    } else if (product.category === "Giày Dép") {
        availableSizes = ["39", "40", "41", "42", "43"];
    } // nếu là "Phụ kiện" thì để mảng rỗng → không hiển thị

    const handleAddToCart = () => {
        if (availableSizes.length > 0 && !size) {
            setMessage("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
            return;
        }
        if (!color) {
            setMessage("Vui lòng chọn màu trước khi thêm vào giỏ hàng!");
            return;
        }

        const selectedProduct = { ...product, size, color, quantity };
        addToCart(selectedProduct);
        setMessage(`Bạn đã thêm "${product.name}" ${size ? `(${size}, ` : "("}${color}, SL: ${quantity}) vào giỏ hàng!`);
        setTimeout(() => setMessage(""), 3000);
    };

    return (
        <Container className="mt-5">
            {message && (
                <Alert variant="success" className="text-center">
                    {message}
                </Alert>
            )}

            <Row>
                {/* Hình ảnh sản phẩm */}
                <Col md={6}>
                    <Card>
                        <Card.Img variant="top" src={product.image} alt={product.name} />
                    </Card>
                </Col>

                {/* Thông tin sản phẩm */}
                <Col md={6}>
                    <h2>{product.name}</h2>
                    <h4 className="text-danger">{product.price.toLocaleString("vi-VN")}₫</h4>

                    {/* Chọn size (ẩn nếu là phụ kiện) */}
                    {availableSizes.length > 0 && (
                        <Form.Group className="mt-3">
                            <Form.Label>Chọn size:</Form.Label>
                            <div>
                                {availableSizes.map((s) => (
                                    <Form.Check
                                        inline
                                        key={s}
                                        type="radio"
                                        label={s}
                                        name="size"
                                        value={s}
                                        onChange={(e) => setSize(e.target.value)}
                                        checked={size === s}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                    )}

                    {/* Chọn màu */}
                    <Form.Group className="mt-3">
                        <Form.Label>Chọn màu:</Form.Label>
                        <Form.Select value={color} onChange={(e) => setColor(e.target.value)}>
                            <option value="">-- Chọn màu --</option>
                            {["Đen", "Trắng", "Xanh"].map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Chọn số lượng */}
                    <Form.Group className="mt-3">
                        <Form.Label>Số lượng:</Form.Label>
                        <Form.Control
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            style={{ width: "100px" }}
                        />
                    </Form.Group>

                    {/* Nút thêm giỏ hàng */}
                    <Button variant="dark" className="mt-4" onClick={handleAddToCart}>
                        Thêm vào giỏ hàng
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}
