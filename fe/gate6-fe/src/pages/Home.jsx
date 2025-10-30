// src/pages/Home.jsx
import { Container, Row, Col, Button, Card, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
    const [featuredProducts, setFeaturedProducts] = useState([])

    useEffect(() => {
        // Fetch sản phẩm nổi bật từ backend
        axios.get('http://localhost:8080/api/products/featured')
            .then(res => setFeaturedProducts(res.data))
            .catch(err => console.error("Error fetching featured products:", err))
    }, [])

    return (
        <>
            {/* Hero static */}
            <div
                className="text-white text-center d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: "url('/images/bgk_2.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "450px"
                }}
            >
                <div className="bg-dark bg-opacity-50 p-5 rounded">
                    <Container>
                        <h1 className="fw-bold text-shadow">Chào mừng đến với GATE6</h1>
                        <p className="lead">Thời trang thương hiệu Việt - Phong cách của bạn</p>
                        <Button as={Link} to="/products" variant="light" size="lg">
                            Xem sản phẩm
                        </Button>
                    </Container>
                </div>
            </div>

            {/* Hero Slider */}
            <Carousel className="mt-4">
                {["slide_1.jpg", "slide_2.jpg", "slide_3.jpg"].map((img, idx) => (
                    <Carousel.Item key={idx}>
                        <Link to="/products">
                            <img
                                className="d-block w-100"
                                src={`/images/${img}`}
                                alt={`Slide ${idx + 1}`}
                                style={{ maxHeight: "600px", objectFit: "cover" }}
                            />
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Featured Products */}
            <Container className="my-5">
                <h2 className="text-center mb-4 fw-bold text-dark">🛍️ Sản phẩm nổi bật</h2>
                <Row>
                    {featuredProducts.length > 0 ? (
                        featuredProducts.map(product => (
                            <Col md={3} sm={6} xs={12} className="mb-4" key={product.id}>
                                <Card className="h-100 shadow-sm border-0">
                                    <Card.Img
                                        variant="top"
                                        src={product.image} // đảm bảo backend trả về trường này
                                        className="hover-zoom"
                                    />
                                    <Card.Body className="text-center">
                                        <Card.Title className="fw-bold text-truncate">{product.name}</Card.Title>
                                        <Card.Text className="text-danger fw-semibold">{product.price}₫</Card.Text>
                                        <Button as={Link} to={`/products/${product.id}`} variant="dark" size="sm">
                                            Xem chi tiết
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">Chưa có sản phẩm nổi bật</p>
                    )}
                </Row>
            </Container>
        </>
    )
}
