import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        // Lấy giỏ hàng từ localStorage nếu có
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Lưu giỏ hàng vào localStorage mỗi khi thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Thêm sản phẩm
    const addToCart = (product) => {
        setCart((prevCart) => {
            // Kiểm tra theo id + size + color
            const existing = prevCart.find(
                (item) =>
                    item.id === product.id &&
                    item.size === product.size &&
                    item.color === product.color
            );

            if (existing) {
                return prevCart.map((item) =>
                    item.id === product.id &&
                        item.size === product.size &&
                        item.color === product.color
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }

            // Nếu chưa có -> thêm mới
            return [...prevCart, { ...product }];
        });
    };


    // Cập nhật số lượng
    const updateQuantity = (id, size, color, delta) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id && item.size === size && item.color === color
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    // Xóa sản phẩm
    const removeFromCart = (id, size, color) => {
        setCart((prevCart) =>
            prevCart.filter((item) => !(item.id === id && item.size === size && item.color === color))
        );
    };

    // Xóa toàn bộ giỏ hàng
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}
