import { useState } from "react";

const UserInfo = ({ user }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8080/api/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                alert("✅ Cập nhật thông tin thành công!");
                setIsEditing(false); // quay lại chế độ xem
            } else {
                alert("❌ Cập nhật thất bại!");
            }
        } catch (error) {
            console.error(error);
            alert("⚠️ Lỗi server!");
        }
    };

    return (
        <div className="card mb-4">
            <div className="card-header">Thông tin cá nhân</div>
            <div className="card-body">
                {!isEditing ? (
                    <>
                        <p><strong>Họ tên:</strong> {formData.fullname}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>SĐT:</strong> {formData.phone}</p>
                        <p><strong>Địa chỉ:</strong> {formData.address}</p>
                        <button
                            className="btn btn-primary"
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️ Chỉnh sửa thông tin
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label>Họ tên</label>
                            <input
                                type="text"
                                name="fullname"
                                className="form-control"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label>Địa chỉ</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-success me-2">💾 Lưu</button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => setIsEditing(false)}
                        >
                            ❌ Hủy
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserInfo;
