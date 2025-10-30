import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

const ComingSoonNotice = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Hiện popup khi vào trang
        setShow(true);
    }, []);

    return (
        <Modal
            show={show}
            onHide={() => setShow(false)}
            centered
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton >
                <Modal.Title ><i class="bi bi-exclamation-triangle"></i>Thông báo</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h5>Trang này đang được bảo trì hoặc chưa hoàn thiện!</h5>
                <p className="text-muted mb-0">
                    Vui lòng quay lại sau khi hệ thống cập nhật xong
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary " onClick={() => setShow(false)} >
                    Đã hiểu
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ComingSoonNotice;
