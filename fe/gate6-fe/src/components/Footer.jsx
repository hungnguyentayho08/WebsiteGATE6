import { FaFacebookF, FaInstagram, FaTiktok, FaShopify } from "react-icons/fa";

export default function Footer() {
    return (


        <footer className="bg-dark text-light pt-5 pb-3">







            <div className="container">
                <div className="row">
                    {/* Cột 1 */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold fs-8">Gate6</h6>
                        <p className="small">
                            Thời trang local brand với phong cách trẻ trung, hiện đại, đề cao giá trị chất lượng và sự bền vững. Mỗi sản phẩm là kết tinh của sự sáng tạo không ngừng, sử dụng chất liệu cao cấp, thân thiện với môi trường, mang đến trải nghiệm mặc thoải mái và tự tin cho người dùng trong mọi hoạt động hàng ngày.
                        </p>

                        <h6 className="fs-6 fw-bolder">68 Phố Phúc Liên ,Hà Nội | 0999.111.888 </h6>
                    </div>

                    {/* Cột 2 */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Hỗ trợ mua hàng</h6>
                        <ul className="list-unstyled small">
                            <li className="mb-2"><a href="/about" className="  text-light text-decoration-none">  Hướng dẫn đo size</a></li>
                            <li className="mb-2"><a href="/products" className=" text-light text-decoration-none">  Chính sách đổi trả</a></li>
                            <li className="mb-2"><a href="/contact" className=" text-light text-decoration-none">  Chính sách bảo hành</a></li>
                            <li className="mb-2"><a href="/login" className=" text-light text-decoration-none">  Tài khoản</a></li>

                        </ul>
                    </div>

                    {/* Cột 3 */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Thông tin liên hệ </h6>
                        <ul className="list-unstyled small">
                            <li><a href="/" className="text-light text-decoration-none fs-9  "> ☎ Hotline: 0999.111.888</a></li>
                            <li><a href="/" className="text-light text-decoration-none fs-9 ">📧 Email: gate6@gmail.com</a></li>
                            <li><a href="/" className="text-light text-decoration-none fs-9 ">🛍️ Địa chỉ: 68 Phố Phúc Liên ,Hà Nội </a></li>
                        </ul>
                    </div>

                    {/* Cột 4 */}
                    <div className="col-md-3 mb-4">
                        <h6 className="text-uppercase fw-bold">Kết nối với chúng tôi</h6>
                        <div className="d-flex gap-3">
                            <a href="https://facebook.com" className="text-light"><FaFacebookF /></a>
                            <a href="https://instagram.com" className="text-light"><FaInstagram /></a>
                            <a href="https://tiktok.com" className="text-light"><FaTiktok /></a>
                            <a href="https://shopee.vn" className="text-light"><FaShopify /></a>
                        </div>
                    </div>
                </div>

                <hr className="border-light" />
                <div className="text-center small">
                    &copy; {new Date().getFullYear()} Gate6. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
