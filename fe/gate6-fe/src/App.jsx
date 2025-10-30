import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gate6Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductDetail from "./pages/ProductDetail";
import ServiceHighlights from "./components/ServiceHighlights";



import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProducts from "./admin/AdminProducts";
import AdminOrders from "./admin/AdminOrders";
import AdminUsers from "./admin/AdminUsers";
import Categories from "./admin/Categories";
import AdminHome from "./admin/AdminHome";
import AdminRoute from "./admin/AdminRoute";



import UserDashboard from "./user/UserDashboard";
import UserInfo from "./user/UserInfo";
import UserOrders from "./user/UserOrders";
import OrderDetail from "./user/OrderDetail";



export default function App() {
  return (
    <Router>
      <Gate6Navbar />
      <Routes>
        {/*Trang cho khách hàng*/}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />

        {/*Trang cho admin*/}
        <Route path="/admin/*" element={
          <AdminRoute>
            <Routes>

              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="categories" element={<Categories />} />
              <Route path="home" element={<AdminHome />} />
            </Routes>
          </AdminRoute>
        } />



        {/*Trang cho người dùng*/}


        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/info" element={<UserInfo />} />
        <Route path="/user/orders" element={<UserOrders />} />


        <Route path="/user/orders/:id" element={<OrderDetail />} />
        <Route path="/orders/:id" element={<OrderDetail />} />

      </Routes>


      <ServiceHighlights />
      <Footer />
    </Router>
  );
}
