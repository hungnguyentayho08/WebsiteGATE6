import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const API_PRODUCTS = "http://localhost:8080/api/products";

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    // Fetch sản phẩm 
    const fetchProducts = async () => {
        try {
            const res = await axios.get(API_PRODUCTS);
            setProducts(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    //  Thêm / Sửa sản phẩm 
    const handleAddClick = () => {
        setEditingProduct({
            name: "",
            price: 0,
            stock: 0,
            image: "",
            category: "Áo",
        });
        setIsAdding(true);
        setShowModal(true);
    };

    const handleEditClick = (product) => {
        setEditingProduct({ ...product });
        setIsAdding(false);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingProduct((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        }));
    };

    const handleSave = async () => {
        try {
            if (isAdding) {
                await axios.post(API_PRODUCTS, editingProduct);
            } else {
                await axios.put(`${API_PRODUCTS}/${editingProduct.id}`, editingProduct);
            }
            setShowModal(false);
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert("Có lỗi xảy ra! Kiểm tra dữ liệu hoặc category.");
        }
    };

    //  Xóa sản phẩm 
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
            try {
                await axios.delete(`${API_PRODUCTS}/${id}`);
                fetchProducts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    //  Toggle Featured 
    const handleToggleFeatured = async (id) => {
        try {
            await axios.put(`${API_PRODUCTS}/toggleFeatured/${id}`);
            fetchProducts();
        } catch (err) {
            console.error(err);
            alert("Có lỗi khi cập nhật sản phẩm nổi bật!");
        }
    };

    // Render 
    return (
        <div className="container-fluid py-4 px-4">
            {/* Tiêu đề + nút điều hướng */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex">
                    <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">
                        <i className="bi bi-arrow-left-circle me-1"></i>
                    </Link>
                    <h2 className="fw-bold d-inline ms-2 text-dark">
                        <i className="bi bi-box-seam me-2 text-dark"></i>Quản lý sản phẩm
                    </h2>
                </div>
                <Button variant="primary" onClick={handleAddClick}>
                    <i className="bi bi-plus-circle me-2"></i>Thêm sản phẩm
                </Button>
            </div>

            {/* Bảng sản phẩm */}
            <div className="table-responsive shadow-sm rounded">
                <table className="table table-bordered table-hover align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá (VNĐ)</th>
                            <th>Tồn kho</th>
                            <th>Danh mục</th>
                            <th>Nổi bật</th>
                            <th className="text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center py-4 text-muted">
                                    <i className="bi bi-inbox me-2"></i>Không có sản phẩm nào
                                </td>
                            </tr>
                        ) : (
                            products.map((p, idx) => (
                                <tr key={p.id}>
                                    <td>{idx + 1}</td>
                                    <td>
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            style={{
                                                width: "80px",
                                                height: "80px",
                                                objectFit: "cover",
                                                borderRadius: "6px",
                                            }}
                                        />
                                    </td>
                                    <td className="fw-semibold">{p.name}</td>
                                    <td>{p.price.toLocaleString()} ₫</td>
                                    <td>{p.stock}</td>
                                    <td>{p.category}</td>
                                    <td className="text-center">
                                        <Form.Check
                                            type="checkbox"
                                            checked={Boolean(p.featured)}
                                            onChange={() => handleToggleFeatured(p.id)}
                                        />
                                    </td>
                                    <td className="text-center">
                                        <Button
                                            size="sm"
                                            variant="warning"
                                            className="me-2"
                                            onClick={() => handleEditClick(p)}
                                        >
                                            <i className="bi bi-pencil-square me-1"></i>Sửa
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDelete(p.id)}
                                        >
                                            <i className="bi bi-trash3 me-1"></i>Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal Thêm/Sửa sản phẩm */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {isAdding ? (
                            <>
                                <i className="bi bi-plus-circle me-2 text-primary"></i>Thêm sản phẩm
                            </>
                        ) : (
                            <>
                                <i className="bi bi-pencil-square me-2 text-warning"></i>Sửa sản phẩm
                            </>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingProduct && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={editingProduct.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Giá (VNĐ)</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    value={editingProduct.price}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Tồn kho</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="stock"
                                    value={editingProduct.stock}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Danh mục</Form.Label>
                                <Form.Select
                                    name="category"
                                    value={editingProduct.category}
                                    onChange={handleChange}
                                >
                                    <option>Áo</option>
                                    <option>Quần</option>
                                    <option>Giày Dép</option>
                                    <option>Phụ kiện</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Ảnh (URL)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="image"
                                    value={editingProduct.image}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        <i className="bi bi-x-circle me-1"></i>Hủy
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        <i className="bi bi-check-circle me-1"></i>Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminProducts;
