// src/pages/admin/Categories.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComingSoonNotice from "./ComingSoonNotice";

const Categories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: "Áo", description: "Áo thun, sơ mi, hoodie..." },
        { id: 2, name: "Quần", description: "Quần jeans, quần tây, quần short..." },
        { id: 3, name: "Phụ kiện", description: "Mũ, thắt lưng, vòng tay..." },
    ]);

    const [newCategory, setNewCategory] = useState({ name: "", description: "" });

    const handleAdd = () => {
        if (!newCategory.name.trim()) return alert("Tên danh mục không được để trống");
        setCategories([...categories, { id: Date.now(), ...newCategory }]);
        setNewCategory({ name: "", description: "" });
    };

    const handleDelete = (id) => {
        setCategories(categories.filter((c) => c.id !== id));
    };

    return (
        <div className="container-fluid px-4 py-3">
            <ComingSoonNotice /> {/* Thông báo tính năng sắp ra mắt */}
            <div className="d-flex  align-items-center mb-4">
                <Link to="/admin/dashboard" className="btn btn-outline-secondary me-2">
                    <i className="bi bi-arrow-left-circle me-1"></i>
                </Link>
                <h2 className="mb-0 fw-bold text-dark"> <i className="bi bi-folder2-open me-2"></i>Quản lý danh mục</h2>

            </div>


            {/* Form thêm danh mục */}
            <div className="mb-4">
                <h5>Thêm danh mục mới</h5>
                <div className="d-flex flex-wrap gap-2">
                    <input
                        type="text"
                        className="form-control w-auto flex-grow-1"
                        placeholder="Tên danh mục"
                        value={newCategory.name}
                        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control w-auto flex-grow-1"
                        placeholder="Mô tả"
                        value={newCategory.description}
                        onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                    />
                    <button className="btn btn-primary" onClick={handleAdd}>
                        Thêm
                    </button>
                </div>
            </div>

            {/* Danh sách danh mục */}
            <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id}>
                            <td>{cat.id}</td>
                            <td>{cat.name}</td>
                            <td>{cat.description}</td>
                            <td>
                                <button className="btn btn-warning btn-sm me-2">Sửa</button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(cat.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



        </div>
    );
};

export default Categories;
