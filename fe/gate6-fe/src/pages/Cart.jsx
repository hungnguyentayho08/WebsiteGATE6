import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function Cart() {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);

    // Tính tổng tiền
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const formattedTotalPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(totalPrice);

    const handleOrder = async () => {
        const userData = localStorage.getItem("user");
        if (!userData) {
            alert("❌ Bạn chưa đăng nhập!");
            return;
        }
        const user = JSON.parse(userData);

        if (cart.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }

        // Chuẩn bị payload gửi lên BE
        const orderRequest = {
            userId: user.id,
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                size: item.size,
                color: item.color
            }))
        };

        try {
            await axios.post("http://localhost:8080/api/orders", orderRequest);
            alert("✅ Đặt hàng thành công!");
            clearCart(); // reset giỏ hàng sau khi đặt
        } catch (error) {
            console.error(error);
            alert("❌ Đặt hàng thất bại. Vui lòng thử lại.");
        }
    };

    // Component hiển thị từng sản phẩm
    const CartItem = ({ item }) => {
        const formattedPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(item.price);

        const formattedSubtotal = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(item.price * item.quantity);

        return (
            <li className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src={item.imageUrl || item.image}
                        alt={item.productName || item.name}
                        className="rounded border me-3"
                        style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <div>
                        <p className="fw-bold mb-1">{item.productName || item.name}</p>
                        <p className="text-muted mb-1">Giá: {formattedPrice}</p>
                        <p className="text-muted mb-1">Size: {item.size}, Màu: {item.color}</p>
                        <div className="btn-group btn-group-sm" role="group">
                            <button
                                onClick={() => updateQuantity(item.id, item.size, item.color, -1)}
                                className="btn btn-outline-secondary"
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span className="btn btn-light disabled">{item.quantity}</span>
                            <button
                                onClick={() => updateQuantity(item.id, item.size, item.color, 1)}
                                className="btn btn-outline-secondary"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <div className="text-end">
                    <p className="fw-bold mb-2">{formattedSubtotal}</p>
                    <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        className="btn btn-sm btn-danger"
                    >
                        Xóa
                    </button>
                </div>
            </li>
        );
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 fw-bold">🛒 Giỏ hàng</h2>

            {cart.length === 0 ? (
                <p>Giỏ hàng trống</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cart.map((item) => (
                            <CartItem
                                key={`${item.id}-${item.size}-${item.color}`}
                                item={item}
                            />
                        ))}
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="fs-5 fw-bold mb-0">Tổng cộng: {formattedTotalPrice}</p>
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-success"
                                onClick={handleOrder}
                                disabled={cart.length === 0}
                            >
                                Đặt hàng
                            </button>
                            <button onClick={clearCart} className="btn btn-secondary">
                                Hủy đơn hàng
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
