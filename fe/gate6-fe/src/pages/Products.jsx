import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Tất cả");
    const [sortOrder, setSortOrder] = useState("");

    //  Lấy data từ BE khi load trang
    useEffect(() => {
        axios.get("http://localhost:8080/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Lỗi khi load sản phẩm:", err));
    }, []);

    //  Filter theo search + category
    let filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== "Tất cả") {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    //  Sort theo giá
    if (sortOrder === "asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    return (
        <Container className="mt-5">
            <h2 className="mb-4 text-center fw-bold" style={{ fontSize: "2rem", color: "#333" }}>
                🛍️ Danh sách sản phẩm
            </h2>

            {/* Thanh tìm kiếm + filter + sort */}
            <Row className="justify-content-center mb-4">
                <Col md={3} className="mb-2">
                    <InputGroup size="sm">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="dark">
                            <FaSearch />
                        </Button>
                    </InputGroup>
                </Col>

                <Col md={3} className="mb-2">
                    <Form.Select
                        size="sm"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Tất cả">Tất cả danh mục</option>
                        <option value="Áo">Áo</option>
                        <option value="Quần">Quần</option>
                        <option value="Giày Dép">Giày Dép</option>
                        <option value="Phụ kiện">Phụ kiện</option>
                    </Form.Select>
                </Col>

                <Col md={3} className="mb-2">
                    <Form.Select
                        size="sm"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Sắp xếp theo giá</option>
                        <option value="asc">Giá: Thấp đến Cao</option>
                        <option value="desc">Giá: Cao đến Thấp</option>
                    </Form.Select>
                </Col>
            </Row>

            {/* Danh sách sản phẩm */}
            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Col key={product.id} md={3} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Img variant="top" src={product.image} />
                                <Card.Body>
                                    <Card.Title className="text-truncate">{product.name}</Card.Title>
                                    <Card.Text>
                                        Giá: {product.price.toLocaleString("vi-VN")}₫
                                    </Card.Text>
                                    <Link to={`/products/${product.id}`}>
                                        <Button variant="dark" size="sm">Xem chi tiết</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-center text-muted">Không có sản phẩm nào</p>
                )}
            </Row>
        </Container>
    );
}
