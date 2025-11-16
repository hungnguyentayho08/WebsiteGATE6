import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ComingSoonNotice from "./ComingSoonNotice";

const AdminHome = () => {
    const [heroImage, setHeroImage] = useState("");
    const [newHero, setNewHero] = useState("");
    const [slides, setSlides] = useState([]);
    const [newSlide, setNewSlide] = useState("");
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const API_HOME = "http://localhost:8080/api/admin/home";
    const API_PRODUCTS = "http://localhost:8080/api/admin/products";

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const res = await axios.get(API_HOME);
            setHeroImage(res.data.heroImage || "");
            setSlides(res.data.slideImages || []);
            if (res.data.featuredProductIds?.length) {
                const allProducts = await axios.get(API_PRODUCTS);
                const featured = allProducts.data.filter((p) =>
                    res.data.featuredProductIds.includes(p.id)
                );
                setFeaturedProducts(featured);
            } else {
                setFeaturedProducts([]);
            }
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu Home:", err);
        }
    };

    const handleHeroUpdate = async () => {
        if (!newHero.trim()) return;
        try {
            await axios.put(`${API_HOME}/hero`, JSON.stringify(newHero.trim()), {
                headers: { "Content-Type": "application/json" },
            });
            setNewHero("");
            fetchHomeData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddSlide = async () => {
        if (!newSlide.trim()) return;
        const updatedSlides = [...slides, newSlide.trim()];
        try {
            await axios.put(`${API_HOME}/slide`, { slideImages: updatedSlides });
            setNewSlide("");
            fetchHomeData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteSlide = async (idx) => {
        const updated = slides.filter((_, i) => i !== idx);
        try {
            await axios.put(`${API_HOME}/slide`, { slideImages: updated });
            fetchHomeData();
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveFeatured = async (id) => {
        try {
            const updatedIds = featuredProducts
                .filter((p) => p.id !== id)
                .map((p) => p.id);
            await axios.put(`${API_HOME}/featured-products`, {
                featuredProductIds: updatedIds,
            });
            fetchHomeData();
        } catch (err) {
            console.error("Lỗi xóa sản phẩm nổi bật:", err);
        }
    };

    return (
        <div className="container-fluid px-4 py-3">
            <ComingSoonNotice /> {/* Thông báo tính năng sắp ra mắt */}
            <div className="d-flex  align-items-center mb-4">
                <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">
                    <i className="bi bi-arrow-left-circle me-1"></i>
                </Link>
                <h2 className="mb-0 fw-bold text-dark"> <i className="bi bi-house-door me-2"></i>Quản lý trang chủ</h2>

            </div>


            {/* Hero Section */}
            <section className="mb-5">
                <h5 className="mb-3 text-dark">Ảnh Hero</h5>
                {heroImage && (
                    <div className="mb-3">
                        <img
                            src={heroImage}
                            alt="Hero"
                            className="img-fluid rounded border"
                            style={{ maxHeight: "250px", objectFit: "cover" }}
                        />
                    </div>
                )}
                <div className="d-flex flex-wrap gap-2">
                    <input
                        type="text"
                        className="form-control flex-grow-1"
                        placeholder="URL ảnh hero mới"
                        value={newHero}
                        onChange={(e) => setNewHero(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleHeroUpdate}>
                        Cập nhật Hero
                    </button>
                </div>
            </section>

            {/* Slides */}
            <section className="mb-5">
                <h5 className="mb-3 text-dark">Ảnh Slide</h5>
                <ul className="list-group mb-3">
                    {slides.map((s, idx) => (
                        <li
                            key={idx}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <img
                                src={s}
                                alt="slide"
                                className="rounded border"
                                style={{ width: "100px", height: "60px", objectFit: "cover" }}
                            />
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDeleteSlide(idx)}
                            >
                                Xóa
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="d-flex flex-wrap gap-2">
                    <input
                        type="text"
                        className="form-control flex-grow-1"
                        placeholder="URL slide mới"
                        value={newSlide}
                        onChange={(e) => setNewSlide(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleAddSlide}>
                        Thêm Slide
                    </button>
                </div>
            </section>

            {/* Featured Products */}
            <section className="mb-5">
                <h5 className="mb-3 text-dark">Sản phẩm nổi bật</h5>
                <div className="table-responsive">
                    <table className="table table-bordered align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Ảnh</th>
                                <th>Tên</th>
                                <th>Giá</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featuredProducts.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            className="rounded border"
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </td>
                                    <td>{p.name}</td>
                                    <td>{p.price.toLocaleString()}₫</td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleRemoveFeatured(p.id)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="text-start mt-3">
                <Link to="/admin/dashboard" className="btn btn-secondary">
                    ⬅ Quay về Dashboard
                </Link>
            </div>
        </div>
    );
};

export default AdminHome;
