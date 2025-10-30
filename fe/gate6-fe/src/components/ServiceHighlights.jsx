// components/ServiceHighlights.jsx
import { FaTruck, FaBoxOpen, FaPhoneAlt, FaStore } from "react-icons/fa";

export default function ServiceHighlights() {
    const services = [
        {
            icon: <FaTruck size={30} />,
            title: "MIỄN PHÍ GIAO HÀNG",
            desc: "Với hóa đơn từ 500.000đ"
        },
        {
            icon: <FaBoxOpen size={30} />,
            title: "72H ĐỔI TRẢ SẢN PHẨM",
            desc: "Tư vấn tận tình, đổi hàng tận nhà"
        },
        {
            icon: <FaPhoneAlt size={30} />,
            title: "GIỜ HOẠT ĐỘNG: 9H30 - 22H00",
            desc: "Tất cả các ngày trong tuần"
        },
        {
            icon: <FaStore size={30} />,
            title: "HỆ THỐNG SHOWROOM",
            desc: "68 Phố Phúc Liên ,Hà Nội"
        }
    ];

    return (
        <section className="bg-light py-4">
            <div className="container">
                <div className="row text-center">
                    {services.map((s, i) => (
                        <div key={i} className="col-md-3 mb-3">
                            <div className="d-flex flex-column align-items-center">
                                <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center mb-3" style={{ width: "60px", height: "60px" }}>
                                    {s.icon}
                                </div>
                                <h6 className="fw-bold">{s.title}</h6>
                                <p className="small text-muted">{s.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
